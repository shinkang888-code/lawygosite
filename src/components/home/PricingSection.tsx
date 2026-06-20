"use client";

import { useSiteContent } from "@/components/content/ContentContext";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function PricingSection() {
  const { pricing, cta, hero } = useSiteContent();

  return (
    <SectionShell id="pricing" variant="light" noPadding className="pt-8 pb-6 md:pt-10 md:pb-8">
      <div
        className="mb-6 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between md:mb-8 md:p-5"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid rgba(26,26,26,0.1)",
        }}
      >
        <div className="min-w-0">
          <p className="legal-label mb-1">{cta.archive}</p>
          <h2 className="font-serif text-lg font-semibold tracking-tight md:text-xl">
            {cta.headline}
          </h2>
          <p className="mt-1 text-xs md:text-sm" style={{ color: "#6b6b6b" }}>
            {cta.subheadline}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <a
            href="#pricing-plans"
            className="inline-flex items-center justify-center border px-4 py-2 text-xs font-medium md:text-sm"
            style={{
              borderColor: "rgba(26,26,26,0.2)",
              color: "#1a1a1a",
              backgroundColor: "#ffffff",
            }}
          >
            {cta.ctaSecondary}
          </a>
          <a
            href={hero.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white md:text-sm"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            {cta.ctaPrimary}
          </a>
        </div>
      </div>

      <div
        id="pricing-plans"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {pricing.plans.map((plan) => (
          <article
            key={plan.id}
            className="legal-card relative flex flex-col p-3.5 md:p-4"
            style={{
              border: plan.highlight ? "2px solid #8b322c" : "1px solid rgba(26,26,26,0.1)",
            }}
          >
            {plan.badge && (
              <span
                className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] font-medium tracking-widest uppercase"
                style={{ backgroundColor: "#8b322c", color: "#ffffff" }}
              >
                {plan.badge}
              </span>
            )}

            <h3 className="mb-0.5 text-sm font-semibold md:text-base">{plan.name}</h3>
            <p className="mb-2 text-[10px] leading-snug md:text-xs" style={{ color: "#6b6b6b" }}>
              {plan.description}
            </p>

            <div
              className="mb-2 border-b pb-2 text-center"
              style={{ borderColor: "rgba(26,26,26,0.08)" }}
            >
              <p className="font-serif text-lg font-semibold md:text-xl">
                {plan.price}
                {plan.period && (
                  <span className="text-xs font-normal" style={{ color: "#6b6b6b" }}>
                    {plan.period}
                  </span>
                )}
              </p>
            </div>

            <ul className="mb-3 flex-1 space-y-0.5">
              {plan.features.map((feature) => (
                <li key={feature} className="text-[10px] md:text-xs" style={{ color: "#6b6b6b" }}>
                  + {feature}
                </li>
              ))}
            </ul>

            <a
              href={hero.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                plan.highlight
                  ? "inline-flex w-full items-center justify-center px-3 py-2 text-xs font-medium text-white md:text-sm"
                  : "inline-flex w-full items-center justify-center border px-3 py-2 text-xs font-medium md:text-sm"
              }
              style={
                plan.highlight
                  ? { backgroundColor: "#8b322c" }
                  : { borderColor: "rgba(26,26,26,0.2)", color: "#1a1a1a" }
              }
            >
              {plan.cta}
            </a>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
