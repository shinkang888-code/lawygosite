"use client";

import { useState } from "react";
import { useSiteContent } from "@/components/content/ContentContext";
import { SectionHeader } from "@/components/home/layout/SectionHeader";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function PlatformEcosystem() {
  const { ecosystem } = useSiteContent();
  const [active, setActive] = useState(ecosystem.layers[0]?.id ?? "litigation");
  const current = ecosystem.layers.find((l) => l.id === active)!;

  return (
    <SectionShell id="platform" variant="paper" noPadding className="pt-10 pb-6 md:pt-12 md:pb-8">
      <SectionHeader
        label="Platform Ecosystem"
        title={ecosystem.title}
        description={ecosystem.subtitle}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-6">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {ecosystem.layers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActive(layer.id)}
              className="shrink-0 rounded-lg px-3 py-2.5 text-left transition-colors lg:w-full lg:px-4 lg:py-3"
              style={{
                backgroundColor: active === layer.id ? "#ffffff" : "rgba(255,255,255,0.5)",
                color: active === layer.id ? "#1a1a1a" : "#6b6b6b",
                border:
                  active === layer.id
                    ? "1px solid rgba(26,26,26,0.1)"
                    : "1px solid rgba(26,26,26,0.06)",
                boxShadow: active === layer.id ? "0 4px 16px rgba(0,0,0,0.05)" : "none",
              }}
            >
              <p className="text-[9px] tracking-widest uppercase" style={{ color: "#8b322c" }}>
                {layer.name}
              </p>
              <p className="text-xs font-semibold lg:text-sm">{layer.nameKr}</p>
            </button>
          ))}
        </div>

        <div
          className="rounded-xl p-5 md:p-6"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(26,26,26,0.1)",
          }}
        >
          <h3 className="font-serif mb-2 text-xl font-semibold md:text-2xl">{current.nameKr}</h3>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
            {current.desc}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {current.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{ backgroundColor: "rgba(139,50,44,0.08)", color: "#8b322c" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
