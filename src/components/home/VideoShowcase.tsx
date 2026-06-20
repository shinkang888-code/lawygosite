"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useSiteContent } from "@/components/content/ContentContext";

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
    <section
      id="video"
      className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-16 md:py-20"
      style={{ backgroundColor: "#1c1b19", color: "#ffffff" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="mb-3 text-xs tracking-[0.2em] uppercase"
              style={{ color: "#c9a962" }}
            >
              Platform Walkthrough
            </p>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              42단계 IR 데모 시연 영상
            </h2>
            <p className="mt-3 max-w-xl text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              LawyGo 프로덕션 빌드 실제 화면 녹화. 대시보드·사건·법률백과·전자결재까지
              송무 전 과정을 확인하세요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setUseVideo(true)}
              className="rounded-full px-4 py-2 text-sm"
              style={{
                backgroundColor: useVideo ? "rgba(201,169,98,0.2)" : "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
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
              className="rounded-full px-4 py-2 text-sm"
              style={{
                backgroundColor: !useVideo ? "rgba(201,169,98,0.2)" : "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
              }}
            >
              제품 스크린샷
            </button>
            <button
              type="button"
              onClick={togglePlayback}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
              }}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              {playing ? "일시정지" : "재생"}
            </button>
          </div>
        </div>

        <div
          className="relative mb-6 overflow-hidden rounded-xl"
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
              sizes="(max-width: 1200px) 100vw, 1152px"
              priority={activeIndex === 0}
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)",
            }}
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                {chapter.time}
              </p>
              <p className="text-lg font-semibold">{chapter.label}</p>
            </div>
            <a
              href={hero.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto rounded-full px-5 py-2.5 text-sm font-medium"
              style={{ backgroundColor: "#8b322c", color: "#ffffff" }}
            >
              라이브에서 체험
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {videoChapters.map((ch, i) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => jumpToChapter(i)}
              className="rounded-lg p-4 text-left transition-all"
              style={{
                backgroundColor:
                  activeIndex === i
                    ? "rgba(201,169,98,0.15)"
                    : "rgba(255,255,255,0.04)",
                border:
                  activeIndex === i
                    ? "1px solid rgba(201,169,98,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                color: "#ffffff",
              }}
            >
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {ch.time}
              </p>
              <p className="text-sm font-medium">{ch.label}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
