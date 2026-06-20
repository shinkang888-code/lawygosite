"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { useSiteContent } from "@/components/content/ContentContext";
import { useTab } from "@/components/home/TabContext";

export function HeroCinematic() {
  const { setTab } = useTab();
  const { hero } = useSiteContent();

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "min(72vh, 640px)" }}>
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
              "linear-gradient(105deg, rgba(242,240,235,0.94) 0%, rgba(242,240,235,0.82) 50%, rgba(242,240,235,0.4) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[min(72vh,640px)] max-w-6xl items-center gap-8 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
        <div>
          <p className="legal-label mb-3">{hero.eyebrow}</p>
          <p
            className="mb-2 text-[0.65rem] font-medium tracking-[0.22em] uppercase md:text-xs"
            style={{ color: "#6b6b6b" }}
          >
            {hero.headlineEn}
          </p>
          <h1
            className="font-serif mb-4 max-w-2xl text-3xl leading-[1.12] font-semibold tracking-tight whitespace-pre-line sm:text-4xl lg:text-5xl"
            style={{ color: "#1a1a1a" }}
          >
            {hero.headline}
          </h1>
          <p
            className="mb-6 max-w-xl text-sm leading-relaxed md:text-base"
            style={{ color: "#4a4a4a" }}
          >
            {hero.subheadline}
          </p>
          <div className="flex flex-wrap items-center gap-3">
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

        <div
          className="hidden overflow-hidden rounded-xl lg:block"
          style={{
            border: "1px solid rgba(26,26,26,0.1)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          }}
        >
          <div className="relative aspect-[16/10]">
            <Image
              src="/media/product/dashboard.png"
              alt="LawyGo 대시보드"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 0vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
