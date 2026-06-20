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
            className="px-4 py-6 text-center md:px-5 md:py-7"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-serif mb-0.5 text-xl font-semibold md:text-2xl"
              style={{ color: "#c9a962" }}
            >
              {m.value}
            </p>
            <p className="text-xs font-medium md:text-sm">{m.label}</p>
            <p className="mt-0.5 text-[10px] md:text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              {m.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
