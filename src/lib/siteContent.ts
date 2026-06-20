import { NAV_TABS } from "./navTabs";

export const SITE_BRAND = {
  name: "LAWYGO",
  tagline: "Knowledge, Precedent, Technology",
} as const;

/** @deprecated Use NAV_TABS from navTabs.ts */
export const NAV_LINKS = NAV_TABS.map((tab) => ({
  label: tab.label,
  href: `#${tab.id}`,
}));

export const HERO = {
  archive: "Archive 01 / 송무관리 프로그램",
  headline: "사건 수임은\n끝이 아닌 시작입니다",
  subheadline:
    "진행 중인 모든 사건의 기일·불변기한·결재·자료를 놓치지 않고 추적합니다. 이제 LawyGo에게 맡겨보세요.",
  ctaPrimary: "무료 체험 신청",
  ctaSecondary: "기능 살펴보기",
  image: "/media/sections/hero-courthouse.png",
} as const;

export const FEATURES = [
  {
    id: "cases",
    archive: "01. Case Management",
    title: "수백 건의 사건도\n한눈에 정렬·검색",
    description:
      "사건번호, 의뢰인, 담당자, 진행상태를 한 화면에서 관리합니다. LawTop GL형 엑셀로 기존 데이터를 그대로 가져오고, 수정·보내기까지 round-trip 합니다.",
    points: [
      "법원 사건 동기화로 자동 반영",
      "엑셀 import preview로 일괄 검증",
      "사건별 메모·자료실 통합 관리",
    ],
    image: "/media/sections/case-briefcase.png",
    reverse: true,
    preview: {
      cases: [
        { no: "2025가단12345", dday: "D-2" },
        { no: "2025드단67890", dday: "D-5" },
        { no: "2024나98765", dday: "D-12" },
      ],
      stats: [
        { label: "오늘 기일", value: "2" },
        { label: "3일 이내", value: "5" },
        { label: "진행 사건", value: "128" },
      ],
    },
  },
  {
    id: "deadline",
    archive: "02. Deadline Tracking",
    title: "기일·불변기한을\n놓치지 않게",
    description:
      "오늘·3일·7일 이내 기일을 색상으로 구분하고, 14일 이내 예정 기일을 D-Day와 함께 표시합니다. 송무팀 전체가 같은 일정을 봅니다.",
    points: [
      "업무 대시보드 기일 카드",
      "기일 달력 & 팝업 관리",
      "14일 이내 D-Day 사이드바",
    ],
    image: "/media/sections/deadline-dashboard.png",
    reverse: false,
    preview: {
      deadlines: [
        { type: "변론기일", date: "6/9", case: "2025가단12345", dday: "D-Day", urgent: true },
        { type: "서면제출", date: "6/11", case: "2025드단67890", dday: "D-2", urgent: false },
        { type: "불변기한", date: "6/14", case: "2024나98765", dday: "D-5", urgent: false },
      ],
    },
  },
] as const;

export const MODULES = {
  archive: "Modular Structure / v2.4",
  title: "하나의 플랫폼에서,\n15개 이상의 송무 모듈",
  items: [
    { id: "MOD_01", title: "업무 대시보드", desc: "공지·기일·담당사건·결재 한 화면" },
    { id: "MOD_02", title: "사건 관리", desc: "등록·목록·상세·메모·자료실" },
    { id: "MOD_03", title: "기일 달력", desc: "월간·주간 일정과 팝업 관리" },
    { id: "MOD_04", title: "전자결재", desc: "다단계 결재선·이력·첨부" },
    { id: "MOD_05", title: "상담 관리", desc: "상담 이력·회의실 연동" },
    { id: "MOD_06", title: "고객 관리", desc: "의뢰인·엑셀 import preview" },
    { id: "MOD_07", title: "회계·수납", desc: "수임료와 미수금 추적" },
    { id: "MOD_08", title: "통계·분석", desc: "사건·업무 리포트" },
  ],
} as const;

export const TESTIMONIALS = {
  featured: {
    quote:
      "엑셀과 메모에 흩어져 있던 사건을 LawyGo로 옮긴 뒤, 다음 기일을 놓친 적이 없어요. 대시보드만 보면 오늘 할 일이 정리됩니다.",
    name: "김현수",
    role: "대표변호사 · 법무법인 한결",
  },
  secondary: [
    {
      quote:
        "결재·공지·사건 목록이 따로 놀지 않아서 사무장 업무가 훨씬 수월해졌어요. import preview 덕분에 엑셀 이관도 안심하고 했습니다.",
      name: "이수민",
      role: "사무장 · 정림 법률사무소",
    },
    {
      quote:
        "법원 동기화로 사건 정보 입력 시간이 줄었고, 의뢰인별 탭 제목까지 자동이라 여러 사건을 동시에 다루기 편합니다.",
      name: "박지훈",
      role: "변호사 · 율현 법률사무소",
    },
  ],
} as const;

export const PRICING = {
  label: "Pricing",
  title: "나에게 맞는\nLawyGo를 선택하세요",
  plans: [
    {
      id: "core",
      name: "Core",
      description: "소형 로펌·1인 사무소를 위한 핵심 송무관리",
      price: "₩300,000",
      period: "/월",
      features: [
        "사건 등록·목록·상세",
        "기일 달력 & D-Day",
        "LawTop형 엑셀 import",
        "공지 게시판",
      ],
      cta: "Core 시작",
      highlight: false,
      badge: null,
    },
    {
      id: "professional",
      name: "Professional",
      description: "전자결재와 고도화된 워크플로우 포함",
      price: "₩750,000",
      period: "/월",
      features: [
        "Core 전체 기능",
        "다단계 전자결재",
        "회계·수납 모듈",
        "사내·외부 메신저",
      ],
      cta: "Professional 상담",
      highlight: true,
      badge: "Most Popular",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "대형 로펌·법무팀을 위한 맞춤 설계",
      price: "별도 문의",
      period: "",
      features: [
        "Professional 전체",
        "온프레미스 옵션",
        "기존 시스템 마이그레이션",
        "전담 매니저",
      ],
      cta: "영업팀 문의",
      highlight: false,
      badge: null,
    },
  ],
} as const;

export const SECURITY = {
  label: "Security",
  title: "기술과 보안",
  description:
    "송무 데이터는 신뢰가 전부입니다. 인증·권한·인프라를 분리해 보호합니다.",
  items: [
    {
      no: "01",
      title: "세션 기반 인증",
      desc: "사이트 회원·Google OAuth, 역할별 메뉴·권한 분리",
    },
    {
      no: "02",
      title: "Supabase + RLS",
      desc: "Row Level Security로 조직별 데이터 보호",
    },
    {
      no: "03",
      title: "Vercel 배포",
      desc: "HTTPS, 환경 변수 분리, 프로덕션·개발 환경 격리",
    },
  ],
} as const;

export const FAQ = {
  title: "자주 묻는 질문",
  items: [
    {
      q: "기존 LawTop GL 엑셀 데이터를 가져올 수 있나요?",
      a: "네. LawTop형 엑셀 형식으로 사건·기일·고객·회원 데이터를 import preview로 검증한 뒤 일괄 등록할 수 있습니다.",
    },
    {
      q: "소형 로펌도 사용할 수 있나요?",
      a: "Core 플랜은 1인 사무소부터 시작할 수 있도록 설계되었습니다.",
    },
    {
      q: "결재선은 몇 단계까지 지원하나요?",
      a: "REVIEWER 1~4단계의 다단계 결재선과 타임라인·첨부 다운로드를 지원합니다.",
    },
    {
      q: "법원 사건 정보는 어떻게 연동되나요?",
      a: "대법원 포털 연동으로 사건 정보가 자동 반영됩니다.",
    },
    {
      q: "Enterprise 도입은 어떻게 진행되나요?",
      a: "별도 영업팀과 상담 후 맞춤 도입 일정을 제안드립니다.",
    },
  ],
} as const;

export const CTA_BANNER = {
  archive: "Begin / Archive 02",
  headline: "송무 관리, LawyGo가 대신 챙깁니다",
  subheadline:
    "10초 만에 가입하고, 분산된 사건·기일·결재 업무에서 벗어나세요.",
  ctaPrimary: "지금 무료로 시작하기",
  ctaSecondary: "요금제 보기",
  image: "/media/sections/cta-banner.png",
} as const;

export const FOOTER = {
  address: "서울특별시 강남구 테헤란로 법조타운 8층",
  business: "사업자등록번호: 123-45-67890 | 대표: 홍길동",
  product: [
    { label: "기능 소개", href: "#features" },
    { label: "요금제", href: "#pricing" },
    { label: "보안 정책", href: "#security" },
  ],
  support: [
    { label: "고객센터", href: "#" },
    { label: "가이드북", href: "#" },
    { label: "릴리즈 노트", href: "#" },
  ],
  disclaimer:
    "LawyGo는 법률사무 처리나 법률 자문을 대행하지 않습니다. 구체적인 사안은 변호사 등 법률 전문가의 조언을 받으시기 바랍니다.",
} as const;
