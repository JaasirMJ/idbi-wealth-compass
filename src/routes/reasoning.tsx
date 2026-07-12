import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { motion } from "framer-motion";
import { Brain, ChevronRight, Sparkles } from "lucide-react";
import { customer, healthScore } from "@/lib/mockData";

export const Route = createFileRoute("/reasoning")({
  component: Reasoning,
});

const stages = [
  { k: "Customer Data", v: `${customer.name} · Age ${customer.age} · ${customer.segment}`, out: "36 months history · 18 signals hydrated" },
  { k: "Transaction Analysis", v: "1,284 transactions · 24 categories", out: "Dining velocity +34% MoM · Subscriptions +₹1,499" },
  { k: "Behaviour Analysis", v: "Weekday vs weekend delta · payday impulse index", out: "Weekend spend 2.1× weekday · payday-2 impulse elevated" },
  { k: "Pattern Detection", v: "Seasonality · recurrence · lifestyle drift", out: "Q4 travel seasonality confirmed · subscription creep flagged" },
  { k: "Financial Health", v: `Composite ${healthScore.score}/100`, out: "Cash-flow stability 81/100 — the drag signal" },
  { k: "Risk Analysis", v: "Concentration · income · liquidity · leverage", out: "Concentration risk elevated (62% India equity)" },
  { k: "Forecast Generation", v: "Monte-Carlo · 10,000 paths", out: "Dec expenses ₹1.00L ± 4% · Payday balance ₹48,200" },
  { k: "Investment Matching", v: "Universe: 214 funds · 6 asset classes", out: "Parag Parikh FlexiCap chosen for diversification score 0.86" },
  { k: "Goal Alignment", v: "5 goals · ₹5.9 Cr aggregate target", out: "4/5 on track · Europe Vacation at-risk · fix identified" },
  { k: "Personalized Recommendation", v: "Ranked by impact × confidence × urgency", out: "5 next-best-actions produced" },
  { k: "LLM Explanation", v: "Grounded on numeric evidence · citations attached", out: "Natural-language rationale generated" },
  { k: "Avatar Response", v: "Voice + text · tone: reassuring · pace: measured", out: "Delivered to Rahul in 1.24s" },
];

function Reasoning() {
  return (
    <AppShell>
      <PageHeader title="AI Reasoning Engine" subtitle="Every AURA response passes through 12 grounded stages — never a black box" right={
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-brand-soft px-3 py-1.5 text-xs font-medium text-primary"><Brain className="h-3.5 w-3.5" /> Trace ID · trc_9f42a1</span>
      } />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-sm font-semibold">Live trace · "Can I afford a Europe vacation in July?"</div>
          <div className="mt-4 space-y-2">
            {stages.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[24px_1fr_auto] items-center gap-3 rounded-xl border border-border bg-muted/30 p-3"
              >
                <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">{i + 1}</span>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{s.k}</div>
                  <div className="text-xs text-muted-foreground truncate">{s.v}</div>
                  <div className="mt-1 text-[11px] text-primary">→ {s.out}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><div className="text-sm font-semibold">AURA's grounded response</div></div>
            <div className="mt-3 space-y-3 text-sm">
              <Block h="What I observed" b="You have ₹1.8L saved toward the ₹4.5L Europe target, contributing ₹25,000/mo. Dining spend rose 34% in the last two months." />
              <Block h="Why it matters" b="Your current pace lands you at ₹3.8L by July — an ₹70,000 shortfall (16%)." />
              <Block h="Possible consequences" b="Either postpone by 2 months or trim discretionary categories to close the gap." />
              <Block h="Recommended action" b="Redirect ₹8,500/mo from Dining and ₹4,197 from idle subscriptions. Fully closes the gap by June." />
              <Block h="Expected impact" b="Goal probability moves from 61% to 87% — becomes On-track." />
              <Block h="Confidence" b="87% · based on 10-month cash-flow stability and category elasticity model." />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">Evidence sources</div>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>· 1,284 transactions (Feb 2023 – Nov 2025)</li>
              <li>· Health signal history · 8 components</li>
              <li>· IDBI Priority Banking product catalog v2026.1</li>
              <li>· CPI inflation ledger · RBI feed (mock)</li>
              <li>· Peer cluster benchmarks (anonymised)</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
function Block({ h, b }: { h: string; b: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <div className="text-[10px] uppercase tracking-wider text-primary">{h}</div>
      <div className="mt-1">{b}</div>
    </div>
  );
}
