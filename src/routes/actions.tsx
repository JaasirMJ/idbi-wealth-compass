import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { formatINR, customer } from "@/lib/mockData";
import { CheckCircle2, ArrowUpRight, Zap, ShieldCheck, PiggyBank, TrendingUp, CreditCard, Landmark } from "lucide-react";

export const Route = createFileRoute("/actions")({
  component: Actions,
});

const actions = [
  {
    id: "A1", pri: "Today", icon: PiggyBank,
    title: "Sweep ₹1.2L idle balance to Priority 555-day FD",
    why: "Your savings account is holding 3.4× your monthly buffer at 3.5% p.a. IDBI Priority FD yields 7.55% — a 4.05pp uplift.",
    impact: "+₹4,860 interest over 18 months",
    risk: "Very low · principal protected · DICGC insured up to ₹5L",
    time: "2 min",
    confidence: 94,
    tone: "brand",
  },
  {
    id: "A2", pri: "This week", icon: ShieldCheck,
    title: "Top-up term insurance from ₹75L to ₹2 Cr",
    why: "Single income household + ₹28L home loan + one dependent child. AURA calculates a 3.7× cover gap versus family expense replacement.",
    impact: "Family protected against income shock; premium ~₹1,450/mo (0.78% of salary)",
    risk: "Protective — no downside",
    time: "10 min",
    confidence: 91,
    tone: "success",
  },
  {
    id: "A3", pri: "This week", icon: CreditCard,
    title: "Pause 3 idle subscriptions (Prime, Cult Fit, Duolingo Plus)",
    why: "Trailing-90-day usage < 2 sessions/month. Renewal impact detected in AURA usage graph.",
    impact: "+₹4,197 saved this quarter · ₹16,788/yr",
    risk: "Reversible in 1-tap",
    time: "3 min",
    confidence: 88,
    tone: "warning",
  },
  {
    id: "A4", pri: "This month", icon: TrendingUp,
    title: "Step-up SIP by ₹5,000 into Parag Parikh Flexi Cap",
    why: "Discretionary savings up ₹9,200 over last 3 months. Portfolio is India-heavy; this fund adds ~35% international exposure.",
    impact: "Accelerates House Upgrade goal by 11 months · +₹18.4L to retirement corpus",
    risk: "Moderate · 5Y+ horizon",
    time: "2 min",
    confidence: 84,
    tone: "brand",
  },
  {
    id: "A5", pri: "This month", icon: Landmark,
    title: "Prepay ₹1L on home loan — Nov extra payment",
    why: "Interest savings on ₹28L outstanding at 8.6% exceed post-tax return on your idle savings balance.",
    impact: "Saves ₹1.14L in future interest · shortens tenure by 6 months",
    risk: "Reduces liquidity — AURA verified 6.1× emergency buffer remains",
    time: "5 min",
    confidence: 79,
    tone: "success",
  },
];

const tones: Record<string, string> = {
  brand: "border-primary/40 bg-brand-soft/40",
  success: "border-success/40 bg-success/10",
  warning: "border-warning/40 bg-warning/10",
};

function Actions() {
  return (
    <AppShell>
      <PageHeader title="Next Best Actions" subtitle={`AURA has ranked today's highest-impact moves for ${customer.name.split(" ")[0]}`}
        right={<span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><Zap className="h-3.5 w-3.5 text-primary" /> Recomputed after every transaction</span>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Kpi k="Actions queued" v="5" note="Ranked by expected impact × urgency" />
        <Kpi k="Estimated 12-mo value" v={formatINR(214000)} note="If all actions accepted" />
        <Kpi k="Combined execution time" v="22 min" note="One-tap approvals available" />
      </div>

      <div className="mt-6 space-y-4">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.id} className={`rounded-2xl border p-5 shadow-card ${tones[a.tone]}`}>
              <div className="flex flex-wrap items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 text-primary shadow-elegant">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">{a.pri}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence · {a.confidence}%</span>
                  </div>
                  <div className="mt-1.5 text-lg font-semibold">{a.title}</div>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <Row label="Why AURA suggests this" value={a.why} />
                    <Row label="Expected impact" value={a.impact} />
                    <Row label="Risk assessment" value={a.risk} />
                    <Row label="Time to execute" value={a.time} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-full gradient-brand px-4 py-2 text-xs font-semibold text-white shadow-elegant">Approve · one-tap <ArrowUpRight className="h-3.5 w-3.5" /></button>
                    <button className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium">See reasoning</button>
                    <button className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium">Snooze 7 days</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /><div className="text-sm font-semibold">Recently completed</div></div>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"><span>Enabled auto-sweep to Emergency Fund goal</span><span className="text-xs text-muted-foreground">Nov 8</span></li>
          <li className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"><span>Reduced ATM daily limit to ₹20,000 (fraud surface)</span><span className="text-xs text-muted-foreground">Nov 3</span></li>
          <li className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"><span>Enrolled in SIP step-up 8% p.a.</span><span className="text-xs text-muted-foreground">Oct 24</span></li>
        </ul>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-white/60 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
function Kpi({ k, v, note }: { k: string; v: string; note: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{v}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{note}</div>
    </div>
  );
}
