import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fingerprint, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AuraLogo } from "@/components/AuraLogo";
import { useAura } from "@/lib/store";

export const Route = createFileRoute("/auth")({
  component: Auth,
});

function Auth() {
  const nav = useNavigate();
  const setAuthed = useAura((s) => s.setAuthed);
  const [id, setId] = useState("rahul.sharma");
  const [pwd, setPwd] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setAuthed(true);
      nav({ to: "/loading" });
    }, 700);
  }

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden overflow-hidden lg:block">
        <div className="gradient-brand absolute inset-0" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0.5px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <AuraLogo className="h-9 w-9" />
            <div>
              <div className="text-sm font-semibold">IDBI AURA</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-white/60">AI Relationship Advisor</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">Innovate 2026</div>
            <h1 className="mt-3 max-w-md text-4xl font-semibold leading-tight tracking-tight">
              Banking that thinks with you — not just for you.
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/70">
              AURA connects your accounts, transactions, investments and goals into a single intelligent advisor. Enterprise-grade AI, RBI-ready security.
            </p>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-white/70">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> SOC 2 pattern</span>
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> AES-256 in transit</span>
            <span className="flex items-center gap-1.5"><Fingerprint className="h-3.5 w-3.5" /> Biometric ready</span>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <AuraLogo className="h-8 w-8" />
            <div className="text-sm font-semibold">IDBI AURA</div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back, Rahul</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Sign in with your IDBI NetBanking credentials.</p>

          <div className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer ID</span>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</span>
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg gradient-brand py-3 text-sm font-semibold text-white shadow-elegant disabled:opacity-70"
          >
            {loading ? "Authenticating…" : "Sign in securely"}
          </button>

          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 text-sm font-medium hover:bg-muted">
            <Fingerprint className="h-4 w-4" /> Continue with Biometrics
          </button>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            This is an IDBI Innovate 2026 prototype. No real credentials are stored.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
