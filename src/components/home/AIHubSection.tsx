"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";
import { SectionHeader } from "@/components/home/layout/SectionHeader";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function AIHubSection() {
  const { aiFeatures, differentiators } = useSiteContent();
  const aiImage =
    differentiators.find((d) => d.id === "patent")?.image ?? "/media/hero/ai-hub.jpg";

  return (
    <SectionShell id="ai" variant="paper" noPadding className="pt-10 pb-6 md:pt-12 md:pb-8">
      <SectionHeader
        label="Roygo AI Hub"
        title="6-in-1 AI 문서 엔진"
        description="Gemini·ChatGPT 교사 → 로이고 R1 학생. 특허 10-2019-0015797 순위화 프레임워크 기반."
      />

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl lg:sticky lg:top-24">
          <Image
            src={aiImage}
            alt="로이고 AI 허브"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {aiFeatures.map((f) => (
              <div
                key={f.id}
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(26,26,26,0.08)",
                }}
              >
                <p className="mb-0.5 text-xs font-semibold md:text-sm">{f.title}</p>
                <p className="text-[11px] leading-snug md:text-xs" style={{ color: "#6b6b6b" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-4 rounded-lg px-4 py-3"
            style={{ backgroundColor: "#1c1b19", color: "#ffffff" }}
          >
            <p className="text-[10px] tracking-widest uppercase" style={{ color: "#c9a962" }}>
              Distillation Pipeline
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Gemini → ai_distillation_samples → 검수 → roygo-r1-export.jsonl → LoRA → R1 강화
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
