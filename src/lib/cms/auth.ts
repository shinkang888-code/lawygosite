import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { AdminAccount } from "@/lib/cms/types";
import { readAdminAccount } from "@/lib/cms/store";

export const ADMIN_COOKIE = "lawygosite_admin_session";

function getSessionSecret() {
  return (
    process.env.CMS_SESSION_SECRET ??
    process.env.SESSION_SECRET ??
    "lawygosite-dev-secret-change-me"
  );
}

export function hashPassword(password: string, salt?: string) {
  const useSalt = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, useSalt, 64).toString("hex");
  return { salt: useSalt, hash };
}

export function verifyPassword(password: string, account: AdminAccount) {
  const { hash } = hashPassword(password, account.salt);
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(account.hash, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export function createSessionToken(username: string) {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const body = `${username}:${exp}`;
  const sig = sign(body);
  return `${Buffer.from(body).toString("base64url")}.${sig}`;
}

export function parseSessionToken(token: string | undefined) {
  if (!token) return null;
  const [bodyB64, sig] = token.split(".");
  if (!bodyB64 || !sig) return null;
  const body = Buffer.from(bodyB64, "base64url").toString("utf8");
  if (sign(body) !== sig) return null;
  const [username, expStr] = body.split(":");
  const exp = Number(expStr);
  if (!username || !Number.isFinite(exp) || Date.now() > exp) return null;
  return { username, exp };
}

export async function getAdminSession() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  const parsed = parseSessionToken(token);
  if (!parsed) return null;
  const account = await readAdminAccount();
  if (!account || account.username !== parsed.username) return null;
  return { username: parsed.username };
}

export async function setAdminSessionCookie(username: string) {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearAdminSessionCookie() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}
