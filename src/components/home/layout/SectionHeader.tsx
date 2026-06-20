export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  dark = false,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const muted = dark ? "rgba(255,255,255,0.55)" : "#6b6b6b";
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div
      className={`mb-6 md:mb-8 md:flex md:items-end md:justify-between md:gap-8 ${alignClass} ${
        align === "center" ? "max-w-3xl" : "max-w-4xl"
      }`}
    >
      <div className={align === "center" ? "w-full" : "min-w-0 flex-1"}>
        {label && <p className="legal-label mb-2">{label}</p>}
        <h2
          className={`font-serif text-2xl font-semibold tracking-tight whitespace-pre-line md:text-3xl lg:text-4xl ${
            align === "center" ? "" : "md:max-w-xl"
          }`}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed md:mt-0 md:max-w-sm md:shrink-0 md:text-right ${
            align === "center" ? "md:text-center md:mx-auto" : ""
          }`}
          style={{ color: muted }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
