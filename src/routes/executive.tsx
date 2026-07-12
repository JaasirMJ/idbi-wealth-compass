import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Sparkles, Repeat, Clock, ShieldCheck, LineChart as LineIcon } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/executive")({
  component: Executive,
});

const kpis = [
  { k: "Monthly Active Users", v: "184,220", delta: "+12.4%", icon: Users },
  { k: "AI Recommendation Acceptance", v: "47.8%", delta: "+9.1 pts", icon: Sparkles },
  { k: "Investment Conversion", v: "₹412 Cr AUM lift", delta: "+18.6%", icon: TrendingUp },
  { k: "Financial Wellness Uplift", v: "+11.4 pts avg", delta: "6 mo cohort", icon: LineIcon },
  { k: "Goal Completion Rate", v: "68.2%", delta: "+14.7 pts", icon: Target },
  { k: "Cross-sell Opportunities", v: "2.3× baseline", delta: "AURA-driven", icon: Repeat },
  { k: "Customer Retention", v: "96.8%", delta: "+2.4 pts", icon: ShieldCheck },
  { k: "Avg. Session Duration", v: "6m 42s", delta: "+2m 18s", icon: Clock },
];

const engagement = [
  { m: "Jun", dau: 118000, ai: 26 },
  { m: "Jul", dau: 128000, ai: 31 },
  { m: "Aug", dau: 142000, ai: 36 },
  { m: "Sep", dau: 156000, ai: 40 },
  { m: "Oct", dau: 172000, ai: 44 },
  { m: "Nov", dau: 184220, ai: 47.8 },
];

const crossSell = [
  { p: "Mutual Funds", v: 32 },
  { p: "FD Top-up", v: 24 },
  { p: "Term Insurance", v: 18 },
  { p: "Health Cover", v: 12 },
  { p: "SGB", v: 9 },
  { p: "Home Loan Balance Transfer", v: 5 },
];

function Executive() {
  return (
    <AppShell>
      <PageHeader
        title="Executive Impact Dashboard"
        subtitle="Board-level view of AURA's contribution to customer wellness and bank economics"
        right={<span className="rounded-full border border-primary/30 bg-brand-soft px-3 py-1.5 text-xs font-medium text-primary">FY26 · YTD</span>}
      />

      <div className="grid gap-4 md:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={k.k}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k.k}</div>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{k.v}</div>
              <div className="mt-1 text-xs text-emerald-500">{k.delta}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-sm font-semibold">Engagement & AI acceptance trend</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <AreaChart data={engagement}>
                <defs>
                  <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Area type="monotone" dataKey="dau" stroke="hsl(var(--chart-1))" fill="url(#gd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-sm font-semibold">Cross-sell mix (AURA-attributed)</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={crossSell}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="p" stroke="hsl(var(--muted-foreground))" fontSize={11} interval={0} angle={-20} height={60} textAnchor="end" />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="v" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { h: "Customer Wellness", b: "Average financial health composite up 11.4 points over 6 months among AURA-active cohort." },
          { h: "Revenue Impact", b: "₹412 Cr new AUM and 2.3× cross-sell velocity attributed to AURA nudges." },
          { h: "Cost to Serve", b: "Avg. advisor-handoff rate reduced 38% via grounded AI reasoning and self-service." },
        ].map((c) => (
          <div key={c.h} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="text-[11px] uppercase tracking-wider text-primary">{c.h}</div>
            <div className="mt-2 text-sm">{c.b}</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
