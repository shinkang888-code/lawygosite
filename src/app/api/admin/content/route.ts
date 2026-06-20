import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/cms/auth";
import {
  getSiteContent,
  readOverrides,
  resetOverrides,
  writeOverrides,
} from "@/lib/cms/store";
import { getDefaultContent } from "@/lib/cms/defaults";
import type { ContentOverrides } from "@/lib/cms/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  return NextResponse.json({
    content: await getSiteContent(),
    overrides: await readOverrides(),
    defaults: getDefaultContent(),
  });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = (await request.json()) as { overrides?: ContentOverrides };
  if (!body.overrides || typeof body.overrides !== "object") {
    return NextResponse.json({ error: "저장할 콘텐츠가 없습니다." }, { status: 400 });
  }

  const saved = await writeOverrides(body.overrides, session.username);
  return NextResponse.json({
    ok: true,
    content: await getSiteContent(),
    overrides: saved,
    message: "콘텐츠가 저장되었습니다.",
  });
}

export async function DELETE() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  await resetOverrides();
  return NextResponse.json({
    ok: true,
    content: await getSiteContent(),
    message: "모든 변경사항이 기본값으로 초기화되었습니다.",
  });
}
