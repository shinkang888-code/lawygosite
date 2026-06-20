"use client";

import { useSiteContent } from "@/components/content/ContentContext";
import { SectionHeader } from "@/components/home/layout/SectionHeader";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function ModuleGrid() {
  const { modules } = useSiteContent();

  return (
    <SectionShell id="modules" variant="dark" noPadding className="py-8 md:py-10">
      <SectionHeader
        label={modules.archive}
        title={modules.title}
        dark
      />

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3">
        {modules.items.map((mod) => (
          <article
            key={mod.id}
            className="rounded-lg p-3.5 md:p-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="mb-1 text-[9px] tracking-widest" style={{ color: "#c9a962" }}>
              {mod.id}
            </p>
            <h3 className="mb-1 text-sm font-semibold">{mod.title}</h3>
            <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>
              {mod.desc}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
