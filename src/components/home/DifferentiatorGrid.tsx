"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";

export function DifferentiatorGrid() {
  const { differentiators } = useSiteContent();

  return (
    <section
      id="differentiators"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#f7f5f2", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="legal-label mb-4">Why LawyGo</p>
          <h2 className="font-serif text-3xl font-semibold md:text-5xl">
            Harvey도, Clio도 할 수 없는 것
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {differentiators.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,26,26,0.08)",
              }}
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p
                  className="mb-2 text-xs font-medium tracking-widest uppercase"
                  style={{ color: "#8b322c" }}
                >
                  {item.stat}
                </p>
                <h3 className="font-serif mb-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
