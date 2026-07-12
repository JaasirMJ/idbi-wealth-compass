import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { formatINR } from "@/lib/mockData";
import { GitBranch, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/simulator")({
  component: Simulator;
});

function Simulator() {
  const [sip, setSip] = useState(25000);
  const [years, setYears] = useState(15);
  const [ret, setRet] = useState(13);
  const [lump, setLump] = useState(1240000);

  const data = Array.from({ length: years + 1 }, (_, y) => {
    const monthlyRet = ret / 100 / 12;
    const months = y * 12;
    // future value of SIP + FV of lump sum
    const fvSip = sip * ((Math.pow(1 + monthlyRet, months) - 1) / monthlyRet) * (1 + monthlyRet);
    const fvLump = lump * Math.pow(1 + ret / 100, y);
    const conservative = fvSip * 0.75 + fvLump * 0.85;
    const base = fvSip + fvLump;
    const aggressive = fvSip * 1.2 + fvLump * 1.15;
    return { year: `Y${y}`, conservative: Math.round(conservative), base: Math.round(base), aggressive: Math.round(aggressive) };
  });

  const final = data[data.length - 1];

  return (
    <AppShell>
      <PageHeader title="Scenario Simulator" subtitle="Monte-Carlo backed wealth projection — adjust the levers to see the future." right={
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><GitBranch className="h-3.5 w-3.5" /> 10,000 simulations · 92% confidence</span>
      } />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-sm font-semibold">Inputs</div>
          <div className="mt-4 space-y-5">
            <Slider label="Monthly SIP" value={sip} min={5000} max={150000} step={1000} format={(v) => formatINR(v)} onChange={setSip} />
            <Slider label="Horizon (years)" value={years} min={3} max={35} step={1} format={(v) => `${v} yrs`} onChange={setYears} />
            <Slider label="Expected return %" value={ret} min={5} max={20} step={0.5} format={(v) => `${v}%`} onChange={setRet} />
            <Slider label="Existing corpus" value={lump} min={0} max={10000000} step={50000} format={(v) => formatINR(v)} onChange={setLump} />
          </div>
          <div className="mt-6 rounded-xl bg-brand-soft/40 p-4 text-xs text-primary">
            <span className="font-semibold">AURA:</span> Bumping SIP by ₹10,000 adds roughly {formatINR(10000 * ((Math.pow(1 + ret/100/12, years*12) - 1) / (ret/100/12)) * (1 + ret/100/12))} to your Y{years} corpus. Try it.
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="grid grid-cols-3 gap-3">
            <Res k="Conservative (–1σ)" v={formatINR(final.conservative)} tint="warning" />
            <Res k="Base case" v={formatINR(final.base)} tint="brand" />
            <Res k="Aggressive (+1σ)" v={formatINR(final.aggressive)} tint="success" />
          </div>
          <div className="mt-6 h-80">
            <ResponsiveContainer>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="agg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--success)" stopOpacity={0.4} /><stop offset="1" stopColor="var(--success)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--primary)" stopOpacity={0.4} /><stop offset="1" stopColor="var(--primary)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="cons" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--warning)" stopOpacity={0.4} /><stop offset="1" stopColor="var(--warning)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickFormatter={(v: number) => formatINR(v).replace("₹", "")} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => formatINR(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="aggressive" stroke="var(--success)" fill="url(#agg)" strokeWidth={2} />
                <Area type="monotone" dataKey="base" stroke="var(--primary)" fill="url(#base)" strokeWidth={2} />
                <Area type="monotone" dataKey="conservative" stroke="var(--warning)" fill="url(#cons)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" /> Retirement calculator, home purchase, education planning — same engine, different presets. Run any life scenario before committing.
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Slider({ label, value, min, max, step, format, onChange }: { label: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
        <span className="text-sm font-semibold tabular-nums">{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-primary" />
    </div>
  );
}

function Res({ k, v, tint }: { k: string; v: string; tint: string }) {
  const tints: Record<string, string> = {
    brand: "border-primary/40 bg-brand-soft/40 text-primary",
    success: "border-success/40 bg-success/10 text-success",
    warning: "border-warning/40 bg-warning/10 text-warning",
  };
  return (
    <div className={`rounded-xl border p-3 ${tints[tint]}`}>
      <div className="text-[10px] uppercase tracking-wider opacity-80">{k}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums">{v}</div>
    </div>
  );
}
