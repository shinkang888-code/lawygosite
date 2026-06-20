"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";

export function HomeFooter() {
  const { brand, footer } = useSiteContent();

  return (
    <footer
      className="py-16"
      style={{
        backgroundColor: "#f2f0eb",
        color: "#1a1a1a",
        borderTop: "1px solid rgba(26,26,26,0.08)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/brand/lawygo-icon.png"
                alt="LawyGo"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span
                className="font-serif text-base font-bold tracking-[0.12em]"
                style={{ color: "#1a1a1a" }}
              >
                {brand.name}
              </span>
            </div>
            <p className="mb-1 text-sm" style={{ color: "#6b6b6b" }}>
              {footer.address}
            </p>
            <p className="mb-4 text-sm" style={{ color: "#6b6b6b" }}>
              {footer.business}
            </p>
            <p className="text-xs" style={{ color: "#9a9a9a" }}>
              © {new Date().getFullYear()} LawyGo. All rights reserved.
            </p>
            <p className="mt-4 text-xs leading-relaxed" style={{ color: "#9a9a9a" }}>
              {footer.disclaimer}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-widest uppercase" style={{ color: "#9a9a9a" }}>
              Product
            </p>
            <ul className="space-y-2">
              {footer.product.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: "#6b6b6b" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-widest uppercase" style={{ color: "#9a9a9a" }}>
              Support
            </p>
            <ul className="space-y-2">
              {footer.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: "#6b6b6b" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
