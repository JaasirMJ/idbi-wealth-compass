import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AlertTriangle, Bell, CheckCircle2, Info, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
});

type Priority = "Critical" | "High" | "Medium" | "Low";
const items: { p: Priority; t: string; b: string; when: string }[] = [
  { p: "Critical", t: "Emergency fund below 6-month target", b: "Current buffer covers 5.8 months. Sweep ₹58,000 from Savings to a 555-day FD to close the gap.", when: "2 hrs ago" },
  { p: "High", t: "Home Loan EMI due tomorrow · ₹32,500", b: "Auto-debit scheduled from Salary XXXX 9812. Sufficient balance verified.", when: "9 hrs ago" },
  { p: "High", t: "Portfolio drift · India equity 62%", b: "Concentration above target. Rebalance ₹80,000 into Parag Parikh Flexi Cap for geography spread.", when: "Today" },
  { p: "Medium", t: "Salary credited · ₹1,85,000", b: "TCS Payroll · NEFT · 01 Nov. SIP debits scheduled for 11 Nov.", when: "Nov 01" },
  { p: "Medium", t: "Dining spend up 34% MoM", b: "AURA suggests a ₹9,500 envelope with soft-block nudges at 80%.", when: "Yesterday" },
  { p: "Medium", t: "Investment opportunity · SGB Series 2026-I", b: "Issue opens 09 Dec. Aligns with your Hedge allocation gap.", when: "Yesterday" },
  { p: "Low", t: "3 idle subscriptions detected", b: "Prime Video, Cult Fit, Gaana — avg. use <2 sessions/mo. Pause 90 days?", when: "2 days ago" },
  { p: "Low", t: "Electricity bill 28% above cluster avg", b: "₹4,820 vs ₹3,760 for similar households. Consider an energy audit.", when: "3 days ago" },
];

const style: Record<Priority, { chip: string; icon: React.ComponentType<{ className?: string }> }> = {
  Critical: { chip: "border-destructive/30 bg-destructive/10 text-destructive", icon: AlertTriangle },
  High: { chip: "border-amber-500/30 bg-amber-500/10 text-amber-500", icon: TrendingUp },
  Medium: { chip: "border-primary/30 bg-brand-soft text-primary", icon: Info },
  Low: { chip: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500", icon: CheckCircle2 },
};

function Notifications() {
  return (
    <AppShell>
      <PageHeader
        title="Notification Center"
        subtitle="Prioritised, grounded alerts from the Notification Engine"
        right={<span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-brand-soft px-3 py-1.5 text-xs font-medium text-primary"><Bell className="h-3.5 w-3.5" /> 8 active</span>}
      />

      <div className="grid gap-4 md:grid-cols-4">
        {(["Critical", "High", "Medium", "Low"] as Priority[]).map((p) => (
          <div key={p} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{p}</div>
            <div className="mt-1 text-2xl font-semibold">{items.filter((i) => i.p === p).length}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {items.map((i, idx) => {
          const S = style[i.p];
          const Icon = S.icon;
          return (
            <div key={idx} className="grid grid-cols-[36px_1fr_auto] items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className={`grid h-9 w-9 place-items-center rounded-lg border ${S.chip}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${S.chip}`}>{i.p}</span>
                  <div className="text-sm font-semibold">{i.t}</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{i.b}</div>
              </div>
              <div className="text-[11px] text-muted-foreground">{i.when}</div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
