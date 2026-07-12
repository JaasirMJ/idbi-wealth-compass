import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { goals, formatINR } from "@/lib/mockData";
import { Plus, Target as TargetIcon, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/goals")({
  component: Goals,
});

function Goals() {
  return (
    <AppShell>
      <PageHeader title="Goal Planning" subtitle="Monte-Carlo simulated · Success probability re-computed daily" right={
        <button className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-elegant"><Plus className="h-4 w-4" /> New goal</button>
      } />

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          const remaining = g.target - g.current;
          const probability = g.on_track ? 82 + Math.floor(Math.random() * 12) : 61;
          return (
            <div key={g.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-primary"><TargetIcon className="h-5 w-5" /></div>
                  <div>
                    <div className="text-base font-semibold">{g.name}</div>
                    <div className="text-xs text-muted-foreground">Target · {g.deadline}</div>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${g.on_track ? "bg-success/15 text-success" : "bg-warning/20 text-warning"}`}>
                  {g.on_track ? "On track" : "At risk"}
                </span>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-semibold tracking-tight tabular-nums">{formatINR(g.current)}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">of {formatINR(g.target)} · {pct}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Success probability</div>
                  <div className={`text-xl font-semibold ${g.on_track ? "text-success" : "text-warning"}`}>{probability}%</div>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${g.on_track ? "bg-success" : "bg-warning"}`} style={{ width: `${pct}%` }} />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <Kpi k="Monthly" v={formatINR(g.monthly)} />
                <Kpi k="Remaining" v={formatINR(remaining)} />
                <Kpi k="Months left" v={`${Math.max(1, Math.round(remaining / g.monthly))}`} />
              </div>

              <div className="mt-5 rounded-xl bg-brand-soft/40 p-3 text-xs text-primary">
                <span className="font-semibold">AURA:</span> {g.on_track
                  ? `Stepping up SIP by ₹${(g.monthly * 0.1).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} accelerates completion by ${Math.max(1, Math.round(remaining / (g.monthly * 12)))} months.`
                  : `You need +₹${Math.round(remaining / 6 - g.monthly)}/mo to reach target on time, or extend deadline by 2 months.`}
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-full gradient-brand py-2 text-xs font-semibold text-white">Auto-plan</button>
                <button className="flex-1 rounded-full border border-border bg-card py-2 text-xs font-medium">Simulate</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /><div className="text-sm font-semibold">Goal engine says</div></div>
        <p className="mt-2 text-sm text-muted-foreground">Your household has 5 active goals totalling ₹5.9 Cr. Current run-rate reaches 4 of 5 on time. Redirecting ₹8,500/mo from discretionary dining to your Europe vacation converts it from At-risk to On-track with 87% probability.</p>
      </div>
    </AppShell>
  );
}

function Kpi({ k, v }: { k: string; v: string }) {
  return <div className="rounded-lg border border-border bg-muted/30 p-2.5"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div><div className="mt-0.5 text-sm font-semibold tabular-nums">{v}</div></div>;
}
