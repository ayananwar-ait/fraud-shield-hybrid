import { useEffect, useState } from "react";
import {
  Shield, Activity, Brain, Cpu, Zap, BarChart3, Github, Linkedin, Mail,
  Lock, AlertTriangle, CheckCircle2, Sparkles, Database, LineChart,
  Workflow, Globe2, Code2, ArrowRight, Menu, X, Gauge, Network,
  TrendingUp, ShieldCheck, FileSearch,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, RadialBarChart, RadialBar, PieChart, Pie, Cell, LineChart as RLineChart, Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundFX } from "./BackgroundFX";
import { RiskGauge } from "./RiskGauge";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Research" },
  { id: "detection", label: "Fraud Detection" },
  { id: "analytics", label: "Live Analysis" },
  { id: "features", label: "Features" },
  { id: "tech", label: "Technology" },
  { id: "results", label: "Results" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export function FraudDetectionApp() {
  return (
    <div className="min-h-screen text-foreground">
      <LoadingOverlay />
      <NavBar />
      <Hero />
      <AboutSection />
      <DetectionSection />
      <AnalyticsSection />
      <FeaturesSection />
      <TechSection />
      <ResultsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}

/* ------------------------------- LOADER ------------------------------- */
function LoadingOverlay() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-accent" />
          <Shield className="absolute inset-0 m-auto h-6 w-6 text-accent" />
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Initializing SentinelAI
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- NAV --------------------------------- */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all",
            scrolled ? "glass shadow-[var(--shadow-elegant)]" : "bg-transparent",
          )}
        >
          <a href="#home" className="flex items-center gap-2">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] glow-ring">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold tracking-tight">SentinelAI</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Fraud Intel
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button asChild variant="hero" size="sm">
              <a href="#detection">Try Demo <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
          <button
            className="lg:hidden rounded-md p-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

/* -------------------------------- HERO -------------------------------- */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32">
      <BackgroundFX />
      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Live · Hybrid ML Engine v2.1
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              AI-Powered <span className="text-gradient">Real-Time</span><br />
              Financial Fraud Detection
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
              Detect suspicious financial transactions instantly using a hybrid statistical and
              machine learning framework — adaptive, explainable, and built for production-grade
              cyber defense.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <a href="#detection">
                  <Zap className="h-4 w-4" /> Try Demo
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass border-white/15">
                <a href="#about">
                  <FileSearch className="h-4 w-4" /> View Research
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { v: 98, s: "%", l: "Accuracy" },
                { v: 97, s: "%", l: "Precision" },
                { v: 0.7, s: "s", l: "Latency", d: 1 },
                { v: 1.2, s: "M+", l: "Tx Analyzed", d: 1 },
              ].map((m) => (
                <div key={m.l} className="glass rounded-2xl p-4">
                  <div className="font-display text-3xl font-bold text-gradient">
                    <CountUp to={m.v} decimals={m.d || 0} suffix={m.s} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Floating transaction visualization */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <FloatingTxStream />
      </div>
    </section>
  );
}

function FloatingTxStream() {
  const items = [
    { id: "TX-8821", amt: "$4,210", tag: "Safe", ok: true },
    { id: "TX-8822", amt: "$12,990", tag: "Flagged", ok: false },
    { id: "TX-8823", amt: "$87", tag: "Safe", ok: true },
    { id: "TX-8824", amt: "$640", tag: "Review", ok: null as unknown as boolean },
  ];
  return (
    <div className="flex gap-3">
      {items.map((t, i) => (
        <div
          key={t.id}
          className="glass animate-float rounded-xl px-4 py-2 text-xs"
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                t.ok === true && "bg-success",
                t.ok === false && "bg-danger",
                t.ok === null && "bg-warning",
              )}
            />
            <span className="font-mono text-muted-foreground">{t.id}</span>
            <span className="font-semibold">{t.amt}</span>
            <span className="text-muted-foreground">{t.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ SECTIONS ------------------------------ */
function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-3xl text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{kicker}</div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{title}</h2>
        {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
      </div>
    </Reveal>
  );
}

function AboutSection() {
  const points = [
    {
      icon: AlertTriangle,
      title: "Problem Statement",
      body:
        "Digital payments have exploded, and so have fraud vectors — synthetic identities, account takeover, and adversarial automation outpace static rule engines.",
    },
    {
      icon: TrendingUp,
      title: "Why Fraud Is Rising",
      body:
        "Global card fraud losses exceed $40B/year. Attackers iterate in hours; legacy systems retrain in weeks.",
    },
    {
      icon: Lock,
      title: "Traditional Limitations",
      body:
        "Hard-coded rules miss novel patterns; pure ML drifts and lacks interpretability for compliance review.",
    },
    {
      icon: Sparkles,
      title: "Proposed Hybrid Framework",
      body:
        "Statistical anomaly scoring (IQR, z-score, isolation forests) fused with gradient-boosted classifiers for adaptive, explainable decisions.",
    },
  ];

  const flow = [
    { icon: Database, label: "Transaction Input" },
    { icon: Workflow, label: "Feature Extraction" },
    { icon: BarChart3, label: "Statistical Analysis" },
    { icon: Brain, label: "ML Model" },
    { icon: Gauge, label: "Risk Scoring" },
    { icon: ShieldCheck, label: "Decision" },
  ];

  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          kicker="About the Research"
          title="A Hybrid Statistical ML Framework"
          sub="Adaptive financial fraud detection that combines the rigor of statistical analysis with the pattern-recognition power of machine learning."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="glass group h-full rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Workflow */}
        <Reveal>
          <div className="mt-16">
            <div className="text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              End-to-End Detection Pipeline
            </div>
            <div className="mt-6 glass rounded-3xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {flow.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative grid h-14 w-14 place-items-center rounded-2xl glass glow-ring">
                        <s.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="text-xs font-medium text-muted-foreground">{s.label}</div>
                    </div>
                    {i < flow.length - 1 && (
                      <ArrowRight className="hidden h-4 w-4 text-primary md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- DETECTION ------------------------------ */
interface FormState {
  amount: string;
  age: string;
  txLastHour: string;
  type: string;
  category: string;
  device: string;
  locationRisk: string;
  prevFraud: string;
  method: string;
}

const defaults: FormState = {
  amount: "1250",
  age: "8",
  txLastHour: "6",
  type: "transfer",
  category: "electronics",
  device: "mobile",
  locationRisk: "55",
  prevFraud: "no",
  method: "card",
};

function scoreTransaction(f: FormState) {
  // Lightweight pseudo-model (statistical + heuristic) – placeholder for real ML endpoint.
  let s = 0;
  const amt = +f.amount || 0;
  const age = +f.age || 0;
  const tx = +f.txLastHour || 0;
  const loc = +f.locationRisk || 0;

  s += Math.min(35, amt / 400);
  s += age < 3 ? 20 : age < 12 ? 8 : 0;
  s += Math.min(20, tx * 2.2);
  s += loc * 0.25;
  if (f.prevFraud === "yes") s += 25;
  if (f.type === "transfer") s += 6;
  if (f.type === "crypto") s += 14;
  if (f.device === "unknown") s += 10;
  if (f.method === "crypto") s += 8;
  if (f.category === "gambling") s += 12;

  s = Math.max(2, Math.min(99, s + (Math.random() * 8 - 4)));
  const confidence = Math.round(82 + Math.random() * 14);
  const level = s < 35 ? "Low" : s < 70 ? "Medium" : "High";
  const action =
    s < 35
      ? "Approve transaction"
      : s < 70
        ? "Send for manual review"
        : "Block and alert fraud team";
  return { score: Math.round(s), confidence, level, action };
}

function DetectionSection() {
  const [form, setForm] = useState<FormState>(defaults);
  const [result, setResult] = useState<ReturnType<typeof scoreTransaction> | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (k: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const analyze = () => {
    setLoading(true);
    setResult(null);
    // Placeholder for real-time ML API integration:
    // fetch("/api/public/predict", { method: "POST", body: JSON.stringify(form) })
    setTimeout(() => {
      const r = scoreTransaction(form);
      setResult(r);
      setLoading(false);
      toast.success(`Analysis complete — ${r.level} risk`, {
        description: r.action,
      });
    }, 1100);
  };

  return (
    <section id="detection" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          kicker="Live Demo"
          title="Real-Time Fraud Detection"
          sub="Submit transaction features and watch the hybrid engine produce a risk score, confidence, and recommended action — instantly."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gradient-primary)]">
                  <Activity className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">Transaction Analyzer</h3>
                  <p className="text-xs text-muted-foreground">
                    Connect your own ML endpoint at <span className="font-mono">/api/public/predict</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Transaction Amount ($)">
                  <Input
                    type="number"
                    value={form.amount}
                    onChange={(e) => onChange("amount")(e.target.value)}
                    className="glass border-white/10"
                  />
                </Field>
                <Field label="Account Age (Months)">
                  <Input
                    type="number"
                    value={form.age}
                    onChange={(e) => onChange("age")(e.target.value)}
                    className="glass border-white/10"
                  />
                </Field>
                <Field label="Transactions in Last Hour">
                  <Input
                    type="number"
                    value={form.txLastHour}
                    onChange={(e) => onChange("txLastHour")(e.target.value)}
                    className="glass border-white/10"
                  />
                </Field>
                <Field label="Location Risk Score (0-100)">
                  <Input
                    type="number"
                    value={form.locationRisk}
                    onChange={(e) => onChange("locationRisk")(e.target.value)}
                    className="glass border-white/10"
                  />
                </Field>
                <Field label="Transaction Type">
                  <SelectBox
                    value={form.type}
                    onChange={onChange("type")}
                    options={[
                      ["transfer", "Wire Transfer"],
                      ["purchase", "Purchase"],
                      ["withdrawal", "Withdrawal"],
                      ["crypto", "Crypto Conversion"],
                    ]}
                  />
                </Field>
                <Field label="Merchant Category">
                  <SelectBox
                    value={form.category}
                    onChange={onChange("category")}
                    options={[
                      ["electronics", "Electronics"],
                      ["travel", "Travel"],
                      ["grocery", "Grocery"],
                      ["gambling", "Gambling"],
                      ["luxury", "Luxury Goods"],
                    ]}
                  />
                </Field>
                <Field label="Device Type">
                  <SelectBox
                    value={form.device}
                    onChange={onChange("device")}
                    options={[
                      ["mobile", "Mobile"],
                      ["desktop", "Desktop"],
                      ["tablet", "Tablet"],
                      ["unknown", "Unknown / VPN"],
                    ]}
                  />
                </Field>
                <Field label="Previous Fraud History">
                  <SelectBox
                    value={form.prevFraud}
                    onChange={onChange("prevFraud")}
                    options={[
                      ["no", "No prior incidents"],
                      ["yes", "Yes — flagged before"],
                    ]}
                  />
                </Field>
                <Field label="Payment Method" className="md:col-span-2">
                  <SelectBox
                    value={form.method}
                    onChange={onChange("method")}
                    options={[
                      ["card", "Credit / Debit Card"],
                      ["bank", "Bank Transfer"],
                      ["wallet", "Digital Wallet"],
                      ["crypto", "Cryptocurrency"],
                    ]}
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Inference simulated client-side. Drop in your model for live predictions.
                </p>
                <Button onClick={analyze} variant="hero" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="h-3 w-3 animate-ping rounded-full bg-white/80" />
                      Analyzing…
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" /> Analyze Transaction
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Result panel */}
          <Reveal className="lg:col-span-2" delay={120}>
            <div className="glass flex h-full flex-col items-center gap-6 rounded-3xl p-6 md:p-8">
              <div className="w-full text-center">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  AI Risk Indicator
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold">Transaction Risk</h3>
              </div>
              <RiskGauge value={result?.score ?? 0} label="Fraud Probability" />
              <div className="w-full space-y-4">
                <Metric
                  label="Fraud Probability"
                  value={result?.score ?? 0}
                  suffix="%"
                  color={result ? (result.score < 35 ? "success" : result.score < 70 ? "warning" : "danger") : "primary"}
                />
                <Metric
                  label="AI Confidence"
                  value={result?.confidence ?? 0}
                  suffix="%"
                  color="primary"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Pill label="Risk Level" value={result?.level ?? "—"} />
                  <Pill label="Recommended" value={result?.action ?? "Run analysis"} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function SelectBox({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="glass border-white/10">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(([v, l]) => (
          <SelectItem key={v} value={v}>{l}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function Metric({ label, value, suffix, color }: { label: string; value: number; suffix?: string; color: "success" | "warning" | "danger" | "primary" }) {
  const colorVar = {
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    primary: "var(--primary)",
  }[color];
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold" style={{ color: colorVar }}>
          {value}{suffix}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${colorVar}, color-mix(in oklch, ${colorVar}, white 20%))`,
            boxShadow: `0 0 16px ${colorVar}`,
          }}
        />
      </div>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 truncate text-sm font-semibold">{value}</div>
    </div>
  );
}

/* ------------------------------ ANALYTICS ----------------------------- */
function AnalyticsSection() {
  const trend = Array.from({ length: 14 }, (_, i) => ({
    d: `D${i + 1}`,
    fraud: Math.round(20 + Math.sin(i / 1.5) * 12 + Math.random() * 8),
    legit: Math.round(820 + Math.cos(i / 2) * 80 + Math.random() * 40),
  }));
  const regions = [
    { r: "NA", v: 38 },
    { r: "EU", v: 26 },
    { r: "APAC", v: 22 },
    { r: "LATAM", v: 9 },
    { r: "MEA", v: 5 },
  ];
  const pie = [
    { name: "Legitimate", value: 96.4 },
    { name: "Fraud", value: 3.6 },
  ];
  const pieColors = ["var(--primary)", "var(--danger)"];
  const metrics = [
    { name: "Accuracy", v: 98 },
    { name: "Precision", v: 97 },
    { name: "Recall", v: 96 },
    { name: "F1", v: 96.5 },
  ];

  return (
    <section id="analytics" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          kicker="Live Analysis"
          title="Operations Dashboard"
          sub="A real-time view of transaction flow, fraud trends, geographic risk and model health."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          <Reveal className="lg:col-span-4">
            <ChartCard title="Daily Fraud Trends" subtitle="Last 14 days">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="gFraud" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.25 25)" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="oklch(0.65 0.25 25)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gLegit" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.70 0.18 265)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.70 0.18 265)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.7 0.1 265 / 10%)" vertical={false} />
                  <XAxis dataKey="d" stroke="oklch(0.7 0.03 250)" fontSize={11} />
                  <YAxis stroke="oklch(0.7 0.03 250)" fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="legit" stroke="oklch(0.70 0.18 265)" fill="url(#gLegit)" strokeWidth={2} />
                  <Area type="monotone" dataKey="fraud" stroke="oklch(0.65 0.25 25)" fill="url(#gFraud)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={80}>
            <ChartCard title="Fraud vs Legitimate" subtitle="Last 24 hours">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={pie} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {pie.map((_, i) => (
                      <Cell key={i} fill={pieColors[i]} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex justify-center gap-4 text-xs">
                {pie.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: pieColors[i] }} />
                    <span className="text-muted-foreground">{p.name}</span>
                    <span className="font-mono">{p.value}%</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={120}>
            <ChartCard title="High-Risk Regions" subtitle="Share of flagged volume">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={regions} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid stroke="oklch(0.7 0.1 265 / 10%)" horizontal={false} />
                  <XAxis type="number" stroke="oklch(0.7 0.03 250)" fontSize={11} />
                  <YAxis dataKey="r" type="category" stroke="oklch(0.7 0.03 250)" fontSize={11} width={50} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(0.7 0.18 265 / 8%)" }} />
                  <Bar dataKey="v" fill="oklch(0.82 0.16 200)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={160}>
            <ChartCard title="Model Performance" subtitle="Accuracy · Precision · Recall · F1">
              <ResponsiveContainer width="100%" height={240}>
                <RadialBarChart innerRadius="30%" outerRadius="100%" data={metrics} startAngle={90} endAngle={-270}>
                  <RadialBar background dataKey="v" cornerRadius={8} fill="oklch(0.70 0.18 265)" />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="-mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                {metrics.map((m) => (
                  <div key={m.name} className="glass rounded-lg py-2">
                    <div className="font-mono text-base font-bold text-gradient">{m.v}%</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.name}</div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={200}>
            <ChartCard title="Transaction Volume (Real-Time Stream)" subtitle="Per-minute throughput">
              <ResponsiveContainer width="100%" height={200}>
                <RLineChart data={Array.from({ length: 30 }, (_, i) => ({
                  t: i,
                  v: 400 + Math.sin(i / 2) * 90 + Math.random() * 60,
                }))}>
                  <CartesianGrid stroke="oklch(0.7 0.1 265 / 10%)" vertical={false} />
                  <XAxis dataKey="t" stroke="oklch(0.7 0.03 250)" fontSize={11} />
                  <YAxis stroke="oklch(0.7 0.03 250)" fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="v" stroke="oklch(0.82 0.16 200)" strokeWidth={2.5} dot={false} />
                </RLineChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const tooltipStyle: React.CSSProperties = {
  background: "oklch(0.20 0.05 270 / 95%)",
  border: "1px solid oklch(0.70 0.18 265 / 30%)",
  borderRadius: 12,
  fontSize: 12,
  color: "oklch(0.97 0.01 240)",
};

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="glass h-full rounded-2xl p-5">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex h-2 w-2 items-center">
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-success/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </div>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------ FEATURES ------------------------------ */
function FeaturesSection() {
  const items = [
    { icon: Zap, t: "Real-Time Detection", d: "Sub-second scoring on streaming transactions." },
    { icon: Brain, t: "ML Prediction", d: "Gradient-boosted ensembles with calibrated probabilities." },
    { icon: BarChart3, t: "Statistical Anomalies", d: "z-score, IQR, isolation forests for novelty detection." },
    { icon: Gauge, t: "Risk Score Generation", d: "Interpretable 0–100 risk with feature attributions." },
    { icon: Sparkles, t: "Adaptive Learning", d: "Online updates as fraud patterns evolve." },
    { icon: LineChart, t: "Interactive Dashboard", d: "Live ops view for analysts and compliance." },
    { icon: CheckCircle2, t: "High Accuracy", d: "98% accuracy on benchmark datasets." },
    { icon: ShieldCheck, t: "Low False Positives", d: "Hybrid layer reduces friction for legitimate users." },
  ];
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          kicker="Capabilities"
          title="Built for Production Fraud Defense"
          sub="Every layer of the platform is designed for the speed, accuracy and explainability modern finance demands."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f, i) => (
            <Reveal key={f.t} delay={i * 50}>
              <div className="glass group relative h-full overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--gradient-primary)] opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold">{f.t}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- TECH -------------------------------- */
function TechSection() {
  const groups: { title: string; icon: React.ElementType; items: string[] }[] = [
    { title: "Frontend", icon: Code2, items: ["HTML5", "CSS3", "JavaScript", "React"] },
    { title: "Machine Learning", icon: Brain, items: ["Python", "Scikit-learn", "Pandas", "NumPy"] },
    { title: "Visualization", icon: LineChart, items: ["Chart.js", "Plotly", "Recharts"] },
    { title: "Deployment", icon: Globe2, items: ["Netlify", "Vercel", "Edge Functions"] },
    { title: "Version Control", icon: Github, items: ["Git", "GitHub"] },
    { title: "Infrastructure", icon: Cpu, items: ["REST API", "Streaming", "Webhooks"] },
  ];
  return (
    <section id="tech" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          kicker="Stack"
          title="Technology Stack"
          sub="A modern, full-stack toolkit chosen for clarity, performance and reproducibility."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 60}>
              <div className="glass h-full rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- RESULTS ------------------------------ */
function ResultsSection() {
  const metrics = [
    { l: "Accuracy", v: 98, s: "%" },
    { l: "Precision", v: 97, s: "%" },
    { l: "Recall", v: 96, s: "%" },
    { l: "F1 Score", v: 96.5, s: "%", d: 1 },
    { l: "Detection Speed", v: 0.7, s: "s", d: 1 },
  ];
  const rows = [
    ["Detection Latency", "5–30 seconds", "< 1 second"],
    ["False Positive Rate", "8–14%", "~2%"],
    ["Adaptive Learning", "Manual rule updates", "Online retraining"],
    ["Explainability", "Limited", "Per-feature attributions"],
    ["Novel Pattern Detection", "Poor", "Strong (statistical layer)"],
    ["Accuracy", "82–88%", "98%"],
  ];
  return (
    <section id="results" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          kicker="Research Results"
          title="Benchmarked & Battle-Tested"
          sub="Evaluated on benchmark fraud datasets and stress-tested against adversarial transaction streams."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5">
          {metrics.map((m, i) => (
            <Reveal key={m.l} delay={i * 60}>
              <div className="glass rounded-2xl p-5 text-center">
                <div className="font-display text-4xl font-bold text-gradient">
                  <CountUp to={m.v} decimals={m.d || 0} suffix={m.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {m.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 glass overflow-hidden rounded-3xl">
            <div className="border-b border-white/10 px-6 py-4">
              <h3 className="font-display text-xl font-semibold">Traditional vs Proposed Hybrid Framework</h3>
              <p className="text-sm text-muted-foreground">Head-to-head comparison across the dimensions that matter.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                    <th className="px-6 py-3">Dimension</th>
                    <th className="px-6 py-3">Traditional Systems</th>
                    <th className="px-6 py-3 text-accent">Proposed Hybrid</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r[0]} className="border-t border-white/5 transition-colors hover:bg-white/[0.03]">
                      <td className="px-6 py-4 font-medium">{r[0]}</td>
                      <td className="px-6 py-4 text-muted-foreground">{r[1]}</td>
                      <td className="px-6 py-4 font-semibold text-gradient">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- TEAM ------------------------------- */
function TeamSection() {
  const team = [
    { n: "Lead Researcher", r: "B.Tech Final Year — AI/ML", i: "LR" },
    { n: "ML Engineer", r: "Model Development & Training", i: "ME" },
    { n: "Data Scientist", r: "Feature Engineering & Stats", i: "DS" },
    { n: "Faculty Advisor", r: "Cybersecurity & Finance", i: "FA" },
  ];
  return (
    <section id="team" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading kicker="Team" title="Built by Researchers" sub="A multidisciplinary team bridging machine learning, statistics and financial security." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <Reveal key={p.n} delay={i * 70}>
              <div className="glass group rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,oklch(0.70_0.18_265),oklch(0.82_0.16_200),oklch(0.65_0.22_305),oklch(0.70_0.18_265))] p-[2px]">
                    <div className="grid h-full w-full place-items-center rounded-full bg-background font-display text-xl font-bold">
                      {p.i}
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.n}</h3>
                <p className="text-xs text-muted-foreground">{p.r}</p>
                <div className="mt-4 flex justify-center gap-2">
                  <SocialIcon Icon={Github} />
                  <SocialIcon Icon={Linkedin} />
                  <SocialIcon Icon={Mail} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ Icon }: { Icon: React.ElementType }) {
  return (
    <a
      href="#contact"
      className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

/* ------------------------------- CONTACT ------------------------------ */
function ContactSection() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent", { description: "We'll respond within 24 hours." });
    (e.currentTarget as HTMLFormElement).reset();
  };
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading kicker="Contact" title="Get In Touch" sub="Questions, collaboration, or want a live walkthrough? Send a message." />
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="glass mt-12 grid gap-4 rounded-3xl p-6 md:grid-cols-2 md:p-8"
          >
            <Field label="Your Name">
              <Input required className="glass border-white/10" placeholder="Jane Doe" />
            </Field>
            <Field label="Email">
              <Input required type="email" className="glass border-white/10" placeholder="jane@research.org" />
            </Field>
            <Field label="Organization" className="md:col-span-2">
              <Input className="glass border-white/10" placeholder="University / Company" />
            </Field>
            <Field label="Message" className="md:col-span-2">
              <textarea
                required
                rows={5}
                className="glass w-full rounded-md border border-white/10 bg-transparent p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
                placeholder="Tell us about your interest…"
              />
            </Field>
            <div className="md:col-span-2 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                We respect your privacy. No data is stored or sold.
              </p>
              <Button type="submit" variant="hero" size="lg">
                Send Message <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- FOOTER ------------------------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] glow-ring">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">SentinelAI</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Hybrid Fraud Intelligence
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              A B.Tech final-year research project on adaptive financial fraud detection,
              combining statistical analysis with modern machine learning.
            </p>
          </div>
          <div>
            <div className="font-display text-sm font-semibold">Project</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Research Project</li>
              <li>B.Tech Final Year</li>
              <li>AI & Machine Learning</li>
              <li>Cybersecurity Analytics</li>
            </ul>
          </div>
          <div>
            <div className="font-display text-sm font-semibold">Connect</div>
            <div className="mt-3 flex gap-2">
              <SocialIcon Icon={Github} />
              <SocialIcon Icon={Linkedin} />
              <SocialIcon Icon={Mail} />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} SentinelAI Research. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}