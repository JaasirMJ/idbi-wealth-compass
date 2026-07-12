import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { motion } from "framer-motion";
import { Database, LayersIcon, Brain, ShieldAlert, Target, TrendingUp, Sparkles, Users, Activity, MessageSquare, ArrowDown } from "lucide-react";

export const Route = createFileRoute("/pipeline")({
  component: Pipeline,
});

const nodes = [
  { id: "src", label: "Customer Data", sub: "Core Banking · KYC · Transactions", icon: Users, color: "chart-2" },
  { id: "tx", label: "Transaction Engine", sub: "Streaming ingest · Kafka", icon: Activity, color: "chart-2" },
  { id: "cat", label: "AI Categorization", sub: "Gemini + merchant embeddings", icon: LayersIcon, color: "chart-1" },
  { id: "beh", label: "Behavior Analysis", sub: "Anomaly · Seasonality models", icon: Brain, color: "chart-1" },
  { id: "hea", label: "Financial Health Engine", sub: "8-signal weighted composite", icon: Sparkles, color: "chart-4" },
  { id: "for", label: "Forecast Engine", sub: "Cash-flow probabilistic sim", icon: TrendingUp, color: "chart-4" },
  { id: "goal", label: "Goal Engine", sub: "Monte-Carlo goal projection", icon: Target, color: "chart-4" },
  { id: "risk", label: "Risk Engine", sub: "Adaptive risk profiling", icon: ShieldAlert, color: "chart-5" },
  { id: "inv", label: "Investment Engine", sub: "Advisory + product recommender", icon: TrendingUp, color: "chart-3" },
  { id: "llm", label: "LLM Reasoning Layer", sub: "LangGraph · Prompt orchestration", icon: Brain, color: "chart-1" },
  { id: "avatar", label: "Avatar & Voice", sub: "TTS · Lip-sync · Multilingual", icon: MessageSquare, color: "chart-3" },
  { id: "reco", label: "Recommendations", sub: "Delivered to app · Nudges · Reports", icon: Sparkles, color: "chart-4" },
];

function Pipeline() {
  return (
    <AppShell>
      <PageHeader title="AI Architecture" subtitle="Live view of how AURA reasons about every customer" right={
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-success" /> 12 engines healthy · p95 latency 812ms
        </div>
      } />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
            {nodes.map((n, idx) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="relative rounded-xl border border-border bg-background/80 p-4 backdrop-blur"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-primary">
                    <n.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{n.label}</div>
                    <div className="text-[11px] text-muted-foreground">{n.sub}</div>
                  </div>
                </div>
                {/* animated pulse */}
                <span className="absolute right-2 top-2 flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                {idx < nodes.length - 1 && (idx + 1) % 3 !== 0 && (
                  <div className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block">
                    <FlowArrow />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Database className="h-3.5 w-3.5" /> Encrypted data path</span>
            <span className="flex items-center gap-1.5"><Brain className="h-3.5 w-3.5" /> Gemini-powered</span>
            <span className="flex items-center gap-1.5"><ArrowDown className="h-3.5 w-3.5" /> Async streaming</span>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Runtime</div>
            <div className="mt-3 space-y-3 text-sm">
              <Row k="Model" v="Gemini 1.5 Pro (Vertex)" />
              <Row k="Orchestration" v="LangGraph 0.4" />
              <Row k="Vector store" v="pgvector · PostgreSQL" />
              <Row k="Cache" v="Redis Sentinel (3 nodes)" />
              <Row k="Serving" v="FastAPI · 12 microservices" />
              <Row k="Compliance" v="RBI DPDP-ready · ISO 27001" />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="text-[11px] font-medium uppercase tracking-wider text-primary">SLOs</div>
            <div className="mt-3 space-y-3 text-sm">
              <Row k="p50 latency" v="342 ms" />
              <Row k="p95 latency" v="812 ms" />
              <Row k="Insight accuracy" v="93.8%" />
              <Row k="Uptime (30d)" v="99.982%" />
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function FlowArrow() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
      <motion.path
        d="M2 8 H20"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
      <path d="M18 4 L22 8 L18 12" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between text-sm"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;
}
