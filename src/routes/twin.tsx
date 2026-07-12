import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppShell, PageHeader } from "@/components/AppShell";
import { customer, netWorthTrend, cashFlow, formatINR, healthScore, goals, netWorth } from "@/lib/mockData";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart, Legend } from "recharts";
import { Activity, Brain, ShieldCheck, TrendingUp, AlertTriangle, Sparkles, HeartPulse, Wallet } from "lucide-react";

export const Route = createFileRoute("/twin")({
  component: Twin,
});

function Twin() {
  // Projections derived from actual data — 20 years forward
  const monthlySavings = cashFlow.reduce((a, c) => a + c.savings, 0) / cashFlow.length;
  const growthRate = 0.115; // blended
  const years = 20;
  const projection = Array.from({ length: years + 1 }, (_, y) => {
    const inv = netWorth.investments * Math.pow(1 + growthRate, y) + monthlySavings * 12 * (((Math.pow(1 + growthRate, y) - 1) / growthRate) || 0);
    const cash = netWorth.cash * Math.pow(1.055, y);
    const realEstate = netWorth.realEstate * Math.pow(1.07, y);
    const liab = Math.max(0, netWorth.liabilities - y * 180000);
    return {
      year: `+${y}y`,
      investments: Math.round(inv),
      cash: Math.round(cash),
      realEstate: Math.round(realEstate),
      liabilities: Math.round(liab),
      netWorth: Math.round(inv + cash + realEstate - liab),
    };
  });

  const timeline = [
    { at: "Today", label: "Financial snapshot captured", tone: "brand" },
    { at: "+3 mo", label: "Emergency fund crosses ₹6L milestone", tone: "success" },
    { at: "+8 mo", label: "Europe vacation goal fully funded", tone: "success" },
    { at: "+2.5 y", label: "House-upgrade down-payment ready (₹30L)", tone: "brand" },
    { at: "+9 y", label: "Aarav's education corpus at ₹52L", tone: "info" },
    { at: "+16 y", label: "Debt-free milestone — home loan closed", tone: "success" },
    { at: "+26 y", label: "Retirement corpus target ₹4 Cr reached", tone: "brand" },
  ];

  const risks = [
    { name: "Concentration Risk", value: 42, note: "62% in India equities. AURA suggests +12% international exposure." },
    { name: "Inflation Erosion", value: 28, note: "Real return post 5.5% CPI is 6.1%. Adequate but monitor." },
    { name: "Liquidity Shock", value: 18, note: "5.8-month cushion vs 6-month target — 3.5% gap." },
    { name: "Income Concentration", value: 55, note: "100% salary dependence. Consider passive income stream." },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Financial Twin"
        subtitle="A continuously-updated digital model of your financial life · Last sync 2 min ago"
        right={
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-brand-soft px-3 py-1.5 text-xs font-medium text-primary">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span>
            Twin is live · 12,482 signals ingested
          </span>
        }
      />

      {/* Top vitals */}
      <div className="grid gap-4 md:grid-cols-4">
        <Vital icon={<HeartPulse className="h-4 w-4" />} label="Financial Stability" value={`${healthScore.score}/100`} note="Top 12% of peers" tone="success" />
        <Vital icon={<ShieldCheck className="h-4 w-4" />} label="Emergency Readiness" value="5.8 mo" note="Target 6.0 mo · 96% ready" tone="brand" />
        <Vital icon={<Wallet className="h-4 w-4" />} label="Free Cash Flow" value={formatINR(monthlySavings)} note="10-mo rolling average" tone="info" />
        <Vital icon={<TrendingUp className="h-4 w-4" />} label="Projected Net Worth (+10y)" value={formatINR(projection[10].netWorth)} note="Base scenario · 11.5% CAGR" tone="brand" />
      </div>

      {/* Snapshot + Timeline */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Net-worth trajectory · Twin projection</div>
              <div className="text-xs text-muted-foreground">Historic 10 months + 20-year forward model</div>
            </div>
            <div className="text-xs text-muted-foreground">Confidence <span className="text-success font-semibold">High · 91%</span></div>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <AreaChart data={[
                ...netWorthTrend.map((n) => ({ year: n.month, netWorth: n.value })),
                ...projection.slice(1).map((p) => ({ year: p.year, netWorth: p.netWorth })),
              ]}>
                <defs>
                  <linearGradient id="tw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="1" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickFormatter={(v: number) => formatINR(v).replace("₹", "")} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => formatINR(v)} />
                <Area type="monotone" dataKey="netWorth" stroke="var(--primary)" strokeWidth={2} fill="url(#tw)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Mini k="Today" v={formatINR(netWorth.total)} />
            <Mini k="+10 yrs" v={formatINR(projection[10].netWorth)} />
            <Mini k="+20 yrs" v={formatINR(projection[20].netWorth)} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <div className="text-sm font-semibold">Life-event predictions</div>
          </div>
          <div className="mt-4 relative pl-5">
            <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
            {timeline.map((t, i) => (
              <motion.div
                key={t.at}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative mb-3 rounded-lg border border-border bg-muted/30 p-3"
              >
                <span className={`absolute -left-[13px] top-4 grid h-3 w-3 place-items-center rounded-full ring-4 ring-background ${t.tone === "success" ? "bg-success" : t.tone === "info" ? "bg-info" : "bg-primary"}`} />
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.at}</div>
                <div className="mt-0.5 text-sm font-medium">{t.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Projections and risks */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-sm font-semibold">Component projection · 20-year</div>
          <div className="text-xs text-muted-foreground">Twin model separates growth of investments, cash, real-estate and debt payoff.</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <LineChart data={projection}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickFormatter={(v: number) => formatINR(v).replace("₹", "")} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => formatINR(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="investments" stroke="var(--primary)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="realEstate" stroke="var(--success)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cash" stroke="var(--info)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="liabilities" stroke="var(--warning)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /><div className="text-sm font-semibold">Risk exposure surface</div></div>
          <div className="mt-4 space-y-3">
            {risks.map((r) => (
              <div key={r.name} className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{r.name}</span>
                  <span className={`text-xs font-semibold ${r.value > 50 ? "text-warning" : r.value > 30 ? "text-info" : "text-success"}`}>{r.value}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full ${r.value > 50 ? "bg-warning" : r.value > 30 ? "bg-info" : "bg-success"}`} style={{ width: `${r.value}%` }} />
                </div>
                <div className="mt-1.5 text-xs text-muted-foreground">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal alignment strip */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><div className="text-sm font-semibold">Goal alignment · Twin verdict</div></div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.current / g.target) * 100));
            return (
              <div key={g.id} className="rounded-xl border border-border bg-muted/30 p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{g.deadline}</div>
                <div className="mt-0.5 text-sm font-semibold truncate">{g.name}</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full ${g.on_track ? "bg-success" : "bg-warning"}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{pct}% · {g.on_track ? "On track" : "At risk"}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 rounded-xl bg-brand-soft/40 p-4 text-sm text-primary">
          <span className="font-semibold">Twin says:</span> {customer.name.split(" ")[0]}, 4 of 5 goals are on track. The Twin flags Europe Vacation as at-risk — reallocating ₹8,500/mo from dining converts it to on-track with 87% probability, without touching any other goal.
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2"><Brain className="h-4 w-4 text-primary" /><div className="text-sm font-semibold">How the Twin thinks</div></div>
        <ol className="mt-3 grid gap-2 text-sm md:grid-cols-2">
          {["Ingest new transaction","Update behaviour vectors","Recompute cash-flow forecast","Re-score financial health","Re-run Monte-Carlo (10k paths)","Realign goal probabilities","Refresh risk surface","Emit proactive nudge if delta > threshold"].map((s, i) => (
            <li key={s} className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </AppShell>
  );
}

function Vital({ icon, label, value, note, tone }: { icon: React.ReactNode; label: string; value: string; note: string; tone: "brand" | "success" | "info" }) {
  const tones = { brand: "text-primary", success: "text-success", info: "text-info" } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className={`flex items-center gap-2 text-xs uppercase tracking-wider ${tones[tone]}`}>{icon}<span>{label}</span></div>
      <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{note}</div>
    </div>
  );
}
function Mini({ k, v }: { k: string; v: string }) {
  return <div className="rounded-lg border border-border bg-muted/30 p-2.5"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div><div className="mt-0.5 text-sm font-semibold tabular-nums">{v}</div></div>;
}
