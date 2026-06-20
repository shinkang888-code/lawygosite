import type { ContentOverrides, SiteContent } from "@/lib/cms/types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T>(base: T, patch: Partial<T> | ContentOverrides): T {
  if (!patch || typeof patch !== "object") return base;
  const result = { ...base } as Record<string, unknown>;
  const source = patch as Record<string, unknown>;

  for (const key of Object.keys(source)) {
    const next = source[key];
    if (next === undefined) continue;
    const current = result[key];

    if (Array.isArray(next)) {
      result[key] = next.map((item) =>
        isPlainObject(item) ? { ...item } : item
      );
      continue;
    }

    if (isPlainObject(next) && isPlainObject(current)) {
      result[key] = deepMerge(current, next);
      continue;
    }

    result[key] = next;
  }

  return result as T;
}

export function mergeContent(
  defaults: SiteContent,
  overrides: ContentOverrides
): SiteContent {
  return deepMerge(defaults, overrides);
}
