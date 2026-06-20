"use client";

import { useSiteContent } from "@/components/content/ContentContext";

function formatComparisonCell(value: boolean | string) {
  if (value === true) return "✓";
  if (value === false) return "—";
  return value;
}

export function ArchitectureSection() {
  const { architecture, comparison } = useSiteContent();

  return (
    <section
      id="architecture"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#f7f5f2", color: "#1a1a1a" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="legal-label mb-4 text-center">Infrastructure</p>
        <h2 className="font-serif mb-16 text-center text-3xl font-semibold md:text-4xl">
          {architecture.title}
        </h2>

        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {architecture.tiers.map((tier, i) => (
            <div
              key={tier.name}
              className="rounded-xl p-8"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,26,26,0.1)",
                color: "#1a1a1a",
              }}
            >
              <p
                className="mb-1 text-[10px] tracking-widest uppercase"
                style={{ color: "#8b322c" }}
              >
                Tier {i + 1}
              </p>
              <h3 className="font-serif mb-1 text-xl font-semibold">{tier.name}</h3>
              <p className="mb-6 text-sm" style={{ color: "#6b6b6b" }}>
                {tier.provider}
              </p>
              <ul className="space-y-2">
                {tier.items.map((item) => (
                  <li key={item} className="text-sm" style={{ color: "#6b6b6b" }}>
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="overflow-hidden rounded-xl"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(26,26,26,0.1)",
          }}
        >
          <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(26,26,26,0.08)" }}>
            <h3 className="font-serif text-lg font-semibold">{comparison.title}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(26,26,26,0.08)" }}>
                  <th className="p-4 text-left font-medium" style={{ color: "#6b6b6b" }}>
                    기능
                  </th>
                  <th className="p-4 text-center font-medium" style={{ color: "#8b322c" }}>
                    LawyGo
                  </th>
                  <th className="p-4 text-center font-medium" style={{ color: "#6b6b6b" }}>
                    Harvey
                  </th>
                  <th className="p-4 text-center font-medium" style={{ color: "#6b6b6b" }}>
                    Clio
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr
                    key={row.feature}
                    style={{ borderBottom: "1px solid rgba(26,26,26,0.06)" }}
                  >
                    <td className="p-4" style={{ color: "#1a1a1a" }}>
                      {row.feature}
                    </td>
                    <td className="p-4 text-center font-medium" style={{ color: "#1a1a1a" }}>
                      {formatComparisonCell(row.lawygo)}
                    </td>
                    <td className="p-4 text-center" style={{ color: "#9a9a9a" }}>
                      {formatComparisonCell(row.harvey)}
                    </td>
                    <td className="p-4 text-center" style={{ color: "#9a9a9a" }}>
                      {formatComparisonCell(row.clio)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
