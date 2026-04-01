interface HealthChartProps {
  active: number;
  template: number;
  draft: number;
  needsReview: number;
}

const COLORS = {
  active: "#16a34a",
  template: "#9ca3af",
  draft: "#3b82f6",
  needsReview: "#f59e0b",
};

export function HealthChart({
  active,
  template,
  draft,
  needsReview,
}: HealthChartProps) {
  const total = active + template + draft + needsReview;
  const healthPct = total > 0 ? Math.round((active / total) * 100) : 0;

  const segments = [
    { value: active, color: COLORS.active, label: "Active" },
    { value: template, color: COLORS.template, label: "Template" },
    { value: draft, color: COLORS.draft, label: "Draft" },
    { value: needsReview, color: COLORS.needsReview, label: "Needs Review" },
  ].filter((s) => s.value > 0);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 100 100" className="size-40">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-muted/40"
        />
        {/* Segments */}
        {segments.map((seg, i) => {
          const segLength = total > 0 ? (seg.value / total) * circumference : 0;
          const dashOffset = circumference - offset;
          offset += segLength;
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="12"
              strokeDasharray={`${segLength} ${circumference - segLength}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              transform="rotate(-90 50 50)"
            />
          );
        })}
        {/* Center text */}
        <text
          x="50"
          y="47"
          textAnchor="middle"
          className="fill-foreground text-[16px] font-bold"
        >
          {healthPct}%
        </text>
        <text
          x="50"
          y="59"
          textAnchor="middle"
          className="fill-muted-foreground text-[7px]"
        >
          Health
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-muted-foreground">
              {seg.label} ({seg.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
