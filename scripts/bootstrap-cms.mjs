/**
 * CMS Supabase 부트스트랩 — storage 버킷 생성 + 연결 확인
 */
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "lawygosite-media";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i < 0) continue;
      const k = t.slice(0, i).trim();
      const v = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 필요");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

const { data: buckets } = await sb.storage.listBuckets();
const exists = buckets?.some((b) => b.name === BUCKET);

if (!exists) {
  const { error } = await sb.storage.createBucket(BUCKET, {
    public: true,
  });
  if (error) throw new Error(`버킷 생성 실패: ${error.message}`);
  console.log(`Storage 버킷 생성: ${BUCKET}`);
} else {
  console.log(`Storage 버킷 존재: ${BUCKET}`);
}

const { error: tableErr } = await sb
  .from("lawygosite_cms_content")
  .select("id")
  .limit(1);

if (tableErr?.code === "PGRST205") {
  console.log("CMS 전용 테이블 없음 → app_settings 백엔드 사용");
  const { error: settingsErr } = await sb
    .from("app_settings")
    .select("key")
    .eq("key", "lawygosite_cms_content")
    .maybeSingle();
  if (settingsErr) throw new Error(settingsErr.message);
  console.log("app_settings 백엔드 준비 완료");
} else if (tableErr) {
  throw new Error(tableErr.message);
} else {
  console.log("CMS 전용 테이블 백엔드 사용");
}

console.log("부트스트랩 완료");
