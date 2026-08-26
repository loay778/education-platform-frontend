import type { DailyActivity } from "../types";

interface WeeklyChartProps {
  days: DailyActivity[];
}

const WIDTH = 700;
const HEIGHT = 150;
const PAD_X = 26;
const PAD_Y = 14;

export function WeeklyChart({ days }: WeeklyChartProps) {
  const max = Math.max(...days.map((d) => d.minutes), 1);
  const stepX = (WIDTH - PAD_X * 2) / (days.length - 1);

  const points = days.map((d, i) => {
    const x = PAD_X + i * stepX;
    const y = HEIGHT - PAD_Y - (d.minutes / max) * (HEIGHT - PAD_Y * 2);
    return { x, y, minutes: d.minutes };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    HEIGHT - PAD_Y
  } L ${points[0].x} ${HEIGHT - PAD_Y} Z`;

  return (
    <>
      <svg
        className="chart"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--card-bg)"
            stroke="var(--primary)"
            strokeWidth="2.5"
          >
            <title>{p.minutes} دقيقة</title>
          </circle>
        ))}
      </svg>
      <div className="chart-days">
        {days.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </>
  );
}
