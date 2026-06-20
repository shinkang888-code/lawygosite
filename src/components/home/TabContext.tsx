"use client";

import { createContext, useContext } from "react";
import type { TabId } from "@/lib/navTabs";

type TabContextValue = {
  activeTab: TabId;
  setTab: (id: TabId) => void;
};

const TabContext = createContext<TabContextValue | null>(null);

export function TabProvider({
  activeTab,
  setTab,
  children,
}: TabContextValue & { children: React.ReactNode }) {
  return (
    <TabContext.Provider value={{ activeTab, setTab }}>{children}</TabContext.Provider>
  );
}

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) {
    throw new Error("useTab must be used within TabProvider");
  }
  return ctx;
}
