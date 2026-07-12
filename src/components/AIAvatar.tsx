import { AnimatePresence, motion } from "framer-motion";
import { Mic, Send, Sparkles, X, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAura } from "@/lib/store";
import { customer, insights, healthScore, goals, portfolio, formatINR } from "@/lib/mockData";

type Msg = { role: "user" | "aura"; text: string; ts: number };

const suggestions = [
  "Should I buy a car worth ₹12L?",
  "Can I afford a Europe vacation?",
  "How much SIP should I run?",
  "Best investment for me right now?",
  "Why did my score drop?",
  "Explain my expenses this month.",
];

function auraReply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("car")) {
    return `Based on your cash flow — ₹${(customer.salary / 1000).toFixed(0)}k/mo income, ₹32,500 EMI already committed, and a ${healthScore.score}/100 health score — a ₹12L car on a 5-year loan at 9.6% adds an EMI of ~₹25,240. That pushes your debt-to-income to 31%, still safe. However, it would delay your "House Upgrade" goal by 7 months. I'd recommend waiting till Q2 2026 or capping the on-road price at ₹9.5L.`;
  }
  if (t.includes("vacation") || t.includes("europe")) {
    const g = goals.find((g) => g.name.includes("Europe"))!;
    return `Your "Europe Family Vacation" goal is at ${formatINR(g.current)} of ${formatINR(g.target)}. At the current ₹25,000/mo run-rate you reach 82% by the July 2026 target — a ₹81,000 shortfall. Options: (1) step-up monthly by ₹9,500, (2) redirect the FD interest payout in March, or (3) shift by 6 weeks. Want me to auto-configure option 1?`;
  }
  if (t.includes("sip")) {
    return `Given your ₹88,500 monthly surplus and moderate-aggressive risk profile, an optimal SIP mix is ₹42,000 equity + ₹18,000 debt + ₹6,000 gold = ₹66,000/mo. You currently run ₹25,000. Stepping up by ₹15k in Jan and ₹15k in April keeps your emergency buffer intact.`;
  }
  if (t.includes("invest") || t.includes("best")) {
    return `Right now I'd rank: (1) Parag Parikh Flexi Cap — diversification into US equities, (2) SGB 2026-I — inflation hedge, (3) IDBI 555-day FD at 7.55% for the emergency overflow. Your portfolio is India-heavy at 91%; the flexi-cap fixes that in one instrument.`;
  }
  if (t.includes("score") || t.includes("drop") || t.includes("decreas")) {
    return `Your score is ${healthScore.score}/100 — actually up 2 points this month. The two soft spots are Cash Flow Stability (81) due to October's ₹18,400 travel spike, and Investment Diversification (84) because 91% of equity is India-only. Fix either and you cross 90.`;
  }
  if (t.includes("expense") || t.includes("spend")) {
    return `November spend is ₹96,500. Top movers vs 6-mo average: Dining +34% (₹11,800), Utilities +28% (₹4,820 electricity), Subscriptions +65% (Cult Fit annual renewal). Groceries and transport are flat. Net savings of ${formatINR(88500)} for the month — on track.`;
  }
  return `I've reviewed your finances, ${customer.name.split(" ")[0]}. Your health score is ${healthScore.score}/100 and net worth ${formatINR(6052970)}. ${insights[0].detail} Ask me anything specific — car purchase, vacation planning, SIP sizing, or portfolio rebalancing.`;
}

export function AIAvatar() {
  const open = useAura((s) => s.avatarOpen);
  const setOpen = useAura((s) => s.setAvatarOpen);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "aura",
      text: `Good morning, ${customer.name.split(" ")[0]}. I analyzed your finances — you're doing well. I noticed your restaurant spending increased by 28% this month. If maintained, your Europe vacation goal will be delayed by two months. I've prepared personalized recommendations.`,
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(q?: string) {
    const text = (q ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text, ts: Date.now() }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "aura", text: auraReply(text), ts: Date.now() }]);
    }, 650);
  }

  return (
    <>
      {/* Floating avatar bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full gradient-brand text-white shadow-elegant transition-transform hover:scale-105"
        aria-label="Open AURA"
      >
        <Sparkles className="h-6 w-6" />
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 flex h-[600px] w-[420px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
          >
            {/* Header with avatar */}
            <div className="relative overflow-hidden">
              <div className="gradient-brand absolute inset-0" />
              <div className="relative flex items-start gap-3 p-5 text-white">
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-white/15 ring-2 ring-white/30 backdrop-blur">
                    <span className="text-2xl font-semibold">AU</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-success" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">AURA</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/70">Your AI Wealth Advisor</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/80">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                    Listening · Voice ready
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-brand-soft/40 to-transparent p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === "user" ? "gradient-brand text-white" : "border border-border bg-card text-foreground"
                    }`}
                  >
                    {m.role === "aura" && (
                      <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-primary/80">
                        <Volume2 className="h-3 w-3" /> AURA
                      </div>
                    )}
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="hide-scrollbar flex gap-2 overflow-x-auto border-t border-border bg-muted/40 px-3 py-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-brand-soft hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Composer */}
            <div className="flex items-center gap-2 border-t border-border bg-card p-3">
              <button className="rounded-full p-2 text-muted-foreground hover:bg-muted" aria-label="Voice">
                <Mic className="h-4 w-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask AURA about your money…"
                className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-2 text-[13px] outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:bg-card"
              />
              <button onClick={() => send()} className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-white" aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Reference used to avoid tree-shaking of imports the chat pulls in.
export const _portfolio = portfolio;
