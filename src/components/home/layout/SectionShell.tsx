import type { ReactNode } from "react";

type SectionVariant = "paper" | "light" | "dark";

const VARIANTS: Record<SectionVariant, { bg: string; fg: string }> = {
  paper: { bg: "#f2f0eb", fg: "#1a1a1a" },
  light: { bg: "#f7f5f2", fg: "#1a1a1a" },
  dark: { bg: "#1c1b19", fg: "#ffffff" },
};

export function SectionShell({
  id,
  children,
  variant = "paper",
  className = "",
  noPadding = false,
}: {
  id?: string;
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  noPadding?: boolean;
}) {
  const { bg, fg } = VARIANTS[variant];

  return (
    <section
      id={id}
      className={`${noPadding ? "" : "py-10 md:py-12"} ${className}`}
      style={{ backgroundColor: bg, color: fg }}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">{children}</div>
    </section>
  );
}
