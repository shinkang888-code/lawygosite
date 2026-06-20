"use client";

import { useSiteContent } from "@/components/content/ContentContext";

export function TestimonialsSection() {
  const { testimonials } = useSiteContent();

  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "#f2f0eb", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full text-xl font-serif"
          style={{ backgroundColor: "#ebe6dd", color: "#8b322c" }}
        >
          &ldquo;
        </div>
        <blockquote
          className="font-serif mb-8 text-2xl leading-relaxed font-medium md:text-3xl"
          style={{ color: "#1a1a1a" }}
        >
          {testimonials.featured.quote}
        </blockquote>
        <p className="text-sm font-semibold">{testimonials.featured.name}</p>
        <p className="text-sm" style={{ color: "#6b6b6b" }}>
          {testimonials.featured.role}
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.secondary.map((t) => (
            <div
              key={t.name}
              className="rounded-xl p-6 text-left"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,26,26,0.08)",
              }}
            >
              <p className="mb-4 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs" style={{ color: "#9a9a9a" }}>
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
