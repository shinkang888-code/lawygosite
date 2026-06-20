"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";

export function PlatformEcosystem() {
  const { ecosystem } = useSiteContent();
  const [active, setActive] = useState(ecosystem.layers[0]?.id ?? "litigation");
  const current = ecosystem.layers.find((l) => l.id === active)!;

  return (
    <section
      id="platform"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#f2f0eb", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="legal-label mb-4">Platform Ecosystem</p>
          <h2
            className="font-serif mb-4 text-3xl font-semibold tracking-tight md:text-5xl"
            style={{ color: "#1a1a1a" }}
          >
            {ecosystem.title}
          </h2>
          <p style={{ color: "#6b6b6b" }}>{ecosystem.subtitle}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-1">
            {ecosystem.layers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActive(layer.id)}
                className="rounded-lg px-4 py-3 text-left transition-colors"
                style={{
                  backgroundColor:
                    active === layer.id ? "#ffffff" : "transparent",
                  color: active === layer.id ? "#1a1a1a" : "#6b6b6b",
                  border:
                    active === layer.id
                      ? "1px solid rgba(26,26,26,0.1)"
                      : "1px solid transparent",
                  boxShadow:
                    active === layer.id
                      ? "0 4px 24px rgba(0,0,0,0.06)"
                      : "none",
                }}
              >
                <p className="text-[10px] tracking-widest uppercase" style={{ color: "#8b322c" }}>
                  {layer.name}
                </p>
                <p className="text-sm font-semibold">{layer.nameKr}</p>
              </button>
            ))}
          </div>

          <div
            className="rounded-xl p-8 md:p-10"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(26,26,26,0.1)",
              color: "#1a1a1a",
            }}
          >
            <h3 className="font-serif mb-2 text-2xl font-semibold md:text-3xl">
              {current.nameKr}
            </h3>
            <p className="mb-6 text-base leading-relaxed" style={{ color: "#6b6b6b" }}>
              {current.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(139,50,44,0.08)",
                    color: "#8b322c",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
