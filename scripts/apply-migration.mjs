/**
 * Supabase pooler로 CMS 마이그레이션 SQL 적용 (CLI 로그인 없이)
 */
import fs from "fs";
import path from "path";
import pg from "pg";

const { Client } = pg;

const PROJECT_REF = "tvyktmwubzsfyfayhark";
const PASSWORD =
  process.env.SUPABASE_DB_PASSWORD || "XfNsGnM0YZQJezZD";

const REGIONS = [
  "ap-northeast-2",
  "ap-northeast-1",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-south-1",
  "us-east-1",
  "us-west-1",
  "eu-west-1",
  "eu-central-1",
];

function buildEndpoints() {
  const out = [];
  for (const region of REGIONS) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    out.push({ host, port: 6543, user: `postgres.${PROJECT_REF}` });
    out.push({ host, port: 5432, user: `postgres.${PROJECT_REF}` });
  }
  out.push({
    host: `db.${PROJECT_REF}.supabase.co`,
    port: 5432,
    user: "postgres",
  });
  return out;
}

const ENDPOINTS = buildEndpoints();

const migrationPath = path.join(
  process.cwd(),
  "supabase/migrations/20260620120000_lawygosite_cms.sql"
);
const sql = fs.readFileSync(migrationPath, "utf8");

async function connect() {
  for (const { host, port, user } of ENDPOINTS) {
    const client = new Client({
      host,
      port,
      user,
      password: PASSWORD,
      database: "postgres",
      ssl: { rejectUnauthorized: false },
    });
    try {
      await client.connect();
      await client.query("select 1");
      console.log(`연결 성공: ${user}@${host}:${port}`);
      return client;
    } catch (err) {
      console.log(`연결 실패 (${user}@${host}:${port}): ${err.message}`);
      try {
        await client.end();
      } catch {
        /* ignore */
      }
    }
  }
  throw new Error("모든 DB 엔드포인트 연결 실패");
}

const client = await connect();
try {
  await client.query(sql);
  console.log("마이그레이션 적용 완료");
} finally {
  await client.end();
}
