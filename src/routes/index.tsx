import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, TrendingUp, Brain, Zap, Lock } from "lucide-react";
import { AuraLogo } from "@/components/AuraLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IDBI AURA — AI Unified Relationship Advisor" },
      { name: "description", content: "Meet AURA — IDBI Bank's AI wealth advisor. Real-time financial health, proactive insights, and portfolio intelligence built into your banking app." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <AuraLogo className="h-9 w-9" />
          <div>
            <div className="text-[15px] font-semibold tracking-tight">IDBI AURA</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">by IDBI Bank</div>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#capabilities" className="hover:text-foreground">Capabilities</a>
          <a href="#architecture" className="hover:text-foreground">Architecture</a>
          <a href="#security" className="hover:text-foreground">Security</a>
          <a href="#roadmap" className="hover:text-foreground">Roadmap</a>
        </nav>
        <Link to="/auth" className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-medium text-white shadow-elegant">
          Enter AURA <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-[10%] top-[30%] h-[280px] w-[280px] rounded-full bg-info/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" /> IDBI Innovate 2026 · Digital Wealth
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight lg:text-7xl">
              Your personal <span className="text-gradient-brand">AI wealth advisor</span> inside IDBI Bank.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              AURA transforms banking from a transaction platform into an intelligent financial advisor — analyzing behavior, forecasting cash flow, planning goals and recommending investments across every IDBI customer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth" className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant">
                Launch Prototype <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pipeline" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold">
                View AI Architecture
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-success" /> RBI-Ready Design</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-success" /> End-to-End Encryption</span>
              <span className="flex items-center gap-1.5"><Brain className="h-3.5 w-3.5 text-primary" /> Gemini + LangGraph</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-warning" /> Sub-second Insights</span>
            </div>
          </motion.div>

          {/* Preview panel */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative mt-16">
            <div className="glass-card rounded-3xl p-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <PreviewStat label="Financial Health" value="87 / 100" hint="Excellent discipline" />
                <PreviewStat label="Net Worth" value="₹60.5 L" hint="+3.2% MoM" positive />
                <PreviewStat label="Portfolio XIRR" value="16.2%" hint="Above benchmark" positive />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">Capabilities</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">Built to feel like a relationship manager. Not a chatbot.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {caps.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section id="architecture" className="border-y border-border bg-gradient-to-b from-brand-soft/40 to-transparent">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          <Stat k="12" label="AI engines orchestrated" />
          <Stat k="< 800ms" label="Insight latency (p95)" />
          <Stat k="87%" label="Recommendation acceptance" />
          <Stat k="4.7 ⭐" label="Simulated CX score" />
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-xs text-muted-foreground">
        <div className="flex items-center gap-2"><AuraLogo className="h-5 w-5" /> IDBI AURA · Innovate 2026 Prototype</div>
        <div>Concept build. Not a customer-facing production release.</div>
      </footer>
    </div>
  );
}

const caps = [
  { icon: Brain, title: "Behavioural intelligence", body: "AURA reads spending patterns, life events and cash flow rhythms to anticipate needs before you ask." },
  { icon: TrendingUp, title: "Portfolio intelligence", body: "Diversification checks, XIRR benchmarking and rebalance nudges across mutual funds, equity, FD, gold and insurance." },
  { icon: Sparkles, title: "Goal-first planning", body: "Every recommendation ties back to a real goal — house, education, retirement — with a probability of success." },
  { icon: ShieldCheck, title: "Risk-aware", body: "Continuous risk profiling adapts to age, income stability, dependents and behavioural tolerance." },
  { icon: Zap, title: "Proactive nudges", body: "Anomaly detection surfaces subscription creep, unusual bills and cash-flow risks in real time." },
  { icon: Lock, title: "Enterprise-grade", body: "Designed to slot into IDBI's core banking, KYC and compliance stack with full audit trails." },
];

function PreviewStat({ label, value, hint, positive }: { label: string; value: string; hint: string; positive?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-6">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
      <div className={`mt-1 text-xs ${positive ? "text-success" : "text-muted-foreground"}`}>{hint}</div>
    </div>
  );
}

function Stat({ k, label }: { k: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-semibold tracking-tight">{k}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
