"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";

export function CtaBanner() {
  const { cta } = useSiteContent();

  return (
    <section id="demo" className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0">
        <Image
          src={cta.image}
          alt=""
          fill
          className="object-cover opacity-40 blur-sm"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(242, 240, 235, 0.85)" }}
        />
      </div>

      <div
        className="relative mx-auto max-w-3xl px-6 text-center lg:px-8"
        style={{ color: "#1a1a1a" }}
      >
        <p className="legal-label mb-6">{cta.archive}</p>
        <h2
          className="font-serif mb-6 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
          style={{ color: "#1a1a1a" }}
        >
          {cta.headline}
        </h2>
        <p className="mb-10 text-base" style={{ color: "#6b6b6b" }}>
          {cta.subheadline}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#" className="btn-dark px-8 py-3.5">
            {cta.ctaPrimary}
          </a>
          <a href="#pricing" className="btn-secondary">
            {cta.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
