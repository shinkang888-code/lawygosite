"use client";

import { useSiteContent } from "@/components/content/ContentContext";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function TestimonialsSection() {
  const { testimonials } = useSiteContent();

  return (
    <SectionShell variant="paper" noPadding className="py-8 md:py-10">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-8">
        <div
          className="rounded-xl p-5 md:p-6"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(26,26,26,0.08)",
          }}
        >
          <p className="legal-label mb-3">Testimonials</p>
          <blockquote className="font-serif mb-4 text-lg leading-relaxed font-medium md:text-xl">
            &ldquo;{testimonials.featured.quote}&rdquo;
          </blockquote>
          <p className="text-sm font-semibold">{testimonials.featured.name}</p>
          <p className="text-xs" style={{ color: "#6b6b6b" }}>
            {testimonials.featured.role}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {testimonials.secondary.map((t) => (
            <div
              key={t.name}
              className="rounded-xl p-4"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,26,26,0.08)",
              }}
            >
              <p className="mb-3 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-xs font-semibold">{t.name}</p>
              <p className="text-[11px]" style={{ color: "#9a9a9a" }}>
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
