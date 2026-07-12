import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { customer, formatINR } from "@/lib/mockData";
import { Bell, Globe, Lock, Sparkles, Wallet } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Profile, security, notifications and AURA preferences" />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <nav className="rounded-2xl border border-border bg-card p-2 shadow-card lg:sticky lg:top-24 h-fit">
          {[
            { label: "Profile", icon: Wallet, active: true },
            { label: "Security", icon: Lock },
            { label: "Notifications", icon: Bell },
            { label: "AURA Preferences", icon: Sparkles },
            { label: "Language & Region", icon: Globe },
          ].map((n) => (
            <button key={n.label} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${n.active ? "bg-brand-soft text-primary" : "text-muted-foreground hover:bg-muted"}`}>
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">Customer profile</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Field k="Full name" v={customer.name} />
              <Field k="Customer ID" v={customer.id} />
              <Field k="Age" v={`${customer.age}`} />
              <Field k="Occupation" v={customer.occupation} />
              <Field k="Employer" v={customer.employer} />
              <Field k="Monthly salary" v={formatINR(customer.salary)} />
              <Field k="Family size" v={`${customer.familySize}`} />
              <Field k="Risk appetite" v={customer.riskAppetite} />
              <Field k="Credit score" v={`${customer.creditScore} · IDBI Priority`} />
              <Field k="PAN" v={customer.panMasked} />
              <Field k="Primary account" v={customer.accountMasked} />
              <Field k="Segment" v={customer.segment} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">AURA preferences</div>
            <div className="mt-4 space-y-3">
              <Toggle label="Proactive nudges" desc="Let AURA push insights when they matter." defaultOn />
              <Toggle label="Voice replies" desc="Play AURA's voice responses aloud." defaultOn />
              <Toggle label="Weekend spending guardrail" desc="Nudge at 80% of ₹9,500 dining envelope." />
              <Toggle label="Bi-weekly wealth summary" desc="Email a personalized wealth summary every other Sunday." defaultOn />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">Data & privacy</div>
            <p className="mt-2 text-xs text-muted-foreground">Your data stays inside IDBI's private cloud. AURA processes decisions with RBI-compliant explainability logs — you can request the reasoning trail for any recommendation.</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold">Export data</button>
              <button className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold">View audit trail</button>
              <button className="rounded-full border border-destructive/40 bg-destructive/10 px-4 py-1.5 text-xs font-semibold text-destructive">Pause AURA</button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="mt-1 text-sm font-medium">{v}</div>
    </div>
  );
}

function Toggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-muted/30 p-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <button onClick={() => setOn(!on)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted-foreground/30"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}
