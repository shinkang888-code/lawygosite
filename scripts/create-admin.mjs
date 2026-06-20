import fs from "fs";
import path from "path";
import os from "os";
import { randomBytes, scryptSync } from "crypto";
import { createClient } from "@supabase/supabase-js";

const DATA_DIR = path.join(process.cwd(), "data");
const ADMIN_PATH = path.join(DATA_DIR, "cms-admin.json");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

function hashPassword(password, salt) {
  const useSalt = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, useSalt, 64).toString("hex");
  return { salt: useSalt, hash };
}

function generatePassword() {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  let out = "";
  const bytes = randomBytes(16);
  for (let i = 0; i < 16; i++) {
    out += chars[bytes[i] % chars.length];
  }
  return out;
}

const username =
  process.argv.find((a) => a.startsWith("--user="))?.split("=")[1] ??
  "lawygo_admin";
const password =
  process.argv.find((a) => a.startsWith("--pass="))?.split("=")[1] ??
  generatePassword();

const { salt, hash } = hashPassword(password);
const account = {
  username,
  salt,
  hash,
  createdAt: new Date().toISOString(),
};

async function saveToSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { ok: false, label: "로컬 파일" };

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: tableErr } = await supabase
    .from("lawygosite_cms_admin")
    .select("username")
    .limit(1);

  if (!tableErr) {
    const { error } = await supabase.from("lawygosite_cms_admin").upsert({
      username: account.username,
      salt: account.salt,
      hash: account.hash,
      created_at: account.createdAt,
    });
    if (error) throw new Error(error.message);
    return { ok: true, label: "Supabase (lawygosite_cms_admin)" };
  }

  if (tableErr.code !== "PGRST205") throw new Error(tableErr.message);

  const { data: existing } = await supabase
    .from("app_settings")
    .select("key")
    .eq("key", "lawygosite_cms_admin")
    .maybeSingle();

  const payload = { key: "lawygosite_cms_admin", value: account };
  const { error } = existing
    ? await supabase
        .from("app_settings")
        .update({ value: account })
        .eq("key", "lawygosite_cms_admin")
    : await supabase.from("app_settings").insert(payload);
  if (error) throw new Error(error.message);
  return { ok: true, label: "Supabase (app_settings)" };
}

async function main() {
  const result = await saveToSupabase();
  if (!result.ok) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(ADMIN_PATH, JSON.stringify(account, null, 2), "utf8");
  }

  const stamp = new Date().toISOString().slice(0, 10);
  const txtPath = path.join(
    os.homedir(),
    "Downloads",
    `LawyGo-Site-Admin-${stamp}.txt`
  );

  const storageNote = result.ok
    ? `저장소: ${result.label}`
    : `저장소: 로컬 파일 (${ADMIN_PATH})`;

  const txt = `LawyGo 마케팅 사이트 관리자 계정
생성일: ${new Date().toLocaleString("ko-KR")}
${storageNote}

관리자 콘솔 URL: http://localhost:3000/admin/login
(배포 후: https://lawygosite.onrender.com/admin/login)

아이디: ${username}
비밀번호: ${password}

※ 이 파일을 안전한 곳에 보관하세요.
※ 프로덕션에서는 CMS_SESSION_SECRET 환경변수를 반드시 설정하세요.
`;

  fs.writeFileSync(txtPath, txt, "utf8");

  console.log("관리자 계정이 생성되었습니다.");
  console.log(`- ${storageNote}`);
  console.log(`- 다운로드 폴더: ${txtPath}`);
  console.log(`- 아이디: ${username}`);
  console.log(`- 비밀번호: ${password}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
