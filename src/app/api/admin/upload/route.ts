import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/cms/auth";
import { uploadMediaFile } from "@/lib/cms/store";

const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_VIDEO = 100 * 1024 * 1024;

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const VIDEO_TYPES = new Set(["video/webm", "video/mp4", "video/quicktime"]);

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind") ?? "image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  const isVideo = kind === "video";
  const allowed = isVideo ? VIDEO_TYPES : IMAGE_TYPES;
  if (!allowed.has(file.type)) {
    return NextResponse.json(
      {
        error: isVideo
          ? "webm/mp4 영상만 업로드할 수 있습니다."
          : "jpg/png/webp/gif만 업로드할 수 있습니다.",
      },
      { status: 400 }
    );
  }

  const maxSize = isVideo ? MAX_VIDEO : MAX_IMAGE;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `파일 크기는 ${isVideo ? "100MB" : "10MB"} 이하여야 합니다.` },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadMediaFile(buffer, file.name, file.type);

  return NextResponse.json({
    ok: true,
    url,
    name: file.name,
    size: file.size,
    type: file.type,
  });
}
