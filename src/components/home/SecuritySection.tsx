"use client";

import { useSiteContent } from "@/components/content/ContentContext";

export function SecuritySection() {
  const { security } = useSiteContent();

  return (
    <section
      id="security"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#f2f0eb", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="legal-label mb-4">{security.label}</p>
          <h2 className="font-serif mb-4 text-3xl font-semibold md:text-4xl">
            {security.title}
          </h2>
          <p className="mx-auto max-w-2xl text-base" style={{ color: "#6b6b6b" }}>
            {security.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {security.items.map((item) => (
            <article
              key={item.no}
              className="legal-card p-8"
              style={{ backgroundColor: "#ffffff", color: "#1a1a1a" }}
            >
              <p
                className="mb-4 font-serif text-3xl font-semibold"
                style={{ color: "#8b322c" }}
              >
                {item.no}
              </p>
              <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
