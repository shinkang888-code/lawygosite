export const NAV_TABS = [
  { id: "home", label: "홈" },
  { id: "platform", label: "플랫폼" },
  { id: "video", label: "영상" },
  { id: "ai", label: "AI" },
  { id: "architecture", label: "아키텍처" },
  { id: "pricing", label: "요금제" },
] as const;

export type TabId = (typeof NAV_TABS)[number]["id"];

export function isTabId(value: string): value is TabId {
  return NAV_TABS.some((tab) => tab.id === value);
}
