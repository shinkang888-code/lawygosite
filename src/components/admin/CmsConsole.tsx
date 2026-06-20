"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  Eye,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  Save,
} from "lucide-react";
import { CMS_SECTIONS, type CmsSectionId, type SiteContent } from "@/lib/cms/types";
import { getDefaultContent } from "@/lib/cms/defaults";
import { FEATURE_TAB_IMAGE, FEATURE_TAB_IMAGE_HINT } from "@/lib/cms/imageSpecs";
import { MediaUploadField, TextField } from "@/components/admin/MediaUploadField";

type Toast = { type: "ok" | "err"; message: string } | null;

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export function CmsConsole({ username }: { username: string }) {
  const router = useRouter();
  const [active, setActive] = useState<CmsSectionId>("hero");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [dirty, setDirty] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content", { credentials: "include" });
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const json = await res.json();
      const c = json.content as SiteContent;
      setContent(c);
      setDraft(clone(c));
      setDirty(false);
    } catch {
      setToast({ type: "err", message: "콘텐츠를 불러오지 못했습니다." });
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const patch = useCallback((fn: (d: SiteContent) => void) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const next = clone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
  }, []);

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const defaults = getDefaultContent();
      const overrides = buildOverrides(defaults, draft);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ overrides }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "저장 실패");
      setContent(json.content as SiteContent);
      setDraft(clone(json.content as SiteContent));
      setDirty(false);
      setToast({ type: "ok", message: "저장되었습니다. 사이트에 즉시 반영됩니다." });
    } catch (e) {
      setToast({
        type: "err",
        message: e instanceof Error ? e.message : "저장 실패",
      });
    } finally {
      setSaving(false);
    }
  };

  const resetAll = async () => {
    if (!confirm("모든 CMS 변경사항을 기본값으로 되돌립니다. 계속할까요?")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "초기화 실패");
      setContent(json.content as SiteContent);
      setDraft(clone(json.content as SiteContent));
      setDirty(false);
      setToast({ type: "ok", message: "기본값으로 초기화되었습니다." });
    } catch (e) {
      setToast({
        type: "err",
        message: e instanceof Error ? e.message : "초기화 실패",
      });
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/admin/login");
  };

  const sectionTitle = useMemo(
    () => CMS_SECTIONS.find((s) => s.id === active)?.label ?? "",
    [active]
  );

  if (loading || !draft) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#f2f0eb" }}>
        <p style={{ color: "#6b6b6b" }}>콘솔 로딩 중…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#f7f5f2", color: "#1a1a1a" }}>
      <aside
        className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r"
        style={{
          background: "#1c1b19",
          color: "#fff",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="border-b px-5 py-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} style={{ color: "#c9a962" }} />
            <div>
              <p className="text-sm font-semibold">LawyGo CMS</p>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                {username}
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {CMS_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className="mb-1 w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
              style={{
                background:
                  active === s.id ? "rgba(201,169,98,0.18)" : "transparent",
                color: active === s.id ? "#fff" : "rgba(255,255,255,0.7)",
                fontWeight: active === s.id ? 600 : 400,
              }}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="space-y-2 border-t p-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-ghost w-full justify-center text-white"
          >
            <Eye size={14} /> 사이트 미리보기
          </a>
          <button type="button" onClick={() => void logout()} className="admin-btn-ghost w-full justify-center text-white">
            <LogOut size={14} /> 로그아웃
          </button>
        </div>
      </aside>

      <div className="ml-64 flex min-h-screen flex-1 flex-col">
        <header
          className="sticky top-0 z-30 flex items-center justify-between border-b px-8 py-4 backdrop-blur"
          style={{
            background: "rgba(247,245,242,0.95)",
            borderColor: "rgba(26,26,26,0.08)",
          }}
        >
          <div>
            <h1 className="font-serif text-xl font-semibold">{sectionTitle}</h1>
            <p className="text-xs" style={{ color: "#9a9a9a" }}>
              v{draft.meta.version} · {draft.meta.lastUpdated !== new Date(0).toISOString()
                ? new Date(draft.meta.lastUpdated).toLocaleString("ko-KR")
                : "기본값"}
              {dirty && " · 저장되지 않은 변경사항"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => void resetAll()} className="admin-btn-secondary" disabled={saving}>
              <RotateCcw size={14} /> 전체 초기화
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn-secondary">
              <ExternalLink size={14} /> 새 탭
            </a>
            <button
              type="button"
              onClick={() => void save()}
              className="admin-btn-primary"
              disabled={saving || !dirty}
            >
              <Save size={14} />
              {saving ? "저장 중…" : "저장"}
            </button>
          </div>
        </header>

        {toast && (
          <div
            className="mx-8 mt-4 rounded-lg px-4 py-3 text-sm"
            style={{
              background: toast.type === "ok" ? "rgba(139,50,44,0.1)" : "rgba(200,0,0,0.08)",
              color: toast.type === "ok" ? "#8b322c" : "#a00",
            }}
          >
            {toast.message}
          </div>
        )}

        <div className="flex-1 px-8 py-6">
          <div className="mx-auto max-w-3xl space-y-6 rounded-xl border bg-white p-6 shadow-sm" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
            <SectionEditor section={active} draft={draft} patch={patch} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionEditor({
  section,
  draft,
  patch,
}: {
  section: CmsSectionId;
  draft: SiteContent;
  patch: (fn: (d: SiteContent) => void) => void;
}) {
  switch (section) {
    case "brand":
      return (
        <>
          <TextField label="브랜드명" value={draft.brand.name} onChange={(v) => patch((d) => { d.brand.name = v; })} />
          <TextField label="태그라인" value={draft.brand.tagline} onChange={(v) => patch((d) => { d.brand.tagline = v; })} />
          <p className="text-sm font-medium pt-2">네비게이션 탭</p>
          {draft.navTabs.map((tab, i) => (
            <TextField
              key={tab.id}
              label={`탭: ${tab.id}`}
              value={tab.label}
              onChange={(v) => patch((d) => { d.navTabs[i].label = v; })}
            />
          ))}
        </>
      );
    case "hero":
      return (
        <>
          <TextField label="Eyebrow" value={draft.hero.eyebrow} onChange={(v) => patch((d) => { d.hero.eyebrow = v; })} />
          <TextField label="영문 헤드라인" value={draft.hero.headlineEn} onChange={(v) => patch((d) => { d.hero.headlineEn = v; })} />
          <TextField label="메인 헤드라인" value={draft.hero.headline} onChange={(v) => patch((d) => { d.hero.headline = v; })} multiline rows={3} />
          <TextField label="서브 헤드라인" value={draft.hero.subheadline} onChange={(v) => patch((d) => { d.hero.subheadline = v; })} multiline rows={4} />
          <TextField label="CTA 1" value={draft.hero.ctaPrimary} onChange={(v) => patch((d) => { d.hero.ctaPrimary = v; })} />
          <TextField label="CTA 2" value={draft.hero.ctaSecondary} onChange={(v) => patch((d) => { d.hero.ctaSecondary = v; })} />
          <TextField label="라이브 링크 텍스트" value={draft.hero.ctaLive} onChange={(v) => patch((d) => { d.hero.ctaLive = v; })} />
          <TextField label="라이브 URL" value={draft.hero.liveUrl} onChange={(v) => patch((d) => { d.hero.liveUrl = v; })} />
          <MediaUploadField label="히어로 배너 이미지" value={draft.hero.poster} onChange={(v) => patch((d) => { d.hero.poster = v; })} hint="홈 탭 배경 포스터" />
          <MediaUploadField label="데모 영상" value={draft.hero.video} onChange={(v) => patch((d) => { d.hero.video = v; })} kind="video" hint="영상 탭 메인 데모 (webm/mp4)" />
        </>
      );
    case "metrics":
      return (
        <>
          {draft.metrics.map((m, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <p className="text-xs font-medium" style={{ color: "#8b322c" }}>지표 {i + 1}</p>
              <TextField label="값" value={m.value} onChange={(v) => patch((d) => { d.metrics[i].value = v; })} />
              <TextField label="라벨" value={m.label} onChange={(v) => patch((d) => { d.metrics[i].label = v; })} />
              <TextField label="부제" value={m.sub} onChange={(v) => patch((d) => { d.metrics[i].sub = v; })} />
            </div>
          ))}
        </>
      );
    case "ecosystem":
      return (
        <>
          <TextField label="제목" value={draft.ecosystem.title} onChange={(v) => patch((d) => { d.ecosystem.title = v; })} multiline />
          <TextField label="부제" value={draft.ecosystem.subtitle} onChange={(v) => patch((d) => { d.ecosystem.subtitle = v; })} multiline rows={3} />
          {draft.ecosystem.layers.map((layer, i) => (
            <div key={layer.id} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <p className="text-sm font-medium">{layer.nameKr}</p>
              <TextField label="영문명" value={layer.name} onChange={(v) => patch((d) => { d.ecosystem.layers[i].name = v; })} />
              <TextField label="한글명" value={layer.nameKr} onChange={(v) => patch((d) => { d.ecosystem.layers[i].nameKr = v; })} />
              <TextField label="설명" value={layer.desc} onChange={(v) => patch((d) => { d.ecosystem.layers[i].desc = v; })} multiline rows={3} />
              <TextField label="태그 (쉼표 구분)" value={layer.tags.join(", ")} onChange={(v) => patch((d) => { d.ecosystem.layers[i].tags = v.split(",").map((t) => t.trim()).filter(Boolean); })} />
            </div>
          ))}
        </>
      );
    case "video":
      return (
        <>
          <MediaUploadField label="메인 데모 영상" value={draft.hero.video} onChange={(v) => patch((d) => { d.hero.video = v; })} kind="video" />
          <p className="text-sm font-medium pt-4">영상 챕터</p>
          {draft.videoChapters.map((ch, i) => (
            <div key={ch.id} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <TextField label="챕터명" value={ch.label} onChange={(v) => patch((d) => { d.videoChapters[i].label = v; })} />
              <TextField label="타임스탬프" value={ch.time} onChange={(v) => patch((d) => { d.videoChapters[i].time = v; })} />
              <MediaUploadField label="챕터 스크린샷" value={ch.image} onChange={(v) => patch((d) => { d.videoChapters[i].image = v; })} />
            </div>
          ))}
        </>
      );
    case "differentiators":
      return draft.differentiators.map((item, i) => (
        <div key={item.id} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
          <TextField label="제목" value={item.title} onChange={(v) => patch((d) => { d.differentiators[i].title = v; })} />
          <TextField label="스탯" value={item.stat} onChange={(v) => patch((d) => { d.differentiators[i].stat = v; })} />
          <TextField label="설명" value={item.desc} onChange={(v) => patch((d) => { d.differentiators[i].desc = v; })} multiline rows={3} />
          <MediaUploadField label="배너 이미지" value={item.image} onChange={(v) => patch((d) => { d.differentiators[i].image = v; })} />
        </div>
      ));
    case "ai":
      return draft.aiFeatures.map((item, i) => (
        <div key={item.id} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
          <TextField label="기능명" value={item.title} onChange={(v) => patch((d) => { d.aiFeatures[i].title = v; })} />
          <TextField label="설명" value={item.desc} onChange={(v) => patch((d) => { d.aiFeatures[i].desc = v; })} multiline />
        </div>
      ));
    case "features":
      return (
        <>
          <div
            className="space-y-2 rounded-lg border p-4 text-sm leading-relaxed"
            style={{ borderColor: "rgba(139,50,44,0.2)", background: "rgba(139,50,44,0.05)" }}
          >
            <p className="font-medium" style={{ color: "#8b322c" }}>
              플랫폼 탭 · CORE FEATURES 이미지
            </p>
            <p style={{ color: "#4a4a4a" }}>
              「01. Case Management」「02. Deadline Tracking」탭을 눌렀을 때 오른쪽에 보이는
              사진 2장입니다. 두 이미지는{" "}
              <strong>
                {FEATURE_TAB_IMAGE.width} × {FEATURE_TAB_IMAGE.height}px ({FEATURE_TAB_IMAGE.ratio})
              </strong>
              로 동일한 비율로 업로드해야 탭 전환 시 크기가 맞습니다.
            </p>
            <p className="text-xs" style={{ color: "#6b6b6b" }}>
              {FEATURE_TAB_IMAGE_HINT}
            </p>
          </div>
          {draft.features.map((f, i) => (
            <div key={f.id} className="space-y-3 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <p className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>
                {f.archive}
              </p>
              <MediaUploadField
                label={`${f.archive} 탭 이미지`}
                value={f.image}
                onChange={(v) => patch((d) => { d.features[i].image = v; })}
                hint={FEATURE_TAB_IMAGE_HINT}
                previewAspect="16/10"
              />
              <TextField label="제목" value={f.title} onChange={(v) => patch((d) => { d.features[i].title = v; })} multiline rows={2} />
              <TextField label="설명" value={f.description} onChange={(v) => patch((d) => { d.features[i].description = v; })} multiline rows={4} />
              <TextField label="포인트 (줄바꿈 구분)" value={f.points.join("\n")} onChange={(v) => patch((d) => { d.features[i].points = v.split("\n").filter(Boolean); })} multiline rows={4} />
              <TextField label="아카이브 라벨" value={f.archive} onChange={(v) => patch((d) => { d.features[i].archive = v; })} />
            </div>
          ))}
        </>
      );
    case "modules":
      return (
        <>
          <TextField label="아카이브" value={draft.modules.archive} onChange={(v) => patch((d) => { d.modules.archive = v; })} />
          <TextField label="제목" value={draft.modules.title} onChange={(v) => patch((d) => { d.modules.title = v; })} multiline rows={2} />
          {draft.modules.items.map((m, i) => (
            <div key={m.id} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <TextField label="모듈명" value={m.title} onChange={(v) => patch((d) => { d.modules.items[i].title = v; })} />
              <TextField label="설명" value={m.desc} onChange={(v) => patch((d) => { d.modules.items[i].desc = v; })} />
            </div>
          ))}
        </>
      );
    case "architecture":
      return (
        <>
          <TextField label="제목" value={draft.architecture.title} onChange={(v) => patch((d) => { d.architecture.title = v; })} />
          {draft.architecture.tiers.map((tier, i) => (
            <div key={tier.name} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <TextField label="티어명" value={tier.name} onChange={(v) => patch((d) => { d.architecture.tiers[i].name = v; })} />
              <TextField label="프로바이더" value={tier.provider} onChange={(v) => patch((d) => { d.architecture.tiers[i].provider = v; })} />
              <TextField label="항목 (줄바꿈)" value={tier.items.join("\n")} onChange={(v) => patch((d) => { d.architecture.tiers[i].items = v.split("\n").filter(Boolean); })} multiline rows={4} />
            </div>
          ))}
          <p className="text-sm font-medium pt-4">비교표</p>
          <TextField label="비교표 제목" value={draft.comparison.title} onChange={(v) => patch((d) => { d.comparison.title = v; })} />
          {draft.comparison.rows.map((row, i) => (
            <div key={i} className="grid gap-2 rounded-lg border p-4 md:grid-cols-2" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <TextField label="기능" value={row.feature} onChange={(v) => patch((d) => { d.comparison.rows[i].feature = v; })} />
              <TextField label="LawyGo (true/false/부분)" value={String(row.lawygo)} onChange={(v) => patch((d) => { d.comparison.rows[i].lawygo = parseCell(v); })} />
              <TextField label="Harvey" value={String(row.harvey)} onChange={(v) => patch((d) => { d.comparison.rows[i].harvey = parseCell(v); })} />
              <TextField label="Clio" value={String(row.clio)} onChange={(v) => patch((d) => { d.comparison.rows[i].clio = parseCell(v); })} />
            </div>
          ))}
        </>
      );
    case "pricing":
      return (
        <>
          <TextField label="라벨" value={draft.pricing.label} onChange={(v) => patch((d) => { d.pricing.label = v; })} />
          <TextField label="제목" value={draft.pricing.title} onChange={(v) => patch((d) => { d.pricing.title = v; })} multiline rows={2} />
          {draft.pricing.plans.map((plan, i) => (
            <div key={plan.id} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <TextField label="플랜명" value={plan.name} onChange={(v) => patch((d) => { d.pricing.plans[i].name = v; })} />
              <TextField label="설명" value={plan.description} onChange={(v) => patch((d) => { d.pricing.plans[i].description = v; })} multiline />
              <TextField label="가격" value={plan.price} onChange={(v) => patch((d) => { d.pricing.plans[i].price = v; })} />
              <TextField label="기간" value={plan.period} onChange={(v) => patch((d) => { d.pricing.plans[i].period = v; })} />
              <TextField label="기능 (줄바꿈)" value={plan.features.join("\n")} onChange={(v) => patch((d) => { d.pricing.plans[i].features = v.split("\n").filter(Boolean); })} multiline rows={5} />
              <TextField label="CTA" value={plan.cta} onChange={(v) => patch((d) => { d.pricing.plans[i].cta = v; })} />
              <TextField label="뱃지" value={plan.badge ?? ""} onChange={(v) => patch((d) => { d.pricing.plans[i].badge = v || null; })} />
            </div>
          ))}
        </>
      );
    case "security":
      return (
        <>
          <TextField label="라벨" value={draft.security.label} onChange={(v) => patch((d) => { d.security.label = v; })} />
          <TextField label="제목" value={draft.security.title} onChange={(v) => patch((d) => { d.security.title = v; })} />
          <TextField label="설명" value={draft.security.description} onChange={(v) => patch((d) => { d.security.description = v; })} multiline rows={3} />
          {draft.security.items.map((item, i) => (
            <div key={item.no} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <TextField label="번호" value={item.no} onChange={(v) => patch((d) => { d.security.items[i].no = v; })} />
              <TextField label="제목" value={item.title} onChange={(v) => patch((d) => { d.security.items[i].title = v; })} />
              <TextField label="설명" value={item.desc} onChange={(v) => patch((d) => { d.security.items[i].desc = v; })} multiline />
            </div>
          ))}
        </>
      );
    case "testimonials":
      return (
        <>
          <p className="text-sm font-medium">대표 후기</p>
          <TextField label="인용" value={draft.testimonials.featured.quote} onChange={(v) => patch((d) => { d.testimonials.featured.quote = v; })} multiline rows={4} />
          <TextField label="이름" value={draft.testimonials.featured.name} onChange={(v) => patch((d) => { d.testimonials.featured.name = v; })} />
          <TextField label="직함" value={draft.testimonials.featured.role} onChange={(v) => patch((d) => { d.testimonials.featured.role = v; })} />
          {draft.testimonials.secondary.map((t, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <TextField label="인용" value={t.quote} onChange={(v) => patch((d) => { d.testimonials.secondary[i].quote = v; })} multiline rows={3} />
              <TextField label="이름" value={t.name} onChange={(v) => patch((d) => { d.testimonials.secondary[i].name = v; })} />
              <TextField label="직함" value={t.role} onChange={(v) => patch((d) => { d.testimonials.secondary[i].role = v; })} />
            </div>
          ))}
        </>
      );
    case "faq":
      return (
        <>
          <TextField label="제목" value={draft.faq.title} onChange={(v) => patch((d) => { d.faq.title = v; })} />
          {draft.faq.items.map((item, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <TextField label="질문" value={item.q} onChange={(v) => patch((d) => { d.faq.items[i].q = v; })} multiline />
              <TextField label="답변" value={item.a} onChange={(v) => patch((d) => { d.faq.items[i].a = v; })} multiline rows={4} />
            </div>
          ))}
        </>
      );
    case "cta":
      return (
        <>
          <TextField label="아카이브" value={draft.cta.archive} onChange={(v) => patch((d) => { d.cta.archive = v; })} />
          <TextField label="헤드라인" value={draft.cta.headline} onChange={(v) => patch((d) => { d.cta.headline = v; })} />
          <TextField label="서브헤드라인" value={draft.cta.subheadline} onChange={(v) => patch((d) => { d.cta.subheadline = v; })} multiline rows={3} />
          <TextField label="CTA 1" value={draft.cta.ctaPrimary} onChange={(v) => patch((d) => { d.cta.ctaPrimary = v; })} />
          <TextField label="CTA 2" value={draft.cta.ctaSecondary} onChange={(v) => patch((d) => { d.cta.ctaSecondary = v; })} />
          <MediaUploadField label="CTA 배너 이미지" value={draft.cta.image} onChange={(v) => patch((d) => { d.cta.image = v; })} />
        </>
      );
    case "footer":
      return (
        <>
          <TextField label="주소" value={draft.footer.address} onChange={(v) => patch((d) => { d.footer.address = v; })} />
          <TextField label="사업자 정보" value={draft.footer.business} onChange={(v) => patch((d) => { d.footer.business = v; })} />
          <TextField label="면책 문구" value={draft.footer.disclaimer} onChange={(v) => patch((d) => { d.footer.disclaimer = v; })} multiline rows={4} />
        </>
      );
    default:
      return null;
  }
}

function parseCell(v: string): boolean | string {
  if (v === "true") return true;
  if (v === "false") return false;
  return v;
}

function buildOverrides(defaults: SiteContent, draft: SiteContent) {
  return JSON.parse(JSON.stringify(draft)) as SiteContent;
}
