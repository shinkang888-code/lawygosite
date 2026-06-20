"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";
import { SectionHeader } from "@/components/home/layout/SectionHeader";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function FeatureSections() {
  const { features } = useSiteContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const feature = features[activeIndex] ?? features[0];

  if (!feature) return null;

  return (
    <SectionShell id="features" variant="light" noPadding className="py-8 md:py-10">
      <SectionHeader label="Core Features" title="송무 실무 핵심 기능" />

      <div className="mb-4 flex flex-wrap gap-2">
        {features.map((f, i) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:text-sm"
            style={{
              backgroundColor: activeIndex === i ? "#8b322c" : "#ffffff",
              color: activeIndex === i ? "#ffffff" : "#6b6b6b",
              border: "1px solid rgba(26,26,26,0.1)",
            }}
          >
            {f.archive}
          </button>
        ))}
      </div>

      <article className="grid items-center gap-5 lg:grid-cols-2 lg:gap-8">
        <div className="relative aspect-[16/10] max-h-[280px] overflow-hidden rounded-lg lg:max-h-none">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <h3 className="font-serif mb-3 text-xl font-semibold whitespace-pre-line md:text-2xl">
            {feature.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
            {feature.description}
          </p>
          <ul className="grid gap-2 sm:grid-cols-1">
            {feature.points.map((point, i) => (
              <li
                key={point}
                className="flex gap-3 rounded-lg px-3 py-2.5 text-sm"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(26,26,26,0.08)",
                }}
              >
                <span className="font-medium" style={{ color: "#8b322c" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </SectionShell>
  );
}
