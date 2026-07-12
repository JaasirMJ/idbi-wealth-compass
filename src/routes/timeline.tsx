import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/mockData";
import { Calendar, Rewind, Sparkles } from "lucide-react";

export const Route = createFileRoute("/timeline")({
  component: Timeline,
});

type Entry = { date: string; kind: "credit" | "debit" | "insight" | "milestone" | "nudge"; title: string; detail: string; amount?: number };

const entries: Entry[] = [
  { date: "Nov 14", kind: "insight", title: "Dining velocity accelerating", detail: "5th restaurant transaction in 6 days. Trailing-7-day dining at ₹4,120 vs 6-mo avg ₹2,470." },
  { date: "Nov 12", kind: "debit", title: "Netflix auto-renewed", amount: 649, detail: "12 months at ₹649 · usage 4 sessions/mo — retain." },
  { date: "Nov 11", kind: "milestone", title: "SIP streak 27 months", detail: "HDFC MF ₹25,000 SIP executed. Corpus crossed ₹6.2L in this fund." },
  { date: "Nov 10", kind: "insight", title: "Electricity anomaly", detail: "BESCOM ₹4,820 — 28% above cluster median. AURA can request an audit." },
  { date: "Nov 5", kind: "debit", title: "Home Loan EMI", amount: 32500, detail: "EMI 66 of 240. Outstanding principal now ₹27.8L." },
  { date: "Nov 1", kind: "credit", title: "Salary credited", amount: 185000, detail: "TCS Payroll · IFSC IBKL0000103. Health score refreshed." },
  { date: "Oct 31", kind: "nudge", title: "AURA nudged you", detail: "'You've spent ₹18,400 on travel — 82% of your monthly envelope. Want me to hold discretionary spend?'" },
  { date: "Oct 27", kind: "insight", title: "Subscription creep detected", detail: "Cult Fit renewed at annual pricing. 3 idle subscriptions found." },
  { date: "Oct 20", kind: "milestone", title: "Financial Health → 87", detail: "Composite score improved +2 vs previous month. Driver: cash flow stability." },
  { date: "Oct 12", kind: "credit", title: "MF Dividend payout", amount: 4820, detail: "Parag Parikh Flexi Cap · reinvested via SIP top-up rule." },
  { date: "Oct 5", kind: "debit", title: "Home Loan EMI", amount: 32500, detail: "Auto-debited. On-time streak 24 months." },
  { date: "Sep 28", kind: "nudge", title: "AURA proactive alert", detail: "'You have ₹1.2L idle in savings. IDBI 555-day FD at 7.55% beats your savings rate by 4.5%.'" },
];

const toneMap: Record<Entry["kind"], { chip: string; dot: string; label: string }> = {
  credit: { chip: "bg-success/15 text-success", dot: "bg-success", label: "Credit" },
  debit: { chip: "bg-muted text-foreground", dot: "bg-muted-foreground", label: "Debit" },
  insight: { chip: "bg-info/15 text-info", dot: "bg-info", label: "AI Insight" },
  milestone: { chip: "bg-brand-soft text-primary", dot: "bg-primary", label: "Milestone" },
  nudge: { chip: "bg-warning/20 text-warning", dot: "bg-warning", label: "Nudge" },
};

function Timeline() {
  return (
    <AppShell>
      <PageHeader title="Insights Timeline" subtitle="Replay your financial life — every event AURA has observed" right={
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><Rewind className="h-3.5 w-3.5" /> Scrub through 36 months of history</span>
      } />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="relative pl-6">
            <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
            {entries.map((e, i) => {
              const t = toneMap[e.kind];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="relative mb-4 rounded-xl border border-border bg-muted/20 p-4"
                >
                  <span className={`absolute -left-[15px] top-5 grid h-3 w-3 place-items-center rounded-full ring-4 ring-card ${t.dot}`} />
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{e.date}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${t.chip}`}>{t.label}</span>
                    </div>
                    {typeof e.amount === "number" && (
                      <span className="text-sm font-semibold tabular-nums">{formatINR(e.amount)}</span>
                    )}
                  </div>
                  <div className="mt-1.5 text-sm font-medium">{e.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{e.detail}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><div className="text-sm font-semibold">AURA memory recall</div></div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="rounded-lg border border-border bg-muted/30 p-3"><span className="text-[10px] uppercase tracking-wider text-muted-foreground">2 weeks ago</span><div className="mt-0.5">You asked whether to prepay ₹5L on the home loan.</div></li>
              <li className="rounded-lg border border-border bg-muted/30 p-3"><span className="text-[10px] uppercase tracking-wider text-muted-foreground">Last week</span><div className="mt-0.5">You explored a Europe vacation feasibility.</div></li>
              <li className="rounded-lg border border-border bg-muted/30 p-3"><span className="text-[10px] uppercase tracking-wider text-muted-foreground">Yesterday</span><div className="mt-0.5">You compared SIP step-up 10% vs 15%.</div></li>
            </ul>
            <div className="mt-3 rounded-xl bg-brand-soft/40 p-3 text-xs text-primary">Continuity: AURA carries context across sessions — no need to re-explain your situation.</div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">Filter</div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {["All","Credits","Debits","AI Insights","Milestones","Nudges"].map((f) => (
                <button key={f} className="rounded-full border border-border bg-muted/40 px-3 py-1.5 hover:bg-brand-soft hover:text-primary">{f}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
