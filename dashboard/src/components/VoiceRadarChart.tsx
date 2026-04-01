export interface VoiceDimension {
  name: string;
  leftLabel: string;
  rightLabel: string;
  value: number | null; // 1-10
}

interface VoiceRadarChartProps {
  dimensions: VoiceDimension[];
}

const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 110;
const LEVELS = 5;

function polarToCart(angle: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

export function VoiceRadarChart({ dimensions }: VoiceRadarChartProps) {
  const allNull = dimensions.every((d) => d.value === null);
  const count = dimensions.length || 5;
  const angleStep = 360 / count;

  if (allNull) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-3 opacity-40">&#127908;</div>
        <div className="text-sm font-medium text-muted-foreground">
          Set up your voice
        </div>
        <div className="text-xs text-muted-foreground/70 mt-1">
          Complete the brand voice setup to see your radar chart
        </div>
      </div>
    );
  }

  // Grid rings
  const rings = Array.from({ length: LEVELS }, (_, i) => {
    const r = (RADIUS / LEVELS) * (i + 1);
    const points = Array.from({ length: count }, (_, j) => {
      const p = polarToCart(j * angleStep, r);
      return `${p.x},${p.y}`;
    }).join(" ");
    return points;
  });

  // Axis lines
  const axes = Array.from({ length: count }, (_, i) => {
    const p = polarToCart(i * angleStep, RADIUS);
    return { x1: CENTER, y1: CENTER, x2: p.x, y2: p.y };
  });

  // Data polygon
  const dataPoints = dimensions.map((d, i) => {
    const val = d.value ?? 0;
    const r = (val / 10) * RADIUS;
    return polarToCart(i * angleStep, r);
  });
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Labels
  const labels = dimensions.map((d, i) => {
    const p = polarToCart(i * angleStep, RADIUS + 28);
    return { ...d, x: p.x, y: p.y };
  });

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[320px] mx-auto">
      {/* Grid */}
      {rings.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-border"
        />
      ))}

      {/* Axes */}
      {axes.map((a, i) => (
        <line
          key={i}
          x1={a.x1}
          y1={a.y1}
          x2={a.x2}
          y2={a.y2}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-border"
        />
      ))}

      {/* Data fill */}
      <polygon
        points={dataPath}
        className="fill-primary/20 stroke-primary"
        strokeWidth="2"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          className="fill-primary stroke-background"
          strokeWidth="2"
        />
      ))}

      {/* Labels */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground text-[9px]"
        >
          {l.name}
        </text>
      ))}
    </svg>
  );
}
