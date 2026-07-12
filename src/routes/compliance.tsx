import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Activity, FileCheck2, KeyRound, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/compliance")({
  component: Compliance,
});

const badges = [
  { k: "RBI-Ready Architecture", d: "Deployment topology aligned with RBI IT framework · conceptual." },
  { k: "DPDP Consent", d: "Purpose-bound consent artefacts issued per interaction." },
  { k: "Explainable AI", d: "Every recommendation carries reasoning trace + confidence." },
  { k: "Privacy-First Design", d: "Only derived features leave the vault. Zero raw PII to AI layer." },
  { k: "Audit Logging", d: "Immutable audit trail on all reads/writes." },
  { k: "Secure Authentication", d: "OIDC + MFA · device binding · session anomaly detection." },
];

const observability = [
  { k: "API Health", v: "99.98%", d: "30-day rolling" },
  { k: "AI Response Time", v: "1.24s p50", d: "grounded reasoning" },
  { k: "Prediction Confidence", v: "0.87 avg", d: "last 10k inferences" },
  { k: "Recommendation Acceptance", v: "47.8%", d: "AURA cohort" },
  { k: "Model Usage", v: "12.4M calls", d: "MTD" },
  { k: "Daily Active Users", v: "184,220", d: "yesterday" },
];

function Compliance() {
  return (
    <AppShell>
      <PageHeader
        title="Compliance & Observability"
        subtitle="Enterprise controls, audit posture and platform telemetry"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {badges.map((b) => (
          <div key={b.k} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-soft text-primary"><ShieldCheck className="h-4 w-4" /></span>
              <div className="text-sm font-semibold">{b.k}</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{b.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 text-sm font-semibold"><Activity className="h-4 w-4 text-primary" /> Live platform telemetry</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {observability.map((o) => (
              <div key={o.k} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{o.k}</div>
                <div className="mt-1 text-xl font-semibold">{o.v}</div>
                <div className="text-[11px] text-muted-foreground">{o.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold"><KeyRound className="h-4 w-4 text-primary" /> Security posture</div>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>· JWT · short-lived · RS256</li>
              <li>· Role-based access · 4 tiers</li>
              <li>· AES-256 at-rest · mTLS in-transit</li>
              <li>· Device fingerprint + WebAuthn</li>
              <li>· Session anomaly scoring</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold"><FileCheck2 className="h-4 w-4 text-primary" /> Audit sample</div>
            <div className="mt-3 space-y-1 font-mono text-[11px] text-muted-foreground">
              <div>2025-11-14T09:12:04Z · READ  /customer         · uid=IDBI-8842 · ok</div>
              <div>2025-11-14T09:12:05Z · READ  /transactions     · uid=IDBI-8842 · ok · 1284 rows</div>
              <div>2025-11-14T09:12:06Z · CALL  /chat             · agent=Planner · trace=trc_9f42a1</div>
              <div>2025-11-14T09:12:07Z · WRITE /recommendations  · action=accept · rid=R1</div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold"><Lock className="h-4 w-4 text-primary" /> Data residency</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Customer financial data remains inside IDBI-controlled infrastructure. Only minimal derived context is
              forwarded to the AI reasoning layer, over mTLS, with reversible tokenisation.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
