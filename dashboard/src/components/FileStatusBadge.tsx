import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FileStatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  template: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700",
  draft: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  active: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  "needs-review": "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800",
};

export function FileStatusBadge({ status }: FileStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("text-[11px] capitalize", statusStyles[status] ?? "")}
    >
      {status.replace("-", " ")}
    </Badge>
  );
}
