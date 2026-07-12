import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { motion } from "framer-motion";
import { Bot, Cpu, GitBranch, MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/agents")({
  component: Agents,
});

const agents = [
  { k: "Planner Agent", d: "Decomposes the user question into sub-tasks and picks downstream agents.", tool: "LangGraph · router" },
  { k: "Financial Analyst Agent", d: "Reads customer profile, net-worth, cash-flow stability.", tool: "customer-svc · twin" },
  { k: "Transaction Analyst Agent", d: "Categorises, dedupes and finds anomalies in transactions.", tool: "txn-svc · anomaly" },
  { k: "Goal Planner Agent", d: "Aligns advice with active goals, shortfalls and deadlines.", tool: "goals-svc · optimiser" },
  { k: "Investment Advisor Agent", d: "Ranks diversified strategies. Never recommends single stocks.", tool: "reco-engine" },
  { k: "Risk Assessment Agent", d: "Scores concentration, leverage and behavioural risk.", tool: "risk-svc" },
  { k: "Forecast Agent", d: "Monte-Carlo cash-flow and net-worth projections.", tool: "forecast-engine" },
  { k: "Education Agent", d: "Attaches relevant learning modules to build customer literacy.", tool: "learn-svc" },
  { k: "Report Generator Agent", d: "Composes monthly/yearly summaries with charts.", tool: "report-svc" },
  { k: "Conversation Agent", d: "Maintains AI Memory — goals mentioned, preferences, tone.", tool: "memory-store" },
  { k: "Avatar Agent", d: "Voice, tone, pacing. Renders final response to the customer.", tool: "tts · avatar" },
];

const flow = [
  "User Question",
  "Planner Agent",
  "Retrieve Customer Data",
  "Financial Twin",
  "Domain Agent(s)",
  "Reasoning",
  "Recommendation",
  "Explanation",
  "Avatar",
];

function Agents() {
  return (
    <AppShell>
      <PageHeader
        title="AI Multi-Agent System"
        subtitle="Specialised agents orchestrated in a LangGraph-style workflow — every response is grounded and traceable"
        right={<span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-brand-soft px-3 py-1.5 text-xs font-medium text-primary"><GitBranch className="h-3.5 w-3.5" /> Orchestration v0.8</span>}
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="text-sm font-semibold">Runtime workflow</div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {flow.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2"
            >
              <span className="rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium">{s}</span>
              {i < flow.length - 1 && <span className="text-muted-foreground">→</span>}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((a, i) => (
          <motion.div
            key={a.k}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-soft text-primary">
                <Bot className="h-4 w-4" />
              </span>
              <div className="text-sm font-semibold">{a.k}</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{a.d}</div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground">
              <Cpu className="h-3 w-3" /> {a.tool}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2 text-sm font-semibold"><MessagesSquare className="h-4 w-4 text-primary" /> AI Memory · what AURA remembers</div>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <li>· Active goals & shortfalls (5)</li>
          <li>· Previous advice & acceptance history</li>
          <li>· Investment preferences · risk tolerance</li>
          <li>· Language & tone preferences</li>
          <li>· Recent concerns raised in chat</li>
          <li>· Life events flagged on the timeline</li>
        </ul>
      </div>
    </AppShell>
  );
}
