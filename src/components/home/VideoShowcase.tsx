"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useSiteContent } from "@/components/content/ContentContext";
import { SectionShell } from "@/components/home/layout/SectionShell";

function parseChapterTime(time: string) {
  const [min, sec] = time.split(":").map(Number);
  return min * 60 + sec;
}

export function VideoShowcase() {
  const { hero, videoChapters } = useSiteContent();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [useVideo, setUseVideo] = useState(true);

  const chapter = videoChapters[activeIndex];

  useEffect(() => {
    if (!playing || useVideo) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % videoChapters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [playing, useVideo, videoChapters.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useVideo) return;

    const onTimeUpdate = () => {
      const t = video.currentTime;
      let idx = 0;
      for (let i = videoChapters.length - 1; i >= 0; i--) {
        if (t >= parseChapterTime(videoChapters[i].time)) {
          idx = i;
          break;
        }
      }
      setActiveIndex(idx);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [useVideo, videoChapters]);

  const jumpToChapter = (index: number) => {
    setActiveIndex(index);
    const video = videoRef.current;
    if (video && useVideo) {
      video.currentTime = parseChapterTime(videoChapters[index].time);
      void video.play();
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (video && useVideo) {
      if (video.paused) {
        void video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
      return;
    }
    setPlaying((p) => !p);
  };

  return (
    <SectionShell id="video" variant="dark" className="py-10 md:py-12">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-xs tracking-[0.2em] uppercase" style={{ color: "#c9a962" }}>
            Platform Walkthrough
          </p>
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">42단계 IR 데모 시연</h2>
          <p className="mt-2 max-w-lg text-xs md:text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            대시보드·사건·법률백과·전자결재까지 송무 전 과정을 확인하세요.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setUseVideo(true)}
            className="rounded-full px-3 py-1.5 text-xs"
            style={{
              backgroundColor: useVideo ? "rgba(201,169,98,0.2)" : "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            데모 영상
          </button>
          <button
            type="button"
            onClick={() => {
              setUseVideo(false);
              setPlaying(true);
              videoRef.current?.pause();
            }}
            className="rounded-full px-3 py-1.5 text-xs"
            style={{
              backgroundColor: !useVideo ? "rgba(201,169,98,0.2)" : "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            스크린샷
          </button>
          <button
            type="button"
            onClick={togglePlayback}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
            {playing ? "일시정지" : "재생"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ aspectRatio: "16/9", backgroundColor: "#0a0a0a" }}
        >
          {useVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover object-top"
              poster={hero.poster}
              preload="metadata"
              playsInline
              controls={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={hero.video} type="video/webm" />
            </video>
          ) : (
            <Image
              key={chapter.id}
              src={chapter.image}
              alt={chapter.label}
              fill
              className="object-cover object-top transition-opacity duration-700"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority={activeIndex === 0}
            />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
            }}
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                {chapter.time}
              </p>
              <p className="text-sm font-semibold md:text-base">{chapter.label}</p>
            </div>
            <a
              href={hero.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto shrink-0 rounded-full px-4 py-2 text-xs font-medium"
              style={{ backgroundColor: "#8b322c", color: "#ffffff" }}
            >
              라이브 체험
            </a>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {videoChapters.map((ch, i) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => jumpToChapter(i)}
              className="min-w-[140px] shrink-0 rounded-lg p-3 text-left transition-all lg:min-w-0"
              style={{
                backgroundColor:
                  activeIndex === i ? "rgba(201,169,98,0.15)" : "rgba(255,255,255,0.04)",
                border:
                  activeIndex === i
                    ? "1px solid rgba(201,169,98,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {ch.time}
              </p>
              <p className="text-xs font-medium md:text-sm">{ch.label}</p>
            </button>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
