export const PLATFORM = {
  hero: {
    eyebrow: "AI Litigation Infrastructure · Korea Native",
    headline: "법률 지능의 미래를\n대한민국 법원에서 시작합니다",
    headlineEn: "The AI Litigation Hub Built for Korean Courts",
    subheadline:
      "Harvey가 글로벌 리서치를 바꿨다면, LawyGo는 한국 송무의 운영·법원·한글·AI를 하나의 인프라로 통합합니다. 특허 기반 법률백과, 자체 R1 추론, 대법원 사건 동기화까지 — 로펌이 실제로 쓰는 플랫폼입니다.",
    ctaPrimary: "Enterprise Demo 요청",
    ctaSecondary: "플랫폼 영상 보기",
    ctaLive: "라이브 데모 체험",
    liveUrl: "https://lawygo.vercel.app/login",
    poster: "/media/hero/cinematic.jpg",
    video: "/media/product/lawygo-demo.webm",
  },
  metrics: [
    { value: "42", label: "단계 라이브 데모", sub: "IR 검증 완료" },
    { value: "18/18", label: "프로덕션 QA", sub: "2026.06 통과" },
    { value: "15+", label: "송무 모듈", sub: "LawTop GL 대응" },
    { value: "6-in-1", label: "AI 문서 엔진", sub: "백과·판례·서면" },
    { value: "KR", label: "특허 10-2019-0015797", sub: "순위화 프레임워크" },
  ],
} as const;

export const ECOSYSTEM = {
  title: "하나의 플랫폼, 여섯 개의 지능 레이어",
  subtitle:
        "Harvey의 Assistant·Vault·Knowledge 구조를 한국 송무 실무에 맞게 재설계했습니다.",
  layers: [
    {
      id: "litigation",
      name: "Litigation Core",
      nameKr: "송무 운영 허브",
      desc: "사건·기일·결재·수납·메신저 15+ 모듈. LawTop GL 완전 대체.",
      tags: ["D-Day", "전자결재", "엑셀 RT"],
    },
    {
      id: "encyclopedia",
      name: "Legal Encyclopedia",
      nameKr: "로이고법률백과",
      desc: "특허 기반 온톨로지·의미벡터·순위화·모범답안 파이프라인.",
      tags: ["특허", "4-Frame UI", "순위화"],
    },
    {
      id: "r1",
      name: "Roygo R1",
      nameKr: "자체 추론 엔진",
      desc: "DeepSeek-R1 자체 GPU 호스팅. Gemini→R1 지식 증류 루프.",
      tags: ["vLLM", "LoRA", "AUTO 폴백"],
    },
    {
      id: "document",
      name: "Document Engine",
      nameKr: "AI 문서 엔진",
      desc: "판례추천·PDF요약·서면작성·법령검색·AI검색 6종 통합.",
      tags: ["OCR", "Brief", "Precedent"],
    },
    {
      id: "court",
      name: "Court Sync",
      nameKr: "법원 동기화",
      desc: "ssgo.scourt.go.kr Playwright 봇 + 제출기록 탭 + 캡차 OCR.",
      tags: ["scourt", "ddddocr", "Render"],
    },
    {
      id: "mobile",
      name: "LawyGo Mobile",
      nameKr: "PWA · TWA",
      desc: "설치형 앱. 법정 현장에서 사건·기일·제출기록 즉시 확인.",
      tags: ["PWA", "Play Store", "Capacitor"],
    },
  ],
} as const;

export const VIDEO_CHAPTERS = [
  { id: "dashboard", label: "업무 대시보드", time: "0:00", image: "/media/product/dashboard.png" },
  { id: "cases", label: "사건 관리", time: "0:45", image: "/media/product/cases.png" },
  { id: "encyclopedia", label: "로이고법률백과", time: "1:30", image: "/media/product/encyclopedia.png" },
  { id: "approval", label: "전자결재", time: "2:15", image: "/media/product/approval.png" },
] as const;

export const DIFFERENTIATORS = [
  {
    id: "patent",
    title: "특허 기반 법률 지능",
    stat: "KR 10-2019-0015797",
    desc: "범용 RAG가 아닌, 순위화 프레임워크·모범답안·4-Frame UI로 구현된 한국형 법률 AI.",
    image: "/media/hero/ai-hub.jpg",
  },
  {
    id: "court",
    title: "대법원 실시간 연동",
    stat: "ssgo.scourt.go.kr",
    desc: "Harvey·Clio에 없는 Playwright 기반 법원 조회 봇. 제출기록·기일 스냅샷 자동 반영.",
    image: "/media/sections/hero-courthouse.png",
  },
  {
    id: "hwp",
    title: "한글(HWP) 네이티브",
    stat: "HWP → HWPX",
    desc: "Render 사이드카 변환 + LawTop ZIP 일괄 이관. 한국 송무 문서 워크플로우 완전 지원.",
    image: "/media/sections/case-briefcase.png",
  },
  {
    id: "architecture",
    title: "3-Tier 하이브리드",
    stat: "Vercel + Supabase + Render",
    desc: "서버리스 UI + RLS 데이터 + GPU/HWP/봇 사이드카. 데이터 주권과 확장성 동시 확보.",
    image: "/media/sections/modules-grid.png",
  },
] as const;

export const ARCHITECTURE = {
  title: "엔터프라이즈급 3-Tier 아키텍처",
  tiers: [
    {
      name: "Experience Layer",
      provider: "Vercel Edge",
      items: ["Next.js 16 App Router", "PWA + TWA", "AI 프록시 API", "Google OAuth"],
    },
    {
      name: "Data Layer",
      provider: "Supabase Postgres",
      items: ["RLS 멀티테넌트", "legal_vectors", "scourt_search_jobs", "ai_distillation"],
    },
    {
      name: "Compute Layer",
      provider: "Render Singapore",
      items: ["lawygo-scourt-bot", "hwp-converter", "lawygo-ai-gateway", "GPU upstream"],
    },
  ],
} as const;

export const COMPARISON = {
  title: "글로벌 Legal SaaS와 무엇이 다른가",
  rows: [
    { feature: "한국 대법원 사건 동기화", lawygo: true, harvey: false, clio: false },
    { feature: "HWP → HWPX 변환", lawygo: true, harvey: false, clio: false },
    { feature: "LawTop GL 15모듈 대체", lawygo: true, harvey: false, clio: false },
    { feature: "특허 기반 법률백과", lawygo: true, harvey: false, clio: false },
    { feature: "자체 R1 + 증류 루프", lawygo: true, harvey: false, clio: false },
    { feature: "글로벌 리서치 AI", lawygo: "부분", harvey: true, clio: true },
    { feature: "미국 빌링·Trust Accounting", lawygo: "부분", harvey: false, clio: true },
  ],
} as const;

export const AI_FEATURES_DETAIL = [
  { id: "legal_encyclopedia", title: "로이고법률백과", desc: "온톨로지·의미벡터·순위화·모범답안" },
  { id: "case_search", title: "판례 자동 추천", desc: "사건 맥락 기반 PrecedentCard" },
  { id: "doc_summary", title: "판결문 PDF 요약", desc: "OCR + 5섹션 구조화" },
  { id: "doc_draft", title: "법률문서 자동작성", desc: "서면 초안 + 법조문 하이라이트" },
  { id: "law_search", title: "법령 검색", desc: "law.go.kr 조문 연동" },
  { id: "ai_search", title: "AI 통합 검색", desc: "자연어 기반 통합 답변" },
] as const;
