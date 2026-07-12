import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { personas } from "@/lib/personas";
import { PlayCircle, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/demo")({
  component: Demo,
});

const journey = [
  { t: "Landing & Login", to: "/auth", d: "Executive walkthrough begins on the branded landing." },
  { t: "AI Analysis Pipeline", to: "/loading", d: "Animated hydration of 18 signals across 12 stages." },
  { t: "Dashboard", to: "/dashboard", d: "Health score 87 · net-worth · cash-flow at a glance." },
  { t: "Financial Twin", to: "/twin", d: "20-year projection tied to real portfolio + goals." },
  { t: "Spending Intelligence", to: "/insights", d: "Dining +34% · subscription creep flagged." },
  { t: "Goal Planner", to: "/goals", d: "Europe vacation at-risk · AURA proposes a fix." },
  { t: "Investment Recommendations", to: "/investments", d: "Diversified · never single-stock." },
  { t: "Scenario Simulator", to: "/simulator", d: "Live before/after on step-up SIP." },
  { t: "Monthly Report", to: "/reports", d: "Grounded PDF-ready summary." },
  { t: "AI Avatar Q&A", to: "/advisor", d: "Voice-ready conversation, memory-aware." },
  { t: "Executive Impact", to: "/executive", d: "Bank-side economics: AUM lift, retention, cross-sell." },
] as const;

function Demo() {
  return (
    <AppShell>
      <PageHeader
        title="Demo Mode"
        subtitle="A guided 3–4 minute journey for IDBI executives"
        right={<span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-brand-soft px-3 py-1.5 text-xs font-medium text-primary"><PlayCircle className="h-3.5 w-3.5" /> Presenter-ready</span>}
      />

      <div className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2 text-sm font-semibold"><User className="h-4 w-4 text-primary" /> Choose a customer persona</div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {personas.map((p) => (
            <button
              key={p.id}
              className="rounded-xl border border-border bg-muted/30 p-4 text-left transition-colors hover:border-primary/50 hover:bg-brand-soft"
            >
              <div className="text-[11px] uppercase tracking-wider text-primary">{p.label}</div>
              <div className="mt-1 text-sm font-semibold">{p.name} · {p.age}</div>
              <div className="text-xs text-muted-foreground">{p.occupation} · {p.segment}</div>
              <div className="mt-2 text-[11px] text-muted-foreground">{p.headline}</div>
            </button>
          ))}
        </div>
        <div className="mt-3 text-[11px] text-muted-foreground">Personas swap through the API layer — the same modules re-render against each profile.</div>
      </div>

      <div className="grid gap-3">
        {journey.map((s, i) => (
          <motion.div
            key={s.to}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={s.to}
              className="grid grid-cols-[36px_1fr_auto] items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition-colors hover:border-primary/50"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
              <div>
                <div className="text-sm font-semibold">{s.t}</div>
                <div className="text-xs text-muted-foreground">{s.d}</div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-primary"><Sparkles className="h-3.5 w-3.5" /> Open</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}
