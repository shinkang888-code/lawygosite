"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { useSiteContent } from "@/components/content/ContentContext";
import { useTab } from "@/components/home/TabContext";

export function HeroCinematic() {
  const { setTab } = useTab();
  const { hero } = useSiteContent();

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div className="absolute inset-0">
        <Image
          src={hero.poster}
          alt=""
          fill
          priority
          className="object-cover object-center scale-105 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(242,240,235,0.92) 0%, rgba(242,240,235,0.75) 45%, rgba(242,240,235,0.35) 100%)",
          }}
        />
      </div>

      <div
        className="relative mx-auto flex max-w-6xl flex-col justify-center px-6 pb-16 lg:px-8"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <p className="legal-label mb-5">{hero.eyebrow}</p>

        <p
          className="mb-3 text-xs font-medium tracking-[0.25em] uppercase"
          style={{ color: "#6b6b6b" }}
        >
          {hero.headlineEn}
        </p>

        <h1
          className="font-serif mb-8 max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight whitespace-pre-line sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          style={{ color: "#1a1a1a" }}
        >
          {hero.headline}
        </h1>

        <p
          className="mb-10 max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ color: "#4a4a4a" }}
        >
          {hero.subheadline}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="button" onClick={() => setTab("pricing")} className="btn-primary gap-2">
            {hero.ctaPrimary}
            <ArrowRight size={16} />
          </button>
          <button type="button" onClick={() => setTab("video")} className="btn-secondary gap-2">
            <Play size={14} />
            {hero.ctaSecondary}
          </button>
          <a
            href={hero.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline-offset-4 hover:underline"
            style={{ color: "#8b322c" }}
          >
            {hero.ctaLive} →
          </a>
        </div>
      </div>
    </section>
  );
}
