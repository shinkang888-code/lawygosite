import fs from "fs";
import path from "path";
import type { AdminAccount, ContentOverrides } from "@/lib/cms/types";
import { getDefaultContent } from "@/lib/cms/defaults";
import { mergeContent } from "@/lib/cms/merge";
import {
  readAdminFromSupabase,
  readOverridesFromSupabase,
  resetOverridesInSupabase,
  writeAdminToSupabase,
  writeOverridesToSupabase,
} from "@/lib/cms/supabase-backend";
import { CMS_STORAGE_BUCKET, getSupabaseAdmin, isSupabaseEnabled } from "@/lib/supabase/admin";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_PATH = path.join(DATA_DIR, "cms-content.json");
const ADMIN_PATH = path.join(DATA_DIR, "cms-admin.json");
const HISTORY_DIR = path.join(DATA_DIR, "history");

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
}

function readOverridesFile(): ContentOverrides {
  ensureDataDir();
  if (!fs.existsSync(CONTENT_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CONTENT_PATH, "utf8")) as ContentOverrides;
  } catch {
    return {};
  }
}

function writeOverridesFile(overrides: ContentOverrides) {
  ensureDataDir();
  if (fs.existsSync(CONTENT_PATH)) {
    const backup = path.join(HISTORY_DIR, `cms-content-${Date.now()}.json`);
    fs.copyFileSync(CONTENT_PATH, backup);
    const files = fs
      .readdirSync(HISTORY_DIR)
      .filter((f) => f.startsWith("cms-content-"))
      .sort()
      .reverse();
    for (const old of files.slice(20)) {
      fs.unlinkSync(path.join(HISTORY_DIR, old));
    }
  }
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(overrides, null, 2), "utf8");
}

export async function readOverrides(): Promise<ContentOverrides> {
  if (isSupabaseEnabled()) return readOverridesFromSupabase();
  return readOverridesFile();
}

export async function writeOverrides(
  overrides: ContentOverrides,
  updatedBy: string
): Promise<ContentOverrides> {
  const current = await readOverrides();
  const version = (overrides.meta?.version ?? current.meta?.version ?? 0) + 1;
  const next: ContentOverrides = {
    ...overrides,
    meta: {
      lastUpdated: new Date().toISOString(),
      updatedBy,
      version,
    },
  };

  if (isSupabaseEnabled()) {
    await writeOverridesToSupabase(next, updatedBy, version);
    return next;
  }

  writeOverridesFile(next);
  return next;
}

export async function resetOverrides(): Promise<void> {
  if (isSupabaseEnabled()) {
    await resetOverridesInSupabase();
    return;
  }

  ensureDataDir();
  if (fs.existsSync(CONTENT_PATH)) {
    const backup = path.join(HISTORY_DIR, `cms-content-reset-${Date.now()}.json`);
    fs.copyFileSync(CONTENT_PATH, backup);
    fs.unlinkSync(CONTENT_PATH);
  }
}

export async function getSiteContent() {
  const defaults = getDefaultContent();
  const overrides = await readOverrides();
  return mergeContent(defaults, overrides);
}

export async function readAdminAccount(): Promise<AdminAccount | null> {
  if (isSupabaseEnabled()) return readAdminFromSupabase();

  ensureDataDir();
  if (!fs.existsSync(ADMIN_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(ADMIN_PATH, "utf8")) as AdminAccount;
  } catch {
    return null;
  }
}

export async function writeAdminAccount(account: AdminAccount) {
  if (isSupabaseEnabled()) {
    await writeAdminToSupabase(account);
    return;
  }

  ensureDataDir();
  fs.writeFileSync(ADMIN_PATH, JSON.stringify(account, null, 2), "utf8");
}

export async function uploadMediaFile(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  if (isSupabaseEnabled()) {
    const supabase = getSupabaseAdmin()!;
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${filename.replace(/[^a-zA-Z0-9._-]/g, "")}`;
    const storagePath = `uploads/${safeName}`;
    const { error } = await supabase.storage
      .from(CMS_STORAGE_BUCKET)
      .upload(storagePath, buffer, { contentType, upsert: false });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from(CMS_STORAGE_BUCKET).getPublicUrl(storagePath);
    return data.publicUrl;
  }

  const UPLOAD_DIR = path.join(process.cwd(), "public", "media", "uploads");
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(filename) || ".bin";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, safeName), buffer);
  return `/media/uploads/${safeName}`;
}
