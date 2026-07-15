// components/ui/Badge.tsx

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "red" | "yellow" | "gray";
}

export default function Badge({ children, variant = "green" }: BadgeProps) {
  const variantClass = {
    green: "badge-green",
    red: "badge-red",
    yellow: "badge-yellow",
    gray: "bg-[#F1F5F9] text-[#475569]",
  }[variant];

  return <span className={`badge ${variantClass}`}>{children}</span>;
}
