import { NAV_TABS } from "@/lib/navTabs";
import {
  CTA_BANNER,
  FAQ,
  FEATURES,
  FOOTER,
  MODULES,
  PRICING,
  SECURITY,
  SITE_BRAND,
  TESTIMONIALS,
} from "@/lib/siteContent";
import {
  AI_FEATURES_DETAIL,
  ARCHITECTURE,
  COMPARISON,
  DIFFERENTIATORS,
  ECOSYSTEM,
  PLATFORM,
  VIDEO_CHAPTERS,
} from "@/lib/platformContent";
import type { SiteContent } from "@/lib/cms/types";

export function getDefaultContent(): SiteContent {
  return {
    brand: { ...SITE_BRAND },
    navTabs: NAV_TABS.map((t) => ({ id: t.id, label: t.label })),
    hero: { ...PLATFORM.hero },
    metrics: PLATFORM.metrics.map((m) => ({ ...m })),
    ecosystem: {
      title: ECOSYSTEM.title,
      subtitle: ECOSYSTEM.subtitle,
      layers: ECOSYSTEM.layers.map((l) => ({
        ...l,
        tags: [...l.tags],
      })),
    },
    videoChapters: VIDEO_CHAPTERS.map((c) => ({ ...c })),
    differentiators: DIFFERENTIATORS.map((d) => ({ ...d })),
    aiFeatures: AI_FEATURES_DETAIL.map((a) => ({ ...a })),
    architecture: {
      title: ARCHITECTURE.title,
      tiers: ARCHITECTURE.tiers.map((t) => ({
        ...t,
        items: [...t.items],
      })),
    },
    comparison: {
      title: COMPARISON.title,
      rows: COMPARISON.rows.map((r) => ({ ...r })),
    },
    features: FEATURES.map((f) => ({
      id: f.id,
      archive: f.archive,
      title: f.title,
      description: f.description,
      points: [...f.points],
      image: f.image,
      reverse: f.reverse,
    })),
    modules: {
      archive: MODULES.archive,
      title: MODULES.title,
      items: MODULES.items.map((m) => ({ ...m })),
    },
    testimonials: {
      featured: { ...TESTIMONIALS.featured },
      secondary: TESTIMONIALS.secondary.map((t) => ({ ...t })),
    },
    pricing: {
      label: PRICING.label,
      title: PRICING.title,
      plans: PRICING.plans.map((p) => ({
        ...p,
        features: [...p.features],
        badge: p.badge,
      })),
    },
    security: {
      label: SECURITY.label,
      title: SECURITY.title,
      description: SECURITY.description,
      items: SECURITY.items.map((i) => ({ ...i })),
    },
    faq: {
      title: FAQ.title,
      items: FAQ.items.map((i) => ({ ...i })),
    },
    cta: { ...CTA_BANNER },
    footer: {
      address: FOOTER.address,
      business: FOOTER.business,
      product: FOOTER.product.map((p) => ({ ...p })),
      support: FOOTER.support.map((s) => ({ ...s })),
      disclaimer: FOOTER.disclaimer,
    },
    meta: {
      lastUpdated: new Date(0).toISOString(),
      updatedBy: "system",
      version: 0,
    },
  };
}
