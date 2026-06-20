"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useSiteContent } from "@/components/content/ContentContext";
import { SectionShell } from "@/components/home/layout/SectionShell";

export function FaqSection() {
  const { faq } = useSiteContent();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionShell variant="paper" noPadding className="py-8 md:py-10">
      <h2 className="font-serif mb-5 text-xl font-semibold md:mb-6 md:text-2xl">{faq.title}</h2>

      <div className="grid gap-2 md:grid-cols-2 md:gap-3">
        {faq.items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-lg"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,26,26,0.08)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="pr-3 text-xs font-medium md:text-sm">{item.q}</span>
                <Plus
                  size={16}
                  style={{
                    color: "#8b322c",
                    transform: open ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                />
              </button>
              {open && (
                <div className="px-4 pb-3.5 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
