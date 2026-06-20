"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTab } from "@/components/home/TabContext";
import { useSiteContent } from "@/components/content/ContentContext";
import { NAV_TABS, isTabId, type TabId } from "@/lib/navTabs";

function TabButtons({
  tabs,
  activeTab,
  onSelect,
  size = "desktop",
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onSelect: (id: string) => void;
  size?: "mobile" | "desktop";
}) {
  const isMobile = size === "mobile";

  return (
    <>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={size === "desktop" ? `tab-${tab.id}` : `tab-mobile-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            data-tab-id={tab.id}
            onClick={() => onSelect(tab.id)}
            className={
              isMobile
                ? "shrink-0 snap-start whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors"
                : "relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs transition-colors sm:px-3 sm:py-2 sm:text-sm lg:px-4"
            }
            style={{
              color: isActive ? "#1a1a1a" : "#6b6b6b",
              fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? "rgba(139,50,44,0.12)" : "rgba(26,26,26,0.04)",
              border: isActive
                ? "1px solid rgba(139,50,44,0.25)"
                : "1px solid rgba(26,26,26,0.06)",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </>
  );
}

export function HomeNav() {
  const { activeTab, setTab } = useTab();
  const content = useSiteContent();
  const mobileTabListRef = useRef<HTMLDivElement>(null);
  const liveLoginUrl = content.hero?.liveUrl ?? "https://lawygo.vercel.app/login";

  const tabs =
    content.navTabs?.length > 0
      ? content.navTabs
      : NAV_TABS.map((t) => ({ id: t.id, label: t.label }));

  const selectTab = (id: string) => {
    if (!isTabId(id)) return;
    setTab(id as TabId);
  };

  const openLiveLogin = () => {
    window.open(liveLoginUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const list = mobileTabListRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(`[data-tab-id="${activeTab}"]`);
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeTab]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(242, 240, 235, 0.97)",
        borderBottom: "1px solid rgba(26,26,26,0.08)",
      }}
    >
      {/* ── 모바일: 1행 로고 + CTA ── */}
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-2 px-3 md:hidden">
        <button
          type="button"
          onClick={() => selectTab("home")}
          className="flex min-w-0 items-center gap-2"
        >
          <Image
            src="/brand/lawygo-icon.png"
            alt="LawyGo"
            width={28}
            height={28}
            className="shrink-0 rounded-md"
          />
          <span
            className="truncate font-serif text-sm font-bold tracking-[0.1em]"
            style={{ color: "#1a1a1a" }}
          >
            {content.brand.name}
          </span>
        </button>

        <button
          type="button"
          onClick={openLiveLogin}
          className="shrink-0 px-3 py-1.5 text-xs font-medium text-white"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          시작하기
        </button>
      </div>

      {/* ── 모바일: 2행 가로 스크롤 탭 (항상 노출) ── */}
      <div
        ref={mobileTabListRef}
        className="flex gap-1.5 overflow-x-auto px-3 pb-2.5 pt-0.5 md:hidden [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="메인 메뉴"
      >
        <TabButtons tabs={tabs} activeTab={activeTab} onSelect={selectTab} size="mobile" />
      </div>

      {/* ── 데스크톱: 단일 행 ── */}
      <nav className="mx-auto hidden h-14 max-w-7xl items-center gap-2 px-4 md:flex lg:h-[4.5rem] lg:gap-3 lg:px-8">
        <button
          type="button"
          onClick={() => selectTab("home")}
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <Image
            src="/brand/lawygo-icon.png"
            alt="LawyGo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span
            className="font-serif text-base font-bold tracking-[0.12em] lg:text-lg"
            style={{ color: "#1a1a1a" }}
          >
            {content.brand.name}
          </span>
        </button>

        <div
          className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="메인 메뉴"
        >
          <TabButtons tabs={tabs} activeTab={activeTab} onSelect={selectTab} size="desktop" />
        </div>

        <button
          type="button"
          onClick={openLiveLogin}
          className="inline-flex shrink-0 items-center justify-center px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-85 sm:text-sm"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          시작하기
        </button>
      </nav>
    </header>
  );
}

/** 모바일 2행 헤더 높이에 맞춘 main 상단 패딩 */
export const HOME_NAV_OFFSET_CLASS = "pt-[5.75rem] md:pt-16 lg:pt-[4.5rem]";
