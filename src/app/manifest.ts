import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LawyGo — 송무관리 프로그램",
    short_name: "LawyGo",
    description:
      "진행 중인 모든 사건의 기일·불변기한·결재·자료를 놓치지 않고 추적합니다.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f2f0eb",
    theme_color: "#8b322c",
    lang: "ko",
    dir: "ltr",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/brand/lawygo-icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/lawygo-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/lawygo-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
