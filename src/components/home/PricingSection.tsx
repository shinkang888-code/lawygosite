"use client";

import { useSiteContent } from "@/components/content/ContentContext";

export function PricingSection() {
  const { pricing } = useSiteContent();

  return (
    <section
      id="pricing"
      className="legal-section-light py-24 md:py-32"
      style={{ backgroundColor: "#f7f5f2", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="legal-label mb-4">{pricing.label}</p>
          <h2
            className="font-serif text-3xl font-semibold tracking-tight whitespace-pre-line md:text-4xl lg:text-5xl"
            style={{ color: "#1a1a1a" }}
          >
            {pricing.title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pricing.plans.map((plan) => (
            <article
              key={plan.id}
              className="legal-card relative flex flex-col p-8"
              style={{
                backgroundColor: "#ffffff",
                color: "#1a1a1a",
                border: plan.highlight
                  ? "2px solid #8b322c"
                  : "1px solid rgba(26,26,26,0.1)",
              }}
            >
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-medium tracking-widest uppercase"
                  style={{ backgroundColor: "#8b322c", color: "#ffffff" }}
                >
                  {plan.badge}
                </span>
              )}

              <h3 className="mb-2 text-xl font-semibold" style={{ color: "#1a1a1a" }}>
                {plan.name}
              </h3>
              <p className="mb-6 text-sm" style={{ color: "#6b6b6b" }}>
                {plan.description}
              </p>

              <div
                className="mb-8 border-b pb-8 text-center"
                style={{ borderColor: "rgba(26,26,26,0.08)" }}
              >
                <p className="font-serif text-3xl font-semibold" style={{ color: "#1a1a1a" }}>
                  {plan.price}
                  {plan.period && (
                    <span className="text-base font-normal" style={{ color: "#6b6b6b" }}>
                      {plan.period}
                    </span>
                  )}
                </p>
              </div>

              <ul className="mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={feature}
                    className="py-3 text-sm"
                    style={{
                      color: "#6b6b6b",
                      borderTop: i === 0 ? "1px solid rgba(26,26,26,0.08)" : undefined,
                      borderBottom: "1px solid rgba(26,26,26,0.08)",
                    }}
                  >
                    + {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#demo"
                className={
                  plan.highlight
                    ? "btn-primary w-full text-center"
                    : "btn-secondary w-full text-center"
                }
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
