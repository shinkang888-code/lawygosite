"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";

export function CtaBanner() {
  const { cta } = useSiteContent();

  return (
    <section id="demo" className="relative overflow-hidden py-12 md:py-16">
      <div className="absolute inset-0">
        <Image
          src={cta.image}
          alt=""
          fill
          className="object-cover opacity-35 blur-sm"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(242, 240, 235, 0.88)" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 lg:grid-cols-[1.2fr_auto] lg:gap-10 lg:px-8">
        <div>
          <p className="legal-label mb-3">{cta.archive}</p>
          <h2 className="font-serif mb-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {cta.headline}
          </h2>
          <p className="text-sm" style={{ color: "#6b6b6b" }}>
            {cta.subheadline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <a href="#" className="btn-dark px-6 py-3">
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
