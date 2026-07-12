import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend } from "recharts";
import { ArrowDownRight, ArrowUpRight, Sparkles, Wallet, CreditCard, Landmark, PiggyBank, Target as TargetIcon, ChevronRight, TrendingUp, Zap } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { customer, accounts, cashFlow, expenseBreakdown, portfolio, healthScore, netWorthTrend, insights, goals, upcomingBills, formatINR, netWorth } from "@/lib/mockData";
import { useAura } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const openAvatar = useAura((s) => s.setAvatarOpen);
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <AppShell>
      <PageHeader
        title={`Good morning, ${customer.name.split(" ")[0]}`}
        subtitle={`Priority Banking · Customer since ${customer.customerSince} · ${customer.city}`}
        right={
          <button onClick={() => openAvatar(true)} className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-elegant">
            <Sparkles className="h-4 w-4" /> Ask AURA
          </button>
        }
      />

      {/* Top summary */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Wallet} tint="brand" label="Total Balance" value={formatINR(totalBalance)} delta="+2.4%" positive hint="Across 3 accounts" />
        <StatCard icon={ArrowUpRight} tint="success" label="Monthly Income" value={formatINR(customer.salary)} delta="On-time" positive hint="Salary credit · 1 Nov" />
        <StatCard icon={ArrowDownRight} tint="warning" label="Monthly Expenses" value={formatINR(customer.monthlyExpenses)} delta="+8.2%" hint="Above 6-mo avg" />
        <StatCard icon={PiggyBank} tint="info" label="Net Savings" value={formatINR(88500)} delta="47%" positive hint="Of income · Excellent" />
      </div>

      {/* Row: Health + Net worth trend */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Health score */}
        <Link to="/health" className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Financial Health</div>
                <div className="mt-1 text-sm text-muted-foreground">AI-calculated across 8 signals</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
            <div className="mt-6 flex items-center gap-6">
              <ScoreDial value={healthScore.score} />
              <div>
                <div className="text-4xl font-semibold tracking-tight">{healthScore.score}<span className="text-lg text-muted-foreground">/100</span></div>
                <div className="mt-1 text-sm font-medium text-success">{healthScore.label}</div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-success" /> +2 vs last month
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Net worth */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Net Worth</div>
              <div className="mt-1 text-3xl font-semibold tracking-tight">{formatINR(netWorth.total)}</div>
              <div className="mt-1 text-xs text-success">+₹1.34 L this month · +2.3%</div>
            </div>
            <div className="hidden gap-3 text-right text-xs md:flex">
              <Mini k="Assets" v={formatINR(netWorth.cash + netWorth.investments + netWorth.fd + netWorth.realEstate)} />
              <Mini k="Liabilities" v={formatINR(-netWorth.liabilities)} negative />
            </div>
          </div>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netWorthTrend}>
                <defs>
                  <linearGradient id="nw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis hide domain={["dataMin - 100000", "dataMax + 100000"]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatINR(v)} />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2.2} fill="url(#nw)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row: Cash flow + Portfolio */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Cash Flow</div>
              <div className="text-xs text-muted-foreground">Income vs. expenses · last 10 months</div>
            </div>
            <div className="flex gap-4 text-xs">
              <Legendish color="var(--chart-1)" label="Income" />
              <Legendish color="var(--chart-5)" label="Expenses" />
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlow} barCategoryGap={18}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatINR(v)} />
                <Bar dataKey="income" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={22} />
                <Bar dataKey="expenses" fill="var(--chart-5)" radius={[6, 6, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Portfolio</div>
              <div className="text-xs text-muted-foreground">Allocation · {formatINR(portfolio.reduce((s, p) => s + p.value, 0))}</div>
            </div>
            <Link to="/investments" className="text-xs text-primary hover:underline">Details →</Link>
          </div>
          <div className="mt-2 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={portfolio} dataKey="value" innerRadius={45} outerRadius={72} paddingAngle={3} strokeWidth={0}>
                  {portfolio.map((p, i) => <Cell key={i} fill={p.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatINR(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5">
            {portfolio.map((p) => (
              <li key={p.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: p.color }} />{p.name}</span>
                <span className="tabular-nums text-muted-foreground">{formatINR(p.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row: Expense breakdown + Insights + Goals */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Expense Breakdown</div>
            <Link to="/insights" className="text-xs text-primary hover:underline">Insights →</Link>
          </div>
          <div className="mt-3 space-y-2">
            {expenseBreakdown.slice(0, 6).map((e) => {
              const total = expenseBreakdown.reduce((s, x) => s + x.value, 0);
              const pct = (e.value / total) * 100;
              return (
                <div key={e.name}>
                  <div className="flex justify-between text-xs">
                    <span>{e.name}</span>
                    <span className="tabular-nums text-muted-foreground">{formatINR(e.value)}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: e.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Recent AI Insights</div>
            <Link to="/insights" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <ul className="mt-3 space-y-3">
            {insights.slice(0, 3).map((i) => (
              <li key={i.id} className="rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                  <span className={`h-1.5 w-1.5 rounded-full ${i.severity === "warning" ? "bg-warning" : i.severity === "success" ? "bg-success" : "bg-info"}`} />
                  <span className="text-muted-foreground">{i.severity}</span>
                </div>
                <div className="mt-1 text-sm font-medium">{i.title}</div>
                <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{i.detail}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Upcoming Goals</div>
            <Link to="/goals" className="text-xs text-primary hover:underline">Plan →</Link>
          </div>
          <ul className="mt-3 space-y-4">
            {goals.slice(0, 3).map((g) => {
              const pct = Math.round((g.current / g.target) * 100);
              return (
                <li key={g.id}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2"><TargetIcon className="h-3.5 w-3.5 text-primary" />{g.name}</div>
                    <span className="text-xs text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${g.on_track ? "bg-success" : "bg-warning"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                    <span>{formatINR(g.current)} of {formatINR(g.target)}</span>
                    <span>{g.deadline}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Row: Bills + Quick actions */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Upcoming Bills & EMIs</div>
            <span className="text-xs text-muted-foreground">Next 30 days</span>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {upcomingBills.map((b) => (
              <li key={b.name} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-primary">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{b.name}</div>
                    <div className="text-[11px] text-muted-foreground">Due {b.due} · {b.auto ? "Auto-debit" : "Manual"}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold tabular-nums">{formatINR(b.amount)}</div>
                  <div className={`text-[10px] uppercase tracking-wider ${b.auto ? "text-success" : "text-warning"}`}>{b.auto ? "Scheduled" : "Action needed"}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-sm font-semibold">Quick Actions</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { label: "Transfer", icon: ArrowUpRight, to: "/transactions" as const },
              { label: "Pay Bill", icon: CreditCard, to: "/transactions" as const },
              { label: "Start SIP", icon: TrendingUp, to: "/investments" as const },
              { label: "Book FD", icon: Landmark, to: "/investments" as const },
              { label: "Simulate", icon: Zap, to: "/simulator" as const },
              { label: "Ask AURA", icon: Sparkles, to: "/advisor" as const },
            ].map((a) => (
              <Link key={a.label} to={a.to} className="flex flex-col items-start gap-2 rounded-xl border border-border bg-muted/30 p-3 transition-colors hover:border-primary/40 hover:bg-brand-soft">
                <a.icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 12,
  boxShadow: "var(--shadow-card)",
} as const;

function Legendish({ color, label }: { color: string; label: string }) {
  return <span className="flex items-center gap-1.5 text-muted-foreground"><span className="h-2 w-2 rounded-full" style={{ background: color }} />{label}</span>;
}
function Mini({ k, v, negative }: { k: string; v: string; negative?: boolean }) {
  return <div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div><div className={`text-sm font-semibold ${negative ? "text-destructive" : ""}`}>{v}</div></div>;
}

function StatCard({ icon: Icon, tint, label, value, delta, positive, hint }: { icon: any; tint: string; label: string; value: string; delta: string; positive?: boolean; hint: string }) {
  const tintClasses: Record<string, string> = {
    brand: "bg-brand-soft text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning",
    info: "bg-info/15 text-info",
  };
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className={`grid h-9 w-9 place-items-center rounded-lg ${tintClasses[tint]}`}><Icon className="h-4 w-4" /></span>
        <span className={`text-xs font-medium ${positive ? "text-success" : "text-warning"}`}>{delta}</span>
      </div>
      <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
    </motion.div>
  );
}

function ScoreDial({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
      <circle cx="50" cy="50" r={r} stroke="var(--muted)" strokeWidth="8" fill="none" />
      <motion.circle
        cx="50" cy="50" r={r}
        stroke="url(#dial)" strokeWidth="8" fill="none" strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="dial" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.62 0.14 155)" />
          <stop offset="1" stopColor="oklch(0.55 0.15 260)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
