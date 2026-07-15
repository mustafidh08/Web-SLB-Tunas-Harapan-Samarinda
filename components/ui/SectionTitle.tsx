// components/ui/SectionTitle.tsx

interface SectionTitleProps {
  label?: string;       // label kecil di atas (opsional)
  title: string;        // judul utama
  subtitle?: string;    // deskripsi/subtitle (opsional)
  align?: "left" | "center";
  light?: boolean;      // teks putih untuk background gelap
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const textColor = light ? "text-white" : "text-[var(--color-text-dark)]";
  const subtitleColor = light ? "text-white/80" : "text-[var(--color-text-mid)]";

  return (
    <div className={`flex flex-col ${alignClass} mb-10`}>
      {label && (
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
          style={{
            background: light ? "rgba(255,255,255,0.15)" : "var(--color-primary-tint)",
            color: light ? "#ffffff" : "var(--color-primary)",
          }}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold ${textColor}`}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      <span className="section-title-line" style={{ background: "var(--color-accent)" }} />
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg max-w-2xl leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
