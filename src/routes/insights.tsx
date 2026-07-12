import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { insights, expenseBreakdown, formatINR } from "@/lib/mockData";
import { Lightbulb, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/insights")({
  component: Insights,
});

const behavioural = [
  { title: "Weekend spend exceeds weekday", detail: "Saturday-Sunday average ₹4,120 vs weekday ₹2,140.", icon: TrendingUp },
  { title: "Cash withdrawals reduced 61%", detail: "You've moved decisively to UPI. Consider trimming ATM limits.", icon: TrendingDown },
  { title: "Shopping spikes before salary", detail: "62% of Amazon spend clusters in the 3 days before payday.", icon: AlertTriangle },
  { title: "Travel spend dropped 40%", detail: "Q3 travel down; freed cash flow available for goals.", icon: TrendingDown },
];

function Insights() {
  return (
    <AppShell>
      <PageHeader title="Spending Insights" subtitle="AURA generates behavioural observations continuously — not once a month." />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {insights.map((i) => (
            <div key={i.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2">
                <span className={`grid h-8 w-8 place-items-center rounded-lg ${i.severity === "warning" ? "bg-warning/20 text-warning" : i.severity === "success" ? "bg-success/15 text-success" : "bg-info/15 text-info"}`}>
                  <Lightbulb className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{i.severity}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.detail}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-primary">AURA recommendation</div>
                  <div className="mt-1 text-sm">{i.recommendation}</div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-success">Projected impact</div>
                  <div className="mt-1 text-sm">{i.impact}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="rounded-full gradient-brand px-4 py-1.5 text-xs font-semibold text-white">Apply suggestion</button>
                <button className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium">Snooze 7 days</button>
                <button className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium">Ask AURA why</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="text-sm font-semibold">This month's spend</div>
            <div className="text-xs text-muted-foreground">Total {formatINR(expenseBreakdown.reduce((s, e) => s + e.value, 0))}</div>
            <div className="mt-3 h-44">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={expenseBreakdown} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={2}>
                    {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => formatINR(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1 text-xs">
              {expenseBreakdown.map((e) => (
                <li key={e.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: e.color }} />{e.name}</span>
                  <span className="tabular-nums text-muted-foreground">{formatINR(e.value)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="text-sm font-semibold">Behavioural patterns</div>
            <ul className="mt-3 space-y-3">
              {behavioural.map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-primary"><b.icon className="h-4 w-4" /></span>
                  <div>
                    <div className="text-sm font-medium">{b.title}</div>
                    <div className="text-xs text-muted-foreground">{b.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
