"use client";

import { useSiteContent } from "@/components/content/ContentContext";
import { SectionHeader } from "@/components/home/layout/SectionHeader";
import { SectionShell } from "@/components/home/layout/SectionShell";
import { SecuritySection } from "@/components/home/SecuritySection";

function formatComparisonCell(value: boolean | string) {
  if (value === true) return "✓";
  if (value === false) return "—";
  return value;
}

export function ArchitectureSection() {
  const { architecture, comparison } = useSiteContent();

  return (
    <SectionShell id="architecture" variant="light" noPadding className="pt-10 pb-6 md:pt-12 md:pb-8">
      <SectionHeader
        label="Infrastructure"
        title={architecture.title}
        align="center"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {architecture.tiers.map((tier, i) => (
            <div
              key={tier.name}
              className="rounded-xl p-4"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,26,26,0.1)",
              }}
            >
              <p className="mb-0.5 text-[9px] tracking-widest uppercase" style={{ color: "#8b322c" }}>
                Tier {i + 1}
              </p>
              <h3 className="font-serif text-base font-semibold">{tier.name}</h3>
              <p className="mb-3 text-xs" style={{ color: "#6b6b6b" }}>
                {tier.provider}
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {tier.items.map((item) => (
                  <li key={item} className="text-xs" style={{ color: "#6b6b6b" }}>
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
          <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(26,26,26,0.08)" }}>
            <h3 className="font-serif text-base font-semibold">{comparison.title}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-xs md:text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(26,26,26,0.08)" }}>
                  <th className="p-3 text-left font-medium" style={{ color: "#6b6b6b" }}>
                    기능
                  </th>
                  <th className="p-3 text-center font-medium" style={{ color: "#8b322c" }}>
                    LawyGo
                  </th>
                  <th className="p-3 text-center font-medium" style={{ color: "#6b6b6b" }}>
                    Harvey
                  </th>
                  <th className="p-3 text-center font-medium" style={{ color: "#6b6b6b" }}>
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
                    <td className="p-3">{row.feature}</td>
                    <td className="p-3 text-center font-medium">{formatComparisonCell(row.lawygo)}</td>
                    <td className="p-3 text-center" style={{ color: "#9a9a9a" }}>
                      {formatComparisonCell(row.harvey)}
                    </td>
                    <td className="p-3 text-center" style={{ color: "#9a9a9a" }}>
                      {formatComparisonCell(row.clio)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SecuritySection embedded />
      </div>
    </SectionShell>
  );
}
