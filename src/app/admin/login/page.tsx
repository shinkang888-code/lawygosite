"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "로그인 실패");
      router.replace("/admin/console");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "#f2f0eb" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg"
        style={{ borderColor: "rgba(26,26,26,0.1)" }}
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/brand/lawygo-icon.png" alt="LawyGo" width={48} height={48} className="mb-4 rounded-xl" />
          <h1 className="font-serif text-2xl font-semibold" style={{ color: "#1a1a1a" }}>
            사이트 관리자 콘솔
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#6b6b6b" }}>
            배너·텍스트·영상을 편집하고 저장하세요
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">아이디</label>
            <input
              className="admin-input w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호</label>
            <input
              type="password"
              className="admin-input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <p className="rounded-lg px-3 py-2 text-sm" style={{ background: "rgba(139,50,44,0.1)", color: "#8b322c" }}>
              {error}
            </p>
          )}
          <button type="submit" className="admin-btn-primary w-full" disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
            {loading ? "로그인 중…" : "로그인"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs" style={{ color: "#9a9a9a" }}>
          계정이 없다면 터미널에서 <code>npm run admin:create</code> 실행
        </p>
      </div>
    </div>
  );
}
