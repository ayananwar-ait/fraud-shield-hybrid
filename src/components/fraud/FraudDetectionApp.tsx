import { useEffect, useMemo, useState } from "react";
import {
  Activity, Shield, TrendingUp, Zap, Brain, Github, AlertTriangle,
  CheckCircle2, Sparkles,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, LineChart as RLineChart, Line, Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const EMERALD = "oklch(0.75 0.17 160)";
const RED = "oklch(0.66 0.23 25)";
const BLUE = "oklch(0.68 0.18 250)";
const PURPLE = "oklch(0.68 0.22 305)";
const AMBER = "oklch(0.78 0.17 75)";

export function FraudDetectionApp() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 md:px-6">
        <Hero />
        <StatCards />
        <ChartsGrid />
        <LiveFeed />
        <AnalyzerAndAbout />
      </main>
      <Footer />
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}

/* ------------------------------ HEADER ------------------------------ */
function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">FraudShield</div>
            <div className="text-[11px] text-muted-foreground">Hybrid ML Fraud Detection</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-medium text-primary">Live</span>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- HERO -------------------------------- */
function Hero() {
  return (
    <section id="home" className="py-16 text-center md:py-24">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          <Brain className="h-3.5 w-3.5" />
          Hybrid Statistical + ML Framework
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          Real-Time Financial <span className="text-primary">Fraud Detection</span>
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-sm text-muted-foreground md:text-base">
          Adaptive hybrid framework combining statistical anomaly detection (Z-Score, CUSUM,
          Isolation Forest) with machine learning models (XGBoost, LSTM, Random Forest) for
          <span className="font-semibold text-primary"> 96.1% detection accuracy</span>.
        </p>
      </Reveal>
    </section>
  );
}

/* ---------------------------- STAT CARDS ---------------------------- */
function StatCards() {
  const stats = [
    { label: "Transactions Today", value: 2.4, suffix: "M", decimals: 1, change: "+8.3%", up: true, icon: Activity, color: BLUE },
    { label: "Frauds Blocked", value: 7842, suffix: "", change: "+12.1%", up: true, icon: Shield, color: RED },
    { label: "Detection Accuracy", value: 96.1, suffix: "%", decimals: 1, change: "+1.2%", up: true, icon: TrendingUp, color: EMERALD },
    { label: "Avg. Latency", value: 18, suffix: "ms", change: "-3ms", up: true, icon: Zap, color: PURPLE },
  ];
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 80}>
          <div className="group h-full rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-glow)]">
            <div className="flex items-start justify-between">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-primary">{s.change}</span>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">{s.label}</div>
            <div className="font-display text-3xl font-bold">
              <CountUp to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ---------------------------- CHARTS GRID --------------------------- */
const tooltipStyle: React.CSSProperties = {
  background: "oklch(0.18 0.012 240)",
  border: "1px solid oklch(0.30 0.012 240)",
  borderRadius: 10,
  fontSize: 12,
  color: "oklch(0.96 0.01 200)",
};

function Panel({ title, subtitle, children, badge }: { title: string; subtitle?: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-display text-base font-semibold">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {title}
          </h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {badge && (
          <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function ChartsGrid() {
  // 24h volume
  const volume = useMemo(
    () =>
      Array.from({ length: 24 }, (_, h) => {
        const t = h - 6;
        const legit = Math.round(500 + Math.sin(t / 3) * 400 + Math.cos(t / 5) * 250 + Math.random() * 100);
        const fraud = Math.round(Math.max(0, 20 + Math.sin(t / 2) * 14 + Math.random() * 10));
        return { h: `${h}:00`, legit: Math.max(150, legit), fraud };
      }),
    [],
  );
  const methods = [
    { name: "XGBoost", v: 96.4 },
    { name: "LSTM", v: 94.1 },
    { name: "Random Forest", v: 92.8 },
    { name: "Isolation Forest", v: 88.5 },
    { name: "Z-Score", v: 81.2 },
    { name: "CUSUM", v: 79.0 },
  ];
  const breakdown = [
    { name: "Card-Not-Present", value: 34, color: EMERALD },
    { name: "Identity Theft", value: 22, color: BLUE },
    { name: "Account Takeover", value: 18, color: PURPLE },
    { name: "Merchant Fraud", value: 14, color: AMBER },
    { name: "Money Laundering", value: 12, color: RED },
  ];
  const adaptive = Array.from({ length: 12 }, (_, i) => ({
    m: `W${i + 1}`,
    acc: 91 + i * 0.45 + Math.random() * 0.5,
    prec: 89 + i * 0.55 + Math.random() * 0.6,
    rec: 88 + i * 0.6 + Math.random() * 0.7,
  }));

  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-6">
      <Reveal className="lg:col-span-4">
        <Panel title="Real-Time Transaction Volume (24h)" subtitle="Legitimate vs Fraudulent traffic">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={volume}>
              <defs>
                <linearGradient id="legit" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={EMERALD} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={EMERALD} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fraud" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={RED} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={RED} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.30 0.012 240 / 50%)" vertical={false} />
              <XAxis dataKey="h" stroke="oklch(0.55 0.015 220)" fontSize={10} interval={3} />
              <YAxis stroke="oklch(0.55 0.015 220)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" name="Legitimate" dataKey="legit" stroke={EMERALD} fill="url(#legit)" strokeWidth={2} />
              <Area type="monotone" name="Fraudulent" dataKey="fraud" stroke={RED} fill="url(#fraud)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-2" delay={80}>
        <Panel title="Fraud Type Breakdown" subtitle="Last 30 days">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={breakdown} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {breakdown.map((b, i) => (
                  <Cell key={i} fill={b.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {breakdown.map((b) => (
              <div key={b.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: b.color }} />
                  <span className="text-muted-foreground">{b.name}</span>
                </div>
                <span className="font-mono">{b.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-3" delay={120}>
        <Panel title="Detection Method Performance" subtitle="Accuracy by model (%)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={methods} layout="vertical" margin={{ left: 12 }}>
              <CartesianGrid stroke="oklch(0.30 0.012 240 / 50%)" horizontal={false} />
              <XAxis type="number" stroke="oklch(0.55 0.015 220)" fontSize={10} domain={[70, 100]} />
              <YAxis dataKey="name" type="category" stroke="oklch(0.55 0.015 220)" fontSize={10} width={100} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(0.75 0.17 160 / 6%)" }} />
              <Bar dataKey="v" fill={EMERALD} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-3" delay={160}>
        <Panel title="Model Performance Over Time" subtitle="Adaptive learning curve">
          <ResponsiveContainer width="100%" height={260}>
            <RLineChart data={adaptive}>
              <CartesianGrid stroke="oklch(0.30 0.012 240 / 50%)" vertical={false} />
              <XAxis dataKey="m" stroke="oklch(0.55 0.015 220)" fontSize={10} />
              <YAxis stroke="oklch(0.55 0.015 220)" fontSize={10} domain={[85, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="acc" name="Accuracy" stroke={EMERALD} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="prec" name="Precision" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="rec" name="Recall" stroke={PURPLE} strokeWidth={2} dot={false} />
            </RLineChart>
          </ResponsiveContainer>
        </Panel>
      </Reveal>
    </section>
  );
}

/* ----------------------------- LIVE FEED ---------------------------- */
const MERCHANTS = ["Walmart", "Amazon", "Netflix", "Uber", "ATM Withdrawal", "Hotel Hilton", "Unknown Vendor", "Apple Store", "Shell Gas", "Stripe"];
const CITIES = ["São Paulo, BR", "Shanghai, CN", "Sydney, AU", "London, UK", "Lagos, NG", "Berlin, DE", "Mumbai, IN", "New York, US", "Tokyo, JP"];

interface Tx {
  id: string;
  merchant: string;
  amount: number;
  location: string;
  risk: number;
  status: "legitimate" | "flagged" | "blocked";
  age: number; // seconds ago
}

function makeTx(): Tx {
  const risk = Math.floor(Math.random() * 100);
  return {
    id: `TXN-${Math.floor(10000 + Math.random() * 89999)}`,
    merchant: MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)],
    amount: Math.round(Math.random() * 1900 + 50 + Math.random() * 100) / 1,
    location: CITIES[Math.floor(Math.random() * CITIES.length)],
    risk,
    status: risk > 85 ? "blocked" : risk > 65 ? "flagged" : "legitimate",
    age: Math.floor(Math.random() * 30),
  };
}

function LiveFeed() {
  const [rows, setRows] = useState<Tx[]>(() => Array.from({ length: 8 }, makeTx));
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const next = [makeTx(), ...prev.slice(0, 7)];
        return next.map((r, i) => (i === 0 ? r : { ...r, age: r.age + 4 }));
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <Reveal>
      <section className="mt-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Live Transaction Feed
            </h3>
            <p className="text-xs text-muted-foreground">Refreshes every 4s</p>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
            STREAMING
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">TXN ID</th>
                <th className="px-5 py-3 font-medium">Merchant</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={`${r.id}-${i}`}
                  className={cn(
                    "border-t border-border/60 transition-colors hover:bg-secondary/40",
                    i === 0 && "animate-[fadeUp_0.4s_ease-out]",
                  )}
                >
                  <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-5 py-3">{r.merchant}</td>
                  <td className="px-5 py-3 font-mono">${r.amount.toFixed(2)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.location}</td>
                  <td className="px-5 py-3">
                    <RiskCell risk={r.risk} />
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{r.age}s ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Reveal>
  );
}

function RiskCell({ risk }: { risk: number }) {
  const color = risk > 65 ? RED : risk > 35 ? AMBER : EMERALD;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full" style={{ width: `${risk}%`, background: color }} />
      </div>
      <span className="font-mono text-xs" style={{ color }}>{risk}</span>
    </div>
  );
}

function StatusPill({ status }: { status: Tx["status"] }) {
  const map = {
    legitimate: { c: EMERALD, label: "legitimate" },
    flagged: { c: AMBER, label: "flagged" },
    blocked: { c: RED, label: "blocked" },
  } as const;
  const m = map[status];
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
      style={{ background: `${m.c}1f`, color: m.c, border: `1px solid ${m.c}40` }}
    >
      {m.label}
    </span>
  );
}

/* --------------------------- ANALYZER + ABOUT ----------------------- */
interface FormState {
  amount: string;
  merchant: string;
  location: string;
  time: string;
  age: string;
  prevFlags: string;
  velocity: string;
}
const defaults: FormState = {
  amount: "1250",
  merchant: "Amazon",
  location: "New York, US",
  time: "business",
  age: "8",
  prevFlags: "0",
  velocity: "4",
};

function score(f: FormState) {
  let s = 0;
  const amt = +f.amount || 0;
  const age = +f.age || 0;
  const flags = +f.prevFlags || 0;
  const vel = +f.velocity || 0;

  s += Math.min(35, amt / 400);
  s += age < 3 ? 18 : age < 12 ? 7 : 0;
  s += Math.min(22, vel * 2.5);
  s += flags * 12;
  if (f.time === "late_night") s += 16;
  if (f.time === "evening") s += 4;
  if (/unknown/i.test(f.merchant)) s += 14;
  s += Math.random() * 6 - 3;
  s = Math.max(2, Math.min(99, s));

  const confidence = Math.round(83 + Math.random() * 14);
  const level = s < 35 ? "Low" : s < 70 ? "Medium" : "High";
  const action =
    s < 35 ? "Approve transaction"
      : s < 70 ? "Send for manual review"
      : "Block and alert team";
  return { score: Math.round(s), confidence, level, action };
}

function AnalyzerAndAbout() {
  const [form, setForm] = useState<FormState>(defaults);
  const [result, setResult] = useState<ReturnType<typeof score> | null>(null);
  const [loading, setLoading] = useState(false);
  const set = (k: keyof FormState) => (v: string) => setForm((s) => ({ ...s, [k]: v }));

  const analyze = () => {
    setLoading(true);
    setResult(null);
    // Placeholder for real ML API: fetch("/api/public/predict", { method: "POST", body: JSON.stringify(form) })
    setTimeout(() => {
      const r = score(form);
      setResult(r);
      setLoading(false);
      toast.success(`Analysis complete — ${r.level} risk`, { description: r.action });
    }, 900);
  };

  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-5">
      <Reveal className="lg:col-span-3">
        <div className="h-full rounded-2xl border border-border bg-card p-6">
          <div className="mb-1 flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <h3 className="font-display text-lg font-semibold">AI Transaction Analyzer</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Submit a transaction to the hybrid ML engine for real-time fraud risk assessment.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Transaction Amount ($)">
              <Input type="number" value={form.amount} onChange={(e) => set("amount")(e.target.value)} />
            </Field>
            <Field label="Merchant Name">
              <Input value={form.merchant} onChange={(e) => set("merchant")(e.target.value)} />
            </Field>
            <Field label="Transaction Location">
              <Input value={form.location} onChange={(e) => set("location")(e.target.value)} />
            </Field>
            <Field label="Time of Transaction">
              <Sel value={form.time} onChange={set("time")} options={[
                ["business", "Business Hours (9am–5pm)"],
                ["evening", "Evening (5pm–11pm)"],
                ["late_night", "Late Night (11pm–4am)"],
                ["early_morning", "Early Morning (4am–9am)"],
              ]} />
            </Field>
            <Field label="Account Age (months)">
              <Input type="number" value={form.age} onChange={(e) => set("age")(e.target.value)} />
            </Field>
            <Field label="Previous Fraud Flags">
              <Sel value={form.prevFlags} onChange={set("prevFlags")} options={[
                ["0", "None"],
                ["1", "1 previous flag"],
                ["2", "2 previous flags"],
                ["3", "3 or more"],
              ]} />
            </Field>
            <Field label="Transactions in Last Hour (velocity)" className="md:col-span-2">
              <Input type="number" value={form.velocity} onChange={(e) => set("velocity")(e.target.value)} />
            </Field>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="min-h-[44px] flex-1">
              {result && (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <RiskCell risk={result.score} />
                  <span className="text-muted-foreground">·</span>
                  <StatusPill status={result.score > 70 ? "blocked" : result.score > 35 ? "flagged" : "legitimate"} />
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-mono font-semibold text-primary">{result.confidence}%</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="font-medium">{result.action}</span>
                </div>
              )}
            </div>
            <Button onClick={analyze} variant="hero" size="lg" disabled={loading}>
              {loading ? "Analyzing…" : (<><Zap className="h-4 w-4" /> Analyze Transaction</>)}
            </Button>
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-2" delay={100}>
        <div className="h-full rounded-2xl border border-border bg-card p-6">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-display text-lg font-semibold">About the Hybrid Framework</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Three layers working in concert for adaptive, explainable fraud defense.
          </p>

          <div className="mt-5 space-y-5">
            <LayerBlock
              icon={AlertTriangle}
              title="Statistical Layer"
              items={[
                "Z-Score anomaly detection",
                "CUSUM change-point detection",
                "Isolation Forest outlier scoring",
                "Multivariate statistical testing",
              ]}
            />
            <LayerBlock
              icon={Brain}
              title="Machine Learning Layer"
              items={[
                "XGBoost gradient boosting",
                "LSTM sequential patterns",
                "Random Forest ensemble",
                "Adaptive online learning",
              ]}
            />
            <LayerBlock
              icon={CheckCircle2}
              title="Hybrid Ensemble"
              items={[
                "Stacked meta-learning",
                "Weighted voting mechanism",
              ]}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LayerBlock({ icon: Icon, title, items }: { icon: React.ElementType; title: string; items: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </div>
      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary">›</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function Sel({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

/* -------------------------------- FOOTER ----------------------------- */
function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-muted-foreground md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-primary" />
          <span>FraudShield — Hybrid Statistical ML Framework for Adaptive Financial Fraud Detection</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="inline-flex items-center gap-1 hover:text-foreground">
            <Github className="h-3.5 w-3.5" /> Source
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}