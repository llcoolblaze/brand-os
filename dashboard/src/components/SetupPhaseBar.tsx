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
  { icon: React.ComponentType<{ className?: string }>; style: string }
> = {
  locked: {
    icon: Lock,
    style: "border-foreground/20 text-foreground/30",
  },
  pending: {
    icon: Circle,
    style: "border-foreground/40 text-foreground/50",
  },
  "in-progress": {
    icon: Loader,
    style: "border-foreground bg-foreground text-background",
  },
  complete: {
    icon: CheckCircle,
    style: "border-foreground bg-foreground text-background",
  },
  skippable: {
    icon: Circle,
    style: "border-foreground/60 text-foreground/70 border-dashed",
  },
};

export function SetupPhaseBar({ phases }: SetupPhaseBarProps) {
  return (
    <div className="flex gap-0 overflow-x-auto">
      {phases.map((phase, i) => {
        const config = statusConfig[phase.status];
        const Icon = config.icon;
        const fileCount = Object.keys(phase.files).length;
        return (
          <div
            key={i}
            className={cn(
              "flex flex-1 min-w-[110px] items-center gap-2 border px-3 py-3 text-xs",
              config.style,
              i > 0 && "-ml-px"
            )}
          >
            <Icon
              className={cn(
                "size-3.5 shrink-0",
                phase.status === "in-progress" && "animate-spin"
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="font-semibold uppercase tracking-wider truncate text-[10px]">
                {phase.name}
              </div>
              <div className="font-mono text-[10px] opacity-60">
                {fileCount} file{fileCount !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
