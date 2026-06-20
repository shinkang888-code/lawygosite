import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/cms/store";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store" },
  });
}
