"use client";

import { useSiteContent } from "@/components/content/ContentContext";

export function ModuleGrid() {
  const { modules } = useSiteContent();

  return (
    <section
      id="modules"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#1c1b19", color: "#ffffff" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs tracking-[0.2em] uppercase" style={{ color: "#c9a962" }}>
            {modules.archive}
          </p>
          <h2 className="font-serif text-3xl font-semibold whitespace-pre-line md:text-5xl">
            {modules.title}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.items.map((mod) => (
            <article
              key={mod.id}
              className="rounded-lg p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="mb-2 text-[10px] tracking-widest" style={{ color: "#c9a962" }}>
                {mod.id}
              </p>
              <h3 className="mb-2 text-base font-semibold">{mod.title}</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                {mod.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
