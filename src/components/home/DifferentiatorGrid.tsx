"use client";

import { useSiteContent } from "@/components/content/ContentContext";
import { SectionHeader } from "@/components/home/layout/SectionHeader";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function DifferentiatorGrid() {
  const { differentiators } = useSiteContent();

  return (
    <SectionShell id="differentiators" variant="light" noPadding className="py-8 md:py-10">
      <SectionHeader
        label="Why LawyGo"
        title="Harvey도, Clio도 할 수 없는 것"
        align="center"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {differentiators.map((item) => (
          <article
            key={item.id}
            className="rounded-xl p-4"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(26,26,26,0.08)",
            }}
          >
            <p
              className="mb-1.5 text-[10px] font-medium tracking-widest uppercase"
              style={{ color: "#8b322c" }}
            >
              {item.stat}
            </p>
            <h3 className="font-serif mb-2 text-base font-semibold leading-snug md:text-lg">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
