import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useAura } from "@/lib/store";
import { Sparkles, Mic, Volume2 } from "lucide-react";
import { customer, healthScore, insights } from "@/lib/mockData";

export const Route = createFileRoute("/advisor")({
  component: Advisor,
});

function Advisor() {
  const open = useAura((s) => s.setAvatarOpen);
  return (
    <AppShell>
      <PageHeader title="AURA — Your AI Advisor" subtitle="Voice-enabled conversational wealth manager" right={
        <button onClick={() => open(true)} className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-elegant"><Sparkles className="h-4 w-4" /> Open conversation</button>
      } />

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        {/* Avatar card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, oklch(0.6 0.14 250 / 0.2), transparent 40%), radial-gradient(circle at 90% 90%, oklch(0.7 0.15 78 / 0.15), transparent 40%)" }} />
          <div className="relative">
            <div className="mx-auto grid h-64 w-64 place-items-center rounded-full gradient-brand shadow-elegant">
              <div className="grid h-56 w-56 place-items-center rounded-full bg-gradient-to-br from-white/20 to-white/5 ring-2 ring-white/30 backdrop-blur">
                <span className="text-6xl font-semibold text-white">AU</span>
              </div>
              <span className="absolute bottom-2 right-6 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> LIVE
              </span>
            </div>
            <div className="mt-6 text-center">
              <div className="text-xl font-semibold">Advisor AURA</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Certified · IDBI Wealth Cloud</div>
              <div className="mt-4 flex justify-center gap-2">
                <button className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card"><Mic className="h-4 w-4" /></button>
                <button onClick={() => open(true)} className="rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white">Start conversation</button>
                <button className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card"><Volume2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-[11px] font-medium uppercase tracking-wider text-primary">AURA said this morning</div>
            <p className="mt-3 text-lg leading-relaxed">
              "Good morning, <span className="font-semibold">{customer.name.split(" ")[0]}</span>. I analyzed your finances — your health score is <span className="font-semibold">{healthScore.score}/100</span>. I noticed restaurant spending increased 28%. If maintained, your Europe vacation goal will slip by two months. I've prepared 4 personalized recommendations."
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Should I buy a car worth ₹12L?",
              "Can I afford a Europe vacation?",
              "How much SIP should I run?",
              "Best investment for me right now?",
              "Why did my health score change?",
              "Explain my expenses this month.",
            ].map((q) => (
              <button
                key={q}
                onClick={() => open(true)}
                className="rounded-xl border border-border bg-card p-4 text-left text-sm transition-colors hover:border-primary/40 hover:bg-brand-soft"
              >
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Try asking</div>
                <div className="mt-1 font-medium">{q}</div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">Insights AURA is tracking</div>
            <ul className="mt-3 space-y-2 text-sm">
              {insights.map((i) => (
                <li key={i.id} className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
                  <span className={`mt-1 h-2 w-2 rounded-full ${i.severity === "warning" ? "bg-warning" : i.severity === "success" ? "bg-success" : "bg-info"}`} />
                  <div>
                    <div className="font-medium">{i.title}</div>
                    <div className="text-xs text-muted-foreground">{i.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
