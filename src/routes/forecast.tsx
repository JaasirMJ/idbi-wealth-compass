import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { cashFlow, expenseBreakdown, formatINR, upcomingBills, customer } from "@/lib/mockData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
import { Radar, Zap, CalendarClock } from "lucide-react";

export const Route = createFileRoute("/forecast")({
  component: Forecast,
});

function Forecast() {
  const avgExp = cashFlow.reduce((a, c) => a + c.expenses, 0) / cashFlow.length;
  const nextExpenses = Math.round(avgExp * 1.04);
  const nextSavings = 185000 - nextExpenses;

  const categoryForecast = expenseBreakdown.map((e, i) => ({
    name: e.name,
    now: e.value,
    predicted: Math.round(e.value * (1 + [0.04, 0.02, 0.11, -0.03, -0.08, 0.03, 0.14, 0.01][i % 8])),
  }));

  const confidences = [
    { k: "Next month expense", v: "High · 92%", note: "Based on 10-month stability + calendar seasonality." },
    { k: "Cash balance on 30 Dec", v: "High · 89%", note: "5 recurring credits + 12 scheduled debits modelled." },
    { k: "Emergency fund milestone", v: "Medium · 74%", note: "Depends on discretionary control over Dec/Jan." },
    { k: "Investment growth (12m)", v: "Medium · 68%", note: "Wide confidence — market volatility inputs." },
  ];

  return (
    <AppShell>
      <PageHeader title="Financial Forecast" subtitle="30- and 90-day predictions from your behavioural signature" right={
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><Radar className="h-3.5 w-3.5" /> Model v2.4 · retrained daily</span>
      } />

      <div className="grid gap-4 md:grid-cols-4">
        <Card k="Predicted Dec expenses" v={formatINR(nextExpenses)} note={`+${((nextExpenses/avgExp-1)*100).toFixed(1)}% vs avg`} tone="warning" />
        <Card k="Predicted Dec savings" v={formatINR(nextSavings)} note="After scheduled SIPs & EMIs" tone="success" />
        <Card k="Balance on payday" v={formatINR(48200)} note="Low — 3-day risk window" tone="warning" />
        <Card k="Investment growth (12m)" v="+₹1.86 L" note="Base case, 11.5% blended" tone="brand" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-sm font-semibold">Category-level forecast (next month)</div>
          <div className="text-xs text-muted-foreground">Green = AURA expects reduction · Amber = upward drift detected</div>
          <div className="mt-4 h-80">
            <ResponsiveContainer>
              <BarChart data={categoryForecast}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis tickFormatter={(v: number) => formatINR(v).replace("₹", "")} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => formatINR(v)} />
                <ReferenceLine y={0} stroke="var(--border)" />
                <Bar dataKey="now" fill="var(--muted)" radius={[4,4,0,0]} />
                <Bar dataKey="predicted" fill="var(--primary)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary" /><div className="text-sm font-semibold">Upcoming money movements</div></div>
          <ul className="mt-4 space-y-2 text-sm">
            {upcomingBills.map((b) => (
              <li key={b.name} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                <div>
                  <div className="font-medium">{b.name}</div>
                  <div className="text-xs text-muted-foreground">Due {b.due} · {b.auto ? "Auto debit" : "Manual"}</div>
                </div>
                <div className="text-sm font-semibold tabular-nums">{formatINR(b.amount)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl bg-brand-soft/40 p-3 text-xs text-primary">
            AURA notes an 82% chance the HDFC card statement will land near {formatINR(19200)} — ₹800 above your rolling 6-month average.
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /><div className="text-sm font-semibold">Prediction confidence & assumptions</div></div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {confidences.map((c) => (
            <div key={c.k} className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{c.k}</span>
                <span className="text-xs font-semibold text-primary">{c.v}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{c.note}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Assumptions: Salary credited on 1st, EMIs auto-debit on 5th, SIPs on 11th. CPI 5.5%. No lifestyle shock. Model considers {customer.name.split(" ")[0]}'s 36-month history.
        </div>
      </div>
    </AppShell>
  );
}

function Card({ k, v, note, tone }: { k: string; v: string; note: string; tone: "brand" | "success" | "warning" }) {
  const tones = { brand: "text-primary", success: "text-success", warning: "text-warning" } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className={`mt-1 text-2xl font-semibold tabular-nums ${tones[tone]}`}>{v}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{note}</div>
    </div>
  );
}
