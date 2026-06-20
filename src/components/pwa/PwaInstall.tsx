"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "lawygosite-pwa-dismiss";

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function isIos() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

export function PwaInstall() {
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (isStandalone() || sessionStorage.getItem(DISMISS_KEY)) return;

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
      setIosHint(false);
    };

    window.addEventListener("beforeinstallprompt", onBip);

    const timer = window.setTimeout(() => {
      if (isStandalone() || sessionStorage.getItem(DISMISS_KEY)) return;
      if (isIos() && isMobile()) {
        setIosHint(true);
        setVisible(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismiss();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-[60] rounded-xl p-4 shadow-lg md:inset-x-auto md:right-4 md:bottom-4 md:max-w-sm"
      style={{
        backgroundColor: "#1c1b19",
        color: "#ffffff",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
      role="dialog"
      aria-label="홈 화면에 추가"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute top-3 right-3 rounded p-1 opacity-70 hover:opacity-100"
        aria-label="닫기"
      >
        <X size={16} />
      </button>

      <p className="mb-1 text-xs tracking-widest uppercase" style={{ color: "#c9a962" }}>
        홈 화면 바로가기
      </p>
      <p className="mb-3 pr-6 text-sm font-medium">LawyGo를 앱처럼 바로 실행하세요</p>

      {iosHint ? (
        <p className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
          <Share size={14} className="mt-0.5 shrink-0" />
          Safari 하단 <strong>공유</strong> 버튼 → <strong>홈 화면에 추가</strong>를 선택하세요.
        </p>
      ) : (
        <button
          type="button"
          onClick={install}
          className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium"
          style={{ backgroundColor: "#8b322c", color: "#ffffff" }}
        >
          <Download size={16} />
          홈 화면에 설치
        </button>
      )}
    </div>
  );
}
