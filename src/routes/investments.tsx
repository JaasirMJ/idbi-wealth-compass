import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { portfolio, recommendations, formatINR } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/investments")({
  component: Investments,
});

const returns = [
  { m: "Feb", v: 8.2 }, { m: "Mar", v: 9.4 }, { m: "Apr", v: 10.1 }, { m: "May", v: 11.6 },
  { m: "Jun", v: 12.4 }, { m: "Jul", v: 13.8 }, { m: "Aug", v: 15.1 }, { m: "Sep", v: 15.6 },
  { m: "Oct", v: 16.0 }, { m: "Nov", v: 16.2 },
];

function Investments() {
  const total = portfolio.reduce((s, p) => s + p.value, 0);
  return (
    <AppShell>
      <PageHeader title="Investments" subtitle={`Portfolio value ${formatINR(total)} · XIRR 16.2% · Beating Nifty 500 by 2.4%`} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-sm font-semibold">Allocation</div>
          <div className="h-52">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={portfolio} dataKey="value" innerRadius={52} outerRadius={82} paddingAngle={2}>
                  {portfolio.map((p, i) => <Cell key={i} fill={p.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => formatINR(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-xs">
            {portfolio.map((p) => {
              const pct = ((p.value / total) * 100).toFixed(1);
              return (
                <li key={p.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: p.color }} />{p.name}</span>
                  <span className="tabular-nums text-muted-foreground">{formatINR(p.value)} · {pct}%</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Portfolio XIRR</div>
              <div className="text-xs text-muted-foreground">Rolling annualized return</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-success">16.2%</div>
              <div className="text-xs text-muted-foreground">Nifty 500: 13.8%</div>
            </div>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <LineChart data={returns}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => `${v}%`} />
                <Line type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.4} dot={{ r: 3, fill: "var(--primary)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-primary" /> AURA Investment Recommendations</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Curated for your Moderate-Aggressive profile · Updated today</div>
          </div>
          <span className="rounded-full bg-brand-soft px-3 py-1 text-[10px] font-semibold uppercase text-primary">5 recommendations</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {recommendations.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">{r.type}</span>
                  <div className="mt-2 text-base font-semibold">{r.name}</div>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">{r.tag}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <Chip k="Risk" v={r.risk} />
                <Chip k="Horizon" v={r.horizon} />
                <Chip k="Expected" v={r.expected} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{r.rationale}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm"><span className="text-muted-foreground">AURA suggests</span> <span className="font-semibold">{formatINR(r.amount)}</span>{r.type === "Mutual Fund" ? "/mo SIP" : ""}</div>
                <div className="flex gap-2">
                  <button className="rounded-full gradient-brand px-3 py-1.5 text-xs font-semibold text-white">Invest</button>
                  <button className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">Explain</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-brand-soft/30 p-4 text-sm text-primary">
        <TrendingUp className="h-4 w-4 shrink-0" />
        <span><span className="font-semibold">Rebalance nudge:</span> Your equity allocation is 39% vs recommended 55%. Redirecting the ₹100k idle balance into a diversified equity fund closes 60% of the gap in a single step.</span>
      </div>
    </AppShell>
  );
}

function Chip({ k, v }: { k: string; v: string }) {
  return <div className="rounded-lg bg-card p-2"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div><div className="mt-0.5 text-xs font-medium">{v}</div></div>;
}
