import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { AuraLogo } from "@/components/AuraLogo";

export const Route = createFileRoute("/loading")({
  component: Loading,
});

const steps = [
  "Connecting to IDBI Core Banking API",
  "Fetching 24 months of transactions",
  "Categorizing 4,218 line items with LLM",
  "Running behavioural anomaly detection",
  "Calculating financial health score",
  "Simulating cash flow forecast",
  "Generating investment strategy",
  "Preparing your Wealth Advisor",
];

function Loading() {
  const nav = useNavigate();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= steps.length) {
      const t = setTimeout(() => nav({ to: "/dashboard" }), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((v) => v + 1), 520);
    return () => clearTimeout(t);
  }, [i, nav]);

  const progress = Math.min(100, Math.round((i / steps.length) * 100));

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2">
          <AuraLogo className="h-8 w-8" />
          <div>
            <div className="text-sm font-semibold">IDBI AURA</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Preparing your dashboard</div>
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Analyzing your financial profile…</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">This normally takes under a second in production. We slow it down here so you can see the pipeline in action.</p>

        <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full gradient-brand" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="mt-2 flex justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>Live pipeline</span><span>{progress}%</span>
        </div>

        <ul className="mt-8 space-y-2.5">
          {steps.map((s, idx) => {
            const done = idx < i;
            const active = idx === i;
            return (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className={`grid h-6 w-6 place-items-center rounded-full ${done ? "bg-success text-success-foreground" : active ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  {done ? <Check className="h-3.5 w-3.5" /> : active ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <span className="text-[10px]">{idx + 1}</span>}
                </span>
                <span className={done ? "text-muted-foreground line-through decoration-muted-foreground/30" : active ? "text-foreground" : "text-muted-foreground"}>{s}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
