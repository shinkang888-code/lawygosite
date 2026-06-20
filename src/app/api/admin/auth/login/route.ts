import { NextResponse } from "next/server";
import {
  setAdminSessionCookie,
  verifyPassword,
} from "@/lib/cms/auth";
import { readAdminAccount } from "@/lib/cms/store";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim();
  const password = body.password ?? "";

  if (!username || !password) {
    return NextResponse.json(
      { error: "아이디와 비밀번호를 입력하세요." },
      { status: 400 }
    );
  }

  const account = await readAdminAccount();
  if (!account) {
    return NextResponse.json(
      {
        error:
          "관리자 계정이 없습니다. npm run admin:create 를 실행해 계정을 생성하세요.",
      },
      { status: 503 }
    );
  }

  if (account.username !== username || !verifyPassword(password, account)) {
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  await setAdminSessionCookie(username);
  return NextResponse.json({ ok: true, username });
}
