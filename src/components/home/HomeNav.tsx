"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTab } from "@/components/home/TabContext";
import { useSiteContent } from "@/components/content/ContentContext";
import { NAV_TABS, isTabId, type TabId } from "@/lib/navTabs";

export function HomeNav() {
  const { activeTab, setTab } = useTab();
  const content = useSiteContent();
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs =
    content.navTabs?.length > 0
      ? content.navTabs
      : NAV_TABS.map((t) => ({ id: t.id, label: t.label }));

  const selectTab = (id: string) => {
    if (!isTabId(id)) return;
    setTab(id as TabId);
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(242, 240, 235, 0.95)",
        borderBottom: "1px solid rgba(26,26,26,0.08)",
      }}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:h-16 sm:px-4 lg:h-[4.5rem] lg:gap-3 lg:px-8">
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
            className="hidden font-serif text-base font-bold tracking-[0.12em] sm:inline lg:text-lg"
            style={{ color: "#1a1a1a" }}
          >
            {content.brand.name}
          </span>
        </button>

        {/* md 이상: 가로 탭 (스크롤 가능) */}
        <div
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="메인 메뉴"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className="relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs transition-colors sm:px-3 sm:py-2 sm:text-sm lg:px-4"
                style={{
                  color: isActive ? "#1a1a1a" : "#6b6b6b",
                  fontWeight: isActive ? 600 : 400,
                  backgroundColor: isActive ? "rgba(139,50,44,0.08)" : "transparent",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* btn-dark는 display:inline-flex라 hidden과 충돌 → Tailwind로 직접 스타일 */}
        <button
          type="button"
          onClick={() => selectTab("pricing")}
          className="hidden shrink-0 items-center justify-center rounded-none px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-85 sm:text-sm md:inline-flex"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          시작하기
        </button>

        {/* md 미만: 햄버거 */}
        <button
          type="button"
          className="ml-auto inline-flex shrink-0 rounded-lg p-2 md:ml-0 md:hidden"
          style={{ color: "#1a1a1a" }}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="border-t px-4 py-3 md:hidden"
          style={{
            backgroundColor: "rgba(242, 240, 235, 0.98)",
            borderColor: "rgba(26,26,26,0.08)",
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => selectTab(tab.id)}
                  className="rounded-lg px-3 py-3 text-left text-sm"
                  style={{
                    color: isActive ? "#8b322c" : "#1a1a1a",
                    fontWeight: isActive ? 600 : 400,
                    backgroundColor: isActive
                      ? "rgba(139,50,44,0.1)"
                      : "rgba(26,26,26,0.04)",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => selectTab("pricing")}
            className="mt-3 w-full px-6 py-2.5 text-sm font-medium text-white"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            시작하기
          </button>
        </div>
      )}
    </header>
  );
}
