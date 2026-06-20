"use client";

import { useSiteContent } from "@/components/content/ContentContext";

export function ProofMetrics() {
  const { metrics } = useSiteContent();

  return (
    <section
      style={{
        backgroundColor: "#1c1b19",
        color: "#ffffff",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-5">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="px-6 py-10 text-center md:py-12"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-serif mb-1 text-2xl font-semibold md:text-3xl"
              style={{ color: "#c9a962" }}
            >
              {m.value}
            </p>
            <p className="text-sm font-medium">{m.label}</p>
            <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              {m.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
