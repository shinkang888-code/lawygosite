/**
 * Render web service 생성 스크립트
 * 사용: node scripts/render-deploy.mjs
 */
const apiKey = process.env.RENDER_API_KEY;
if (!apiKey) {
  console.error("RENDER_API_KEY 환경변수가 필요합니다.");
  process.exit(1);
}

const payload = {
  type: "web_service",
  name: "lawygosite",
  ownerId: "tea-d6g55rsr85hc73b6b5vg",
  repo: "https://github.com/shinkang888-code/lawygosite",
  branch: "master",
  autoDeploy: "yes",
  serviceDetails: {
    runtime: "node",
    plan: "free",
    region: "singapore",
    envSpecificDetails: {
      buildCommand: "npm ci --include=dev && npm run build",
      startCommand: "npm run start:render",
    },
    healthCheckPath: "/",
  },
  envVars: [
    { key: "NODE_ENV", value: "production" },
    {
      key: "NEXT_PUBLIC_SUPABASE_URL",
      value: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    },
    {
      key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    },
    {
      key: "SUPABASE_SERVICE_ROLE_KEY",
      value: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    },
    {
      key: "CMS_SESSION_SECRET",
      generateValue: true,
    },
  ].filter((v) => v.value !== "" || v.generateValue),
};

const res = await fetch("https://api.render.com/v1/services", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify(payload),
});

const text = await res.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = { raw: text };
}

if (!res.ok) {
  console.error("Render 서비스 생성 실패:", res.status, json);
  process.exit(1);
}

console.log("Render 서비스 생성 성공:");
console.log(JSON.stringify(json, null, 2));
