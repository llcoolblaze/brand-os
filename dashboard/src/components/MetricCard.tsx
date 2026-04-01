import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  to?: string;
  color?: "green" | "amber" | "red" | "blue" | "default";
}

export function MetricCard({
  icon,
  label,
  value,
  subtitle,
  to,
}: MetricCardProps) {
  const content = (
    <div
      className={cn(
        "border border-foreground p-5 flex flex-col gap-3 transition-colors group",
        to && "hover:bg-foreground hover:text-background cursor-pointer"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground group-hover:text-background/60">
          {label}
        </span>
        <div className="text-muted-foreground group-hover:text-background/60">
          {icon}
        </div>
      </div>
      <div>
        <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontVariantNumeric: "tabular-nums" }}>
          {value}
        </span>
      </div>
      {subtitle && (
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-background/50">
          {subtitle}
        </span>
      )}
    </div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  return content;
}
