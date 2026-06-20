"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";

export function AIHubSection() {
  const { aiFeatures, differentiators } = useSiteContent();
  const aiImage =
    differentiators.find((d) => d.id === "patent")?.image ?? "/media/hero/ai-hub.jpg";

  return (
    <section
      id="ai"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#f2f0eb", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-square overflow-hidden rounded-xl lg:aspect-[4/5]">
            <Image
              src={aiImage}
              alt="로이고 AI 허브"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="legal-label mb-4">Roygo AI Hub</p>
            <h2 className="font-serif mb-6 text-3xl font-semibold md:text-4xl">
              6-in-1 AI 문서 엔진
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "#6b6b6b" }}>
              Gemini·ChatGPT를 교사로, 로이고 R1을 학생으로 하는 지식 증류 루프.
              특허 10-2019-0015797 순위화 프레임워크가 모든 AI 기능의 기반입니다.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {aiFeatures.map((f) => (
                <div
                  key={f.id}
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(26,26,26,0.08)",
                    color: "#1a1a1a",
                  }}
                >
                  <p className="mb-1 text-sm font-semibold">{f.title}</p>
                  <p className="text-xs" style={{ color: "#6b6b6b" }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-8 rounded-lg p-5"
              style={{
                backgroundColor: "#1c1b19",
                color: "#ffffff",
              }}
            >
              <p className="text-xs tracking-widest uppercase" style={{ color: "#c9a962" }}>
                Distillation Pipeline
              </p>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                Gemini 성공 응답 → ai_distillation_samples → 관리자 검수 →
                roygo-r1-export.jsonl → GPU LoRA → R1 강화
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
