"use client";

import { useCallback, useEffect, useState } from "react";
import { isTabId, type TabId } from "@/lib/navTabs";
import { TabProvider } from "@/components/home/TabContext";
import { HomeNav, HOME_NAV_OFFSET_CLASS } from "@/components/home/HomeNav";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { ProofMetrics } from "@/components/home/ProofMetrics";
import { PlatformEcosystem } from "@/components/home/PlatformEcosystem";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { DifferentiatorGrid } from "@/components/home/DifferentiatorGrid";
import { AIHubSection } from "@/components/home/AIHubSection";
import { FeatureSections } from "@/components/home/FeatureSections";
import { ModuleGrid } from "@/components/home/ModuleGrid";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HomeFooter } from "@/components/home/HomeFooter";

function TabPanel({
  id,
  activeTab,
  children,
}: {
  id: TabId;
  activeTab: TabId;
  children: React.ReactNode;
}) {
  if (activeTab !== id) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className="animate-[fadeIn_0.35s_ease-out]"
    >
      {children}
    </div>
  );
}

export function HomeShell() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const setTab = useCallback((id: TabId) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isTabId(hash)) setActiveTab(hash);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", activeTab === "home" ? "/" : `/#${activeTab}`);
  }, [activeTab]);

  return (
    <TabProvider activeTab={activeTab} setTab={setTab}>
      <div
        className="flex min-h-screen flex-col"
        style={{ backgroundColor: "#f2f0eb", color: "#1a1a1a" }}
      >
        <HomeNav />
        <main className={`flex-1 ${HOME_NAV_OFFSET_CLASS}`}>
          <TabPanel id="home" activeTab={activeTab}>
            <HeroCinematic />
            <ProofMetrics />
            <HomeFooter />
          </TabPanel>

          <TabPanel id="platform" activeTab={activeTab}>
            <PlatformEcosystem />
            <FeatureSections />
            <ModuleGrid />
            <HomeFooter />
          </TabPanel>

          <TabPanel id="video" activeTab={activeTab}>
            <VideoShowcase />
            <HomeFooter />
          </TabPanel>

          <TabPanel id="ai" activeTab={activeTab}>
            <AIHubSection />
            <DifferentiatorGrid />
            <HomeFooter />
          </TabPanel>

          <TabPanel id="architecture" activeTab={activeTab}>
            <ArchitectureSection />
            <HomeFooter />
          </TabPanel>

          <TabPanel id="pricing" activeTab={activeTab}>
            <PricingSection />
            <div
              className="grid lg:grid-cols-2"
              style={{ backgroundColor: "#f2f0eb" }}
            >
              <TestimonialsSection />
              <FaqSection />
            </div>
            <HomeFooter />
          </TabPanel>
        </main>
      </div>
    </TabProvider>
  );
}
