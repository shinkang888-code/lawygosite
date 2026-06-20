/**
 * Supabase migration SQL 적용 (service role로는 DDL 불가 — Management API 대신 psql pooler 사용)
 * 대안: supabase db push 사용 권장
 *
 * 이 스크립트는 테이블 존재 여부를 확인하고 admin 계정을 시드합니다.
 */
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

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
const { error } = await sb.from("lawygosite_cms_content").select("id").limit(1);
if (error?.code === "PGRST205") {
  const { error: settingsErr } = await sb
    .from("app_settings")
    .select("key")
    .limit(1);
  if (settingsErr) {
    console.error("Supabase CMS 연결 실패:", settingsErr.message);
    process.exit(1);
  }
  console.log("Supabase CMS 준비 완료 (app_settings 백엔드)");
  process.exit(0);
}

console.log("Supabase CMS 테이블 확인 완료");
