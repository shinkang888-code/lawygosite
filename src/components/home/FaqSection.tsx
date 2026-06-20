"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useSiteContent } from "@/components/content/ContentContext";

export function FaqSection() {
  const { faq } = useSiteContent();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "#f2f0eb", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2
          className="font-serif mb-12 text-center text-3xl font-semibold md:text-4xl"
          style={{ color: "#1a1a1a" }}
        >
          {faq.title}
        </h2>

        <div className="space-y-3">
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
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  style={{ color: "#1a1a1a" }}
                >
                  <span className="pr-4 text-sm font-medium">{item.q}</span>
                  <Plus
                    size={18}
                    style={{
                      color: "#8b322c",
                      transform: open ? "rotate(45deg)" : "none",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {open && (
                  <div
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: "#6b6b6b" }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
