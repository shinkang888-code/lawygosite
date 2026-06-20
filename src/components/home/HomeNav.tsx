"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTab } from "@/components/home/TabContext";
import { useSiteContent } from "@/components/content/ContentContext";
import { isTabId, type TabId } from "@/lib/navTabs";

export function HomeNav() {
  const { activeTab, setTab } = useTab();
  const content = useSiteContent();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:h-[4.5rem] lg:px-8">
        <button
          type="button"
          onClick={() => selectTab("home")}
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/brand/lawygo-icon.png"
            alt="LawyGo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span
            className="font-serif text-lg font-bold tracking-[0.12em]"
            style={{ color: "#1a1a1a" }}
          >
            {content.brand.name}
          </span>
        </button>

        <div
          className="ml-auto hidden items-center gap-1 md:flex"
          role="tablist"
          aria-label="메인 메뉴"
        >
          {content.navTabs.map((tab) => {
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
                className="relative rounded-full px-4 py-2 text-sm transition-colors"
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

        <button
          type="button"
          onClick={() => selectTab("pricing")}
          className="btn-dark hidden shrink-0 md:inline-flex"
        >
          시작하기
        </button>

        <button
          type="button"
          className="ml-auto inline-flex rounded-lg p-2 md:hidden"
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
            {content.navTabs.map((tab) => {
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
            className="btn-dark mt-3 w-full"
          >
            시작하기
          </button>
        </div>
      )}
    </header>
  );
}
