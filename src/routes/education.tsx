import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { educationModules } from "@/lib/mockData";
import { GraduationCap, Play, Clock } from "lucide-react";

export const Route = createFileRoute("/education")({
  component: Education,
});

function Education() {
  return (
    <AppShell>
      <PageHeader title="Learn with AURA" subtitle="Bite-sized lessons personalized to your portfolio and behaviour" />

      <div className="mb-6 rounded-2xl border border-border bg-gradient-to-br from-brand-soft/60 to-transparent p-6">
        <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Suggested for you</div>
        <h3 className="mt-2 text-xl font-semibold">Home Loan Prepayment vs SIP Top-up</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Given your ₹28L outstanding home loan and 16.2% portfolio XIRR, the maths favours SIP over prepayment. This 11-min lesson walks through the exact break-even for your situation.</p>
        <button className="mt-4 inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-white"><Play className="h-4 w-4" /> Start lesson</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {educationModules.map((m) => (
          <div key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/30">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">{m.tag}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.level}</span>
            </div>
            <div className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-primary"><GraduationCap className="h-5 w-5" /></div>
            <div className="mt-3 text-base font-semibold">{m.title}</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {m.duration}</div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-2 text-xs font-semibold hover:bg-brand-soft hover:text-primary">
              <Play className="h-3 w-3" /> Watch
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
