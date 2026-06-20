import { NextResponse } from "next/server";
import { getAdminSession, hashPassword, verifyPassword } from "@/lib/cms/auth";
import { readAdminAccount, writeAdminAccount } from "@/lib/cms/store";

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = (await request.json()) as {
    currentPassword?: string;
    newPassword?: string;
  };

  const account = await readAdminAccount();
  if (!account) {
    return NextResponse.json({ error: "관리자 계정이 없습니다." }, { status: 503 });
  }

  if (!body.currentPassword || !verifyPassword(body.currentPassword, account)) {
    return NextResponse.json(
      { error: "현재 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  if (!body.newPassword || body.newPassword.length < 8) {
    return NextResponse.json(
      { error: "새 비밀번호는 8자 이상이어야 합니다." },
      { status: 400 }
    );
  }

  const { salt, hash } = hashPassword(body.newPassword);
  await writeAdminAccount({
    username: account.username,
    salt,
    hash,
    createdAt: account.createdAt,
  });

  return NextResponse.json({ ok: true, message: "비밀번호가 변경되었습니다." });
}
