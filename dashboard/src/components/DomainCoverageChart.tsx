import { cn } from "@/lib/utils";

export interface DomainCoverage {
  domain: string;
  total: number;
  active: number;
  template: number;
  draft?: number;
}

interface DomainCoverageChartProps {
  domains: DomainCoverage[];
}

export function DomainCoverageChart({ domains }: DomainCoverageChartProps) {
  const maxTotal = Math.max(...domains.map((d) => d.total), 1);

  return (
    <div className="flex flex-col gap-3">
      {domains.map((d) => {
        const pctActive = d.total > 0 ? (d.active / d.total) * 100 : 0;
        const pctTemplate = d.total > 0 ? (d.template / d.total) * 100 : 0;
        const pctDraft = d.total > 0 ? ((d.draft ?? 0) / d.total) * 100 : 0;
        const barWidth = (d.total / maxTotal) * 100;

        return (
          <div key={d.domain} className="flex items-center gap-3">
            <div className="w-28 shrink-0 text-right text-xs font-medium text-muted-foreground truncate">
              {d.domain}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="flex h-5 overflow-hidden rounded-md bg-muted/40"
                style={{ width: `${barWidth}%`, minWidth: "2rem" }}
              >
                {pctActive > 0 && (
                  <div
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${pctActive}%` }}
                  />
                )}
                {pctTemplate > 0 && (
                  <div
                    className="bg-gray-400 h-full transition-all"
                    style={{ width: `${pctTemplate}%` }}
                  />
                )}
                {pctDraft > 0 && (
                  <div
                    className="bg-blue-500 h-full transition-all"
                    style={{ width: `${pctDraft}%` }}
                  />
                )}
              </div>
            </div>
            <div className="w-20 shrink-0 text-xs text-muted-foreground tabular-nums">
              {d.active}/{d.total} active
            </div>
          </div>
        );
      })}
    </div>
  );
}
