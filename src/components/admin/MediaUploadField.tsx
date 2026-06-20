"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  kind?: "image" | "video";
  hint?: string;
  /** e.g. "16/10" — 미리보기 비율을 사이트 표시와 동일하게 */
  previewAspect?: string;
};

export function MediaUploadField({
  label,
  value,
  onChange,
  kind = "image",
  hint,
  previewAspect,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("kind", kind);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "업로드 실패");
      onChange(String(json.url));
    } catch (e) {
      setError(e instanceof Error ? e.message : "업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium" style={{ color: "#1a1a1a" }}>
        {label}
      </label>
      {hint && (
        <p className="text-xs" style={{ color: "#9a9a9a" }}>
          {hint}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/media/..."
          className="admin-input min-w-[240px] flex-1"
        />
        <label className="admin-btn-secondary cursor-pointer">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? "업로드 중" : "파일 업로드"}
          <input
            type="file"
            className="hidden"
            accept={kind === "video" ? "video/webm,video/mp4" : "image/*"}
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.target.value = "";
            }}
          />
        </label>
        {value && (
          <button type="button" className="admin-btn-ghost" onClick={() => onChange("")}>
            <X size={14} />
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs" style={{ color: "#8b322c" }}>
          {error}
        </p>
      )}
      {value && kind === "image" && (
        <div
          className="relative mt-2 w-full max-w-md overflow-hidden rounded-lg border"
          style={{
            borderColor: "rgba(26,26,26,0.12)",
            aspectRatio: previewAspect ?? "16/9",
          }}
        >
          <Image src={value} alt="" fill className="object-cover object-center" sizes="400px" />
        </div>
      )}
      {value && kind === "video" && (
        <video src={value} controls className="mt-2 max-h-48 w-full max-w-md rounded-lg" />
      )}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium" style={{ color: "#1a1a1a" }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input min-h-[80px] w-full resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input w-full"
        />
      )}
    </div>
  );
}
