import { Lock, Circle, Loader, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Phase {
  name: string;
  status: "pending" | "locked" | "in-progress" | "complete" | "skippable";
  files: Record<string, string>;
}

interface SetupPhaseBarProps {
  phases: Phase[];
}

const statusConfig: Record<
  Phase["status"],
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }
> = {
  locked: {
    icon: Lock,
    color: "text-gray-400 dark:text-gray-500",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  pending: {
    icon: Circle,
    color: "text-gray-400 dark:text-gray-500",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  "in-progress": {
    icon: Loader,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  complete: {
    icon: CheckCircle,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
  skippable: {
    icon: Circle,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
};

export function SetupPhaseBar({ phases }: SetupPhaseBarProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1">
      {phases.map((phase, i) => {
        const config = statusConfig[phase.status];
        const Icon = config.icon;
        const fileCount = Object.keys(phase.files).length;
        return (
          <div
            key={i}
            className={cn(
              "flex flex-1 min-w-[120px] items-center gap-2 rounded-lg px-3 py-2.5 text-xs",
              config.bg
            )}
          >
            <Icon
              className={cn(
                "size-4 shrink-0",
                config.color,
                phase.status === "in-progress" && "animate-spin"
              )}
            />
            <div className="min-w-0 flex-1">
              <div className={cn("font-medium truncate", config.color)}>
                {phase.name}
              </div>
              <div className="text-muted-foreground">
                {fileCount} file{fileCount !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
