import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { serviceRegistry } from "@/lib/services";
import { CheckCircle2, Lock, PlugZap } from "lucide-react";

export const Route = createFileRoute("/sandbox")({
  component: Sandbox,
});

const integrations = [
  { name: "Customer Profile API", provider: "IDBI Core Banking", version: "CBS v14.2", scope: "Read" },
  { name: "Accounts API", provider: "IDBI Core Banking", version: "CBS v14.2", scope: "Read" },
  { name: "Transaction API", provider: "IDBI Core Banking", version: "CBS v14.2", scope: "Read" },
  { name: "Investment API", provider: "IDBI Wealth Platform", version: "WMS v3.6", scope: "Read/Write" },
  { name: "Authentication", provider: "IDBI IAM", version: "OIDC 1.0", scope: "OAuth 2.0 + MFA" },
  { name: "Notification Service", provider: "IDBI Comms", version: "v2.1", scope: "Push · SMS · Email" },
  { name: "Document Service", provider: "IDBI DMS", version: "v1.8", scope: "Read" },
  { name: "Account Aggregator", provider: "Sahamati AA (planned)", version: "ReBIT AA 1.1.2", scope: "Consent-based" },
];

function Sandbox() {
  return (
    <AppShell>
      <PageHeader
        title="IDBI Sandbox Integrations"
        subtitle="Enterprise service registry and integration contracts — sandbox-ready"
        right={<span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-500"><CheckCircle2 className="h-3.5 w-3.5" /> Sandbox Ready</span>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><PlugZap className="h-4 w-4 text-primary" /> Bank integration surface</div>
          <div className="space-y-2">
            {integrations.map((i) => (
              <div key={i.name} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                <div>
                  <div className="text-sm font-medium">{i.name}</div>
                  <div className="text-[11px] text-muted-foreground">{i.provider} · {i.version} · {i.scope}</div>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">Mocked</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Lock className="h-4 w-4 text-primary" /> Internal service registry</div>
          <div className="space-y-2">
            {serviceRegistry.map((s) => (
              <div key={s.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">{s.endpoint} · {s.version}</div>
                </div>
                <span className="text-[11px] text-muted-foreground">{s.latency} ms p95</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(var(--chart-3))]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="text-sm font-semibold">Data residency & consent posture</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Customer financial data never leaves bank-controlled infrastructure. Only the minimum required context —
          derived features, not raw PII — is forwarded to the AI reasoning layer over an mTLS channel. All calls are
          logged in the Audit Service with reversible tokens. AURA aligns with RBI's aggregator framework, DPDP consent
          artefacts, and IDBI's internal Explainable-AI policy.
        </p>
      </div>
    </AppShell>
  );
}
