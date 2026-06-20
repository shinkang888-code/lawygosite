"use client";

import { useSiteContent } from "@/components/content/ContentContext";

export function SecuritySection({ embedded = false }: { embedded?: boolean }) {
  const { security } = useSiteContent();

  const content = (
    <>
      {!embedded && (
        <div className="mb-6 text-center md:mb-8">
          <p className="legal-label mb-2">{security.label}</p>
          <h2 className="font-serif mb-2 text-2xl font-semibold md:text-3xl">{security.title}</h2>
          <p className="mx-auto max-w-2xl text-sm" style={{ color: "#6b6b6b" }}>
            {security.description}
          </p>
        </div>
      )}

      {embedded && (
        <div className="mb-4 md:flex md:items-end md:justify-between md:gap-6">
          <div>
            <p className="legal-label mb-1">{security.label}</p>
            <h3 className="font-serif text-lg font-semibold md:text-xl">{security.title}</h3>
          </div>
          <p className="mt-2 max-w-md text-xs md:mt-0 md:text-right" style={{ color: "#6b6b6b" }}>
            {security.description}
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {security.items.map((item) => (
          <article
            key={item.no}
            className="legal-card p-4 md:p-5"
            style={{ backgroundColor: "#ffffff" }}
          >
            <p className="mb-2 font-serif text-2xl font-semibold" style={{ color: "#8b322c" }}>
              {item.no}
            </p>
            <h3 className="mb-1.5 text-sm font-semibold md:text-base">{item.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </>
  );

  if (embedded) return content;

  return (
    <section
      id="security"
      className="py-10 md:py-12"
      style={{ backgroundColor: "#f2f0eb", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">{content}</div>
    </section>
  );
}
