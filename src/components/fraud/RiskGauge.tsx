interface Props {
  value: number; // 0-100
  size?: number;
  label?: string;
}

/** Animated circular speedometer / risk gauge. */
export function RiskGauge({ value, size = 220, label = "Risk Score" }: Props) {
  const v = Math.max(0, Math.min(100, value));
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (v / 100) * c * 0.75; // 270deg arc
  const arc = c * 0.75;

  const color =
    v < 35 ? "var(--success)" : v < 70 ? "var(--warning)" : "var(--danger)";
  const level = v < 35 ? "SAFE" : v < 70 ? "SUSPICIOUS" : "FRAUD";

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} className="-rotate-[135deg]">
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(0.30 0.04 270)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${c}`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          style={{
            transition: "stroke-dasharray 1.2s cubic-bezier(.2,.8,.2,1)",
            filter: `drop-shadow(0 0 12px ${color})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <div className="font-display text-5xl font-bold" style={{ color }}>
          {Math.round(v)}
          <span className="text-2xl opacity-70">%</span>
        </div>
        <div className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </div>
        <div
          className="mt-2 rounded-full px-3 py-0.5 text-[10px] font-semibold tracking-widest"
          style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}
        >
          {level}
        </div>
      </div>
    </div>
  );
}