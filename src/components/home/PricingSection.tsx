"use client";

import { useSiteContent } from "@/components/content/ContentContext";
import { SectionHeader } from "@/components/home/layout/SectionHeader";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function PricingSection() {
  const { pricing } = useSiteContent();

  return (
    <SectionShell id="pricing" variant="light" noPadding className="pt-10 pb-6 md:pt-12 md:pb-8">
      <SectionHeader label={pricing.label} title={pricing.title} align="center" />

      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {pricing.plans.map((plan) => (
          <article
            key={plan.id}
            className="legal-card relative flex flex-col p-5 md:p-6"
            style={{
              border: plan.highlight ? "2px solid #8b322c" : "1px solid rgba(26,26,26,0.1)",
            }}
          >
            {plan.badge && (
              <span
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[9px] font-medium tracking-widest uppercase"
                style={{ backgroundColor: "#8b322c", color: "#ffffff" }}
              >
                {plan.badge}
              </span>
            )}

            <h3 className="mb-1 text-lg font-semibold">{plan.name}</h3>
            <p className="mb-4 text-xs" style={{ color: "#6b6b6b" }}>
              {plan.description}
            </p>

            <div
              className="mb-4 border-b pb-4 text-center"
              style={{ borderColor: "rgba(26,26,26,0.08)" }}
            >
              <p className="font-serif text-2xl font-semibold md:text-3xl">
                {plan.price}
                {plan.period && (
                  <span className="text-sm font-normal" style={{ color: "#6b6b6b" }}>
                    {plan.period}
                  </span>
                )}
              </p>
            </div>

            <ul className="mb-5 flex-1 space-y-1.5">
              {plan.features.map((feature) => (
                <li key={feature} className="text-xs" style={{ color: "#6b6b6b" }}>
                  + {feature}
                </li>
              ))}
            </ul>

            <a
              href="#demo"
              className={plan.highlight ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
            >
              {plan.cta}
            </a>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
