export type NavTab = { id: string; label: string };

export type MetricItem = { value: string; label: string; sub: string };

export type EcosystemLayer = {
  id: string;
  name: string;
  nameKr: string;
  desc: string;
  tags: string[];
};

export type VideoChapter = {
  id: string;
  label: string;
  time: string;
  image: string;
};

export type Differentiator = {
  id: string;
  title: string;
  stat: string;
  desc: string;
  image: string;
};

export type FeatureItem = {
  id: string;
  archive: string;
  title: string;
  description: string;
  points: string[];
  image: string;
  reverse: boolean;
};

export type ModuleItem = { id: string; title: string; desc: string };

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlight: boolean;
  badge: string | null;
};

export type ComparisonRow = {
  feature: string;
  lawygo: boolean | string;
  harvey: boolean | string;
  clio: boolean | string;
};

export type SiteContent = {
  brand: { name: string; tagline: string };
  navTabs: NavTab[];
  hero: {
    eyebrow: string;
    headline: string;
    headlineEn: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaLive: string;
    liveUrl: string;
    poster: string;
    video: string;
  };
  metrics: MetricItem[];
  ecosystem: {
    title: string;
    subtitle: string;
    layers: EcosystemLayer[];
  };
  videoChapters: VideoChapter[];
  differentiators: Differentiator[];
  aiFeatures: { id: string; title: string; desc: string }[];
  architecture: {
    title: string;
    tiers: { name: string; provider: string; items: string[] }[];
  };
  comparison: { title: string; rows: ComparisonRow[] };
  features: FeatureItem[];
  modules: { archive: string; title: string; items: ModuleItem[] };
  testimonials: {
    featured: { quote: string; name: string; role: string };
    secondary: { quote: string; name: string; role: string }[];
  };
  pricing: { label: string; title: string; plans: PricingPlan[] };
  security: {
    label: string;
    title: string;
    description: string;
    items: { no: string; title: string; desc: string }[];
  };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: {
    archive: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };
  footer: {
    address: string;
    business: string;
    product: { label: string; href: string }[];
    support: { label: string; href: string }[];
    disclaimer: string;
  };
  meta: { lastUpdated: string; updatedBy: string; version: number };
};

export type ContentOverrides = Partial<SiteContent>;

export type AdminAccount = {
  username: string;
  salt: string;
  hash: string;
  createdAt: string;
};

export type CmsMeta = {
  lastUpdated: string;
  updatedBy: string;
  version: number;
};

export const CMS_SECTIONS = [
  { id: "brand", label: "브랜드·네비", icon: "brand" },
  { id: "hero", label: "홈 히어로", icon: "hero" },
  { id: "metrics", label: "핵심 지표", icon: "metrics" },
  { id: "ecosystem", label: "플랫폼 생태계", icon: "ecosystem" },
  { id: "video", label: "영상·챕터", icon: "video" },
  { id: "differentiators", label: "차별점", icon: "diff" },
  { id: "ai", label: "AI 허브", icon: "ai" },
  { id: "features", label: "기능 소개", icon: "features" },
  { id: "modules", label: "모듈", icon: "modules" },
  { id: "architecture", label: "아키텍처", icon: "arch" },
  { id: "pricing", label: "요금제", icon: "pricing" },
  { id: "security", label: "보안", icon: "security" },
  { id: "testimonials", label: "고객 후기", icon: "testimonials" },
  { id: "faq", label: "FAQ", icon: "faq" },
  { id: "cta", label: "CTA 배너", icon: "cta" },
  { id: "footer", label: "푸터", icon: "footer" },
] as const;

export type CmsSectionId = (typeof CMS_SECTIONS)[number]["id"];
