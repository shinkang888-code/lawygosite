"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content/ContentContext";

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p
        className="mb-2 text-[0.65rem] tracking-widest uppercase md:mb-4 md:text-xs"
        style={{ color: "#9a9a9a" }}
      >
        {title}
      </p>
      <ul className="space-y-1 md:space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a
              href={link.href}
              className="text-xs transition-colors hover:opacity-70 md:text-sm"
              style={{ color: "#6b6b6b" }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomeFooter() {
  const { brand, footer } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 md:py-16"
      style={{
        backgroundColor: "#f2f0eb",
        color: "#1a1a1a",
        borderTop: "1px solid rgba(26,26,26,0.08)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-start gap-5 sm:gap-6 md:grid md:grid-cols-4 md:gap-12">
          <div className="min-w-0 flex-1 md:col-span-2">
            <div className="mb-2 flex items-center gap-2 md:mb-4 md:gap-3">
              <Image
                src="/brand/lawygo-icon.png"
                alt="LawyGo"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span
                className="font-serif text-sm font-bold tracking-[0.12em] md:text-base"
                style={{ color: "#1a1a1a" }}
              >
                {brand.name}
              </span>
            </div>
            <p
              className="text-xs leading-snug md:mb-1 md:text-sm"
              style={{ color: "#6b6b6b" }}
            >
              {footer.address}
            </p>
            <p className="mt-2 text-xs md:mt-0 md:mb-4" style={{ color: "#9a9a9a" }}>
              © {year} LawyGo
            </p>
            <p
              className="mb-1 mt-4 hidden text-sm md:block"
              style={{ color: "#6b6b6b" }}
            >
              {footer.business}
            </p>
            <p
              className="mt-4 hidden text-xs leading-relaxed md:block"
              style={{ color: "#9a9a9a" }}
            >
              {footer.disclaimer}
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4 md:contents">
            <FooterLinkList title="Product" links={footer.product} />
            <FooterLinkList title="Support" links={footer.support} />
          </div>
        </div>

        <p
          className="mt-6 text-xs leading-relaxed md:hidden"
          style={{ color: "#9a9a9a" }}
        >
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
