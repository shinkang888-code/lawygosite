import type { AdminAccount, ContentOverrides } from "@/lib/cms/types";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const CMS_ROW_ID = "main";
const SETTINGS_CONTENT_KEY = "lawygosite_cms_content";
const SETTINGS_HISTORY_KEY = "lawygosite_cms_history";
const SETTINGS_ADMIN_KEY = "lawygosite_cms_admin";

type CmsBackend = "tables" | "app_settings";

let backendMode: CmsBackend | null = null;

async function detectBackend(): Promise<CmsBackend> {
  if (backendMode) return backendMode;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    backendMode = "app_settings";
    return backendMode;
  }

  const { error } = await supabase
    .from("lawygosite_cms_content")
    .select("id")
    .limit(1);

  backendMode = error?.code === "PGRST205" ? "app_settings" : "tables";
  return backendMode;
}

async function readSettingsValue<T>(key: string): Promise<T | null> {
  const supabase = getSupabaseAdmin()!;
  const { data, error } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error || !data?.value) return null;
  return data.value as T;
}

async function writeSettingsValue(key: string, value: unknown) {
  const supabase = getSupabaseAdmin()!;
  const { data: existing } = await supabase
    .from("app_settings")
    .select("key")
    .eq("key", key)
    .maybeSingle();

  const { error } = existing
    ? await supabase.from("app_settings").update({ value }).eq("key", key)
    : await supabase.from("app_settings").insert({ key, value });

  if (error) throw new Error(error.message);
}

export async function readOverridesFromSupabase(): Promise<ContentOverrides> {
  const mode = await detectBackend();
  const supabase = getSupabaseAdmin();
  if (!supabase) return {};

  if (mode === "tables") {
    const { data, error } = await supabase
      .from("lawygosite_cms_content")
      .select("overrides")
      .eq("id", CMS_ROW_ID)
      .maybeSingle();
    if (error || !data) return {};
    return (data.overrides ?? {}) as ContentOverrides;
  }

  const row = await readSettingsValue<{ overrides?: ContentOverrides }>(
    SETTINGS_CONTENT_KEY
  );
  return (row?.overrides ?? {}) as ContentOverrides;
}

export async function writeOverridesToSupabase(
  next: ContentOverrides,
  updatedBy: string,
  version: number
) {
  const mode = await detectBackend();
  const supabase = getSupabaseAdmin()!;

  if (mode === "tables") {
    const { data: existing } = await supabase
      .from("lawygosite_cms_content")
      .select("overrides")
      .eq("id", CMS_ROW_ID)
      .maybeSingle();

    if (existing?.overrides) {
      await appendHistorySnapshot(existing.overrides as ContentOverrides);
    }

    const { error } = await supabase.from("lawygosite_cms_content").upsert({
      id: CMS_ROW_ID,
      overrides: next,
      version,
      updated_at: new Date().toISOString(),
      updated_by: updatedBy,
    });
    if (error) throw new Error(error.message);
    return;
  }

  const existing = await readSettingsValue<{ overrides?: ContentOverrides }>(
    SETTINGS_CONTENT_KEY
  );
  if (existing?.overrides) {
    await appendHistorySnapshot(existing.overrides);
  }

  await writeSettingsValue(SETTINGS_CONTENT_KEY, {
    overrides: next,
    version,
    updated_at: new Date().toISOString(),
    updated_by: updatedBy,
  });
}

async function appendHistorySnapshot(snapshot: ContentOverrides) {
  const mode = await detectBackend();
  const supabase = getSupabaseAdmin()!;

  if (mode === "tables") {
    await supabase.from("lawygosite_cms_history").insert({ snapshot });
    const { data: oldRows } = await supabase
      .from("lawygosite_cms_history")
      .select("id")
      .order("created_at", { ascending: false });
    if (oldRows && oldRows.length > 20) {
      const toDelete = oldRows.slice(20).map((r) => r.id);
      await supabase.from("lawygosite_cms_history").delete().in("id", toDelete);
    }
    return;
  }

  const history =
    (await readSettingsValue<{ items?: Array<{ snapshot: ContentOverrides; created_at: string }> }>(
      SETTINGS_HISTORY_KEY
    )) ?? { items: [] };

  const items = [
    { snapshot, created_at: new Date().toISOString() },
    ...(history.items ?? []),
  ].slice(0, 20);

  await writeSettingsValue(SETTINGS_HISTORY_KEY, { items });
}

export async function resetOverridesInSupabase() {
  const mode = await detectBackend();
  const supabase = getSupabaseAdmin()!;

  if (mode === "tables") {
    const { data: existing } = await supabase
      .from("lawygosite_cms_content")
      .select("overrides")
      .eq("id", CMS_ROW_ID)
      .maybeSingle();
    if (existing?.overrides) {
      await appendHistorySnapshot(existing.overrides as ContentOverrides);
    }
    await supabase.from("lawygosite_cms_content").delete().eq("id", CMS_ROW_ID);
    return;
  }

  const existing = await readSettingsValue<{ overrides?: ContentOverrides }>(
    SETTINGS_CONTENT_KEY
  );
  if (existing?.overrides) {
    await appendHistorySnapshot(existing.overrides);
  }
  await supabase.from("app_settings").delete().eq("key", SETTINGS_CONTENT_KEY);
}

export async function readAdminFromSupabase(): Promise<AdminAccount | null> {
  const mode = await detectBackend();
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  if (mode === "tables") {
    const { data, error } = await supabase
      .from("lawygosite_cms_admin")
      .select("username,salt,hash,created_at")
      .limit(1)
      .maybeSingle();
    if (error || !data) return null;
    return {
      username: data.username,
      salt: data.salt,
      hash: data.hash,
      createdAt: data.created_at ?? new Date().toISOString(),
    };
  }

  const data = await readSettingsValue<AdminAccount>(SETTINGS_ADMIN_KEY);
  if (!data?.username) return null;
  return {
    username: data.username,
    salt: data.salt,
    hash: data.hash,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
}

export async function writeAdminToSupabase(account: AdminAccount) {
  const mode = await detectBackend();
  const supabase = getSupabaseAdmin()!;

  if (mode === "tables") {
    const { error } = await supabase.from("lawygosite_cms_admin").upsert({
      username: account.username,
      salt: account.salt,
      hash: account.hash,
      created_at: account.createdAt,
    });
    if (error) throw new Error(error.message);
    return;
  }

  await writeSettingsValue(SETTINGS_ADMIN_KEY, account);
}

export async function getCmsBackendLabel(): Promise<string> {
  const mode = await detectBackend();
  return mode === "tables"
    ? "Supabase (lawygosite_cms_*)"
    : "Supabase (app_settings)";
}
