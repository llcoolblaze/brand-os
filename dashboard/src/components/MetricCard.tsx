import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  to?: string;
  color?: "green" | "amber" | "red" | "blue" | "default";
}

const colorMap: Record<string, string> = {
  green: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  red: "text-red-600 dark:text-red-400",
  blue: "text-blue-600 dark:text-blue-400",
  default: "text-foreground",
};

export function MetricCard({
  icon,
  label,
  value,
  subtitle,
  to,
  color = "default",
}: MetricCardProps) {
  const content = (
    <Card
      className={cn(
        "gap-3 py-4 px-5 transition-shadow",
        to && "hover:shadow-md cursor-pointer"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("shrink-0", colorMap[color])}>{icon}</div>
        <div className="min-w-0 flex-1">
          <div className={cn("text-2xl font-bold tabular-nums", colorMap[color])}>
            {value}
          </div>
          <div className="text-sm text-muted-foreground truncate">{label}</div>
          {subtitle && (
            <div className="mt-0.5 text-xs text-muted-foreground/70">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
}
