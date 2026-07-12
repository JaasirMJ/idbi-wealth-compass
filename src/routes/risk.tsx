import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { riskProfile } from "@/lib/mockData";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/risk")({
  component: Risk,
});

function Risk() {
  const radar = riskProfile.factors.map((f) => ({ subject: f.name, A: f.score }));
  return (
    <AppShell>
      <PageHeader title="Risk Profile" subtitle={`Adaptive risk score · ${riskProfile.label}`} />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Composite risk score</div>
          <div className="mt-3 flex items-end gap-3">
            <div className="text-5xl font-semibold tracking-tight">{riskProfile.score}</div>
            <div className="pb-1.5 text-sm text-muted-foreground">/ 100</div>
          </div>
          <div className="mt-1 text-sm font-medium">{riskProfile.label}</div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full gradient-brand" style={{ width: `${riskProfile.score}%` }} />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>Conservative</span><span>Aggressive</span>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer>
              <RadarChart data={radar} outerRadius={90}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <Radar dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.28} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">Risk factors</div>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {riskProfile.factors.map((f) => (
                <div key={f.name} className="rounded-xl border border-border bg-muted/30 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{f.name}</span>
                    <span className="text-xs text-muted-foreground">{f.score}/100</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${f.score}%`, background: f.score >= 80 ? "var(--success)" : f.score >= 60 ? "var(--primary)" : "var(--warning)" }} />
                  </div>
                  <div className="mt-1.5 text-[11px] text-muted-foreground">{f.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Allocation · Current vs Recommended</div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Current</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Recommended</span>
              </div>
            </div>
            <div className="mt-3 h-56">
              <ResponsiveContainer>
                <BarChart data={riskProfile.allocation} barCategoryGap={22}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="asset" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="current" fill="var(--primary)" radius={[6, 6, 0, 0]} maxBarSize={26} />
                  <Bar dataKey="recommended" fill="var(--success)" radius={[6, 6, 0, 0]} maxBarSize={26} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-border bg-brand-soft/40 p-4 text-sm text-primary">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span><span className="font-semibold">AURA:</span> You are under-allocated in equity by 16 points. Given your 26-year horizon this reduces expected retirement corpus by ~₹1.1 Cr. Consider a phased rebalance over 3 months to smooth timing risk.</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
