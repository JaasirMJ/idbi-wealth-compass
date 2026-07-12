import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { healthScore } from "@/lib/mockData";
import { Check, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/health")({
  component: Health,
});

function Health() {
  const [selected, setSelected] = useState(healthScore.breakdown[0]);

  return (
    <AppShell>
      <PageHeader title="AI Financial Health" subtitle="Composite score of 8 weighted signals · Updated 2 min ago" />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="mx-auto flex flex-col items-center">
            <BigScore value={healthScore.score} />
            <div className="mt-5 text-lg font-semibold">{healthScore.label}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-success"><TrendingUp className="h-3.5 w-3.5" /> +2 vs last month</div>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <Row label="Percentile among peers" value="Top 12%" />
            <Row label="Trend (6m)" value="Improving" positive />
            <Row label="Volatility" value="Low" />
            <Row label="Model confidence" value="94%" />
          </div>
          <div className="mt-6 rounded-xl bg-brand-soft/50 p-4 text-xs text-primary">
            AURA continuously recomputes your score after every transaction. Signals are weighted by IDBI's proprietary Wealth Discipline Model v2.4.
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">Signal Breakdown</div>
            <div className="mt-1 text-xs text-muted-foreground">Click any signal to see AURA's explanation.</div>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {healthScore.breakdown.map((b) => {
                const active = selected.key === b.key;
                return (
                  <button
                    key={b.key}
                    onClick={() => setSelected(b)}
                    className={`rounded-xl border p-3 text-left transition-colors ${active ? "border-primary/50 bg-brand-soft" : "border-border bg-muted/30 hover:bg-muted/60"}`}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{b.key}</span>
                      <span className="text-xs text-muted-foreground">{b.value}/100</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${b.value}%` }}
                        transition={{ duration: 0.6 }}
                        className={`h-full ${b.value >= 85 ? "bg-success" : b.value >= 70 ? "bg-primary" : "bg-warning"}`}
                      />
                    </div>
                    <div className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">Weight · {b.weight}%</div>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div key={selected.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-[11px] font-medium uppercase tracking-wider text-primary">AURA explanation</div>
            <div className="mt-1 text-lg font-semibold">{selected.key}</div>
            <p className="mt-2 text-sm text-muted-foreground">{selected.insight}</p>
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              <Kpi k="Signal score" v={`${selected.value}/100`} />
              <Kpi k="Weight in composite" v={`${selected.weight}%`} />
              <Kpi k="Contribution" v={`+${Math.round((selected.value * selected.weight) / 100)} pts`} />
            </div>
            <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Check className="h-4 w-4 text-success" /> AURA recommendations</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>· Automate ₹5,000 monthly transfer to the Emergency Fund goal.</li>
                <li>· Enable weekend spending guardrail — nudge at 80% of envelope.</li>
                <li>· Move idle balance above ₹50k to Priority 555-day FD (7.55% p.a.).</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="flex justify-between border-b border-border/60 py-1.5 text-sm last:border-none">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${positive ? "text-success" : ""}`}>{value}</span>
    </div>
  );
}
function Kpi({ k, v }: { k: string; v: string }) {
  return <div className="rounded-lg border border-border bg-muted/30 p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div><div className="mt-0.5 text-sm font-semibold">{v}</div></div>;
}

function BigScore({ value }: { value: number }) {
  const r = 78;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative">
      <svg viewBox="0 0 200 200" className="h-52 w-52 -rotate-90">
        <circle cx="100" cy="100" r={r} stroke="var(--muted)" strokeWidth="14" fill="none" />
        <motion.circle
          cx="100" cy="100" r={r}
          stroke="url(#bigdial)" strokeWidth="14" fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="bigdial" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.62 0.14 155)" />
            <stop offset="1" stopColor="oklch(0.55 0.15 260)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-5xl font-semibold tracking-tight">{value}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">out of 100</div>
        </div>
      </div>
    </div>
  );
}
