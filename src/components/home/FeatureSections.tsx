"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";

const INK = "#1a1a1a";
const INK_MUTED = "#6b6b6b";
const ACCENT = "#8b322c";
const PAPER = "#f2f0eb";

export function FeatureSections() {
  const { features } = useSiteContent();

  return (
    <section
      id="features"
      className="py-24 md:py-32"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-28 md:gap-36">
          {features.map((feature) => (
            <article
              key={feature.id}
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                feature.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div style={{ color: INK }}>
                <p className="legal-label mb-4">{feature.archive}</p>
                <h2
                  className="font-serif mb-6 text-3xl leading-tight font-semibold tracking-tight whitespace-pre-line md:text-4xl lg:text-[2.75rem]"
                  style={{ color: INK }}
                >
                  {feature.title}
                </h2>
                <p
                  className="mb-8 text-base leading-relaxed"
                  style={{ color: INK_MUTED }}
                >
                  {feature.description}
                </p>
                <ul>
                  {feature.points.map((point, i) => (
                    <li
                      key={point}
                      className="flex gap-4 py-4"
                      style={{
                        color: INK,
                        borderTop:
                          i === 0 ? "1px solid rgba(26,26,26,0.08)" : undefined,
                        borderBottom: "1px solid rgba(26,26,26,0.08)",
                      }}
                    >
                      <span
                        className="text-sm font-medium"
                        style={{ color: ACCENT }}
                      >
                        [{String(i + 1).padStart(2, "0")}]
                      </span>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
