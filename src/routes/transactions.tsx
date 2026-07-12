import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { transactions, formatINR } from "@/lib/mockData";
import { useState, useMemo } from "react";
import { Search, Filter, Sparkles, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export const Route = createFileRoute("/transactions")({
  component: Transactions,
});

const categories = ["All", "Dining", "Shopping", "Groceries", "Transport & Fuel", "Utilities", "Home Loan EMI", "Subscriptions", "Investment", "Salary", "Travel", "Insurance", "Health"];

function Transactions() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => transactions.filter((t) =>
    (cat === "All" || t.category === cat) &&
    (q === "" || t.merchant.toLowerCase().includes(q.toLowerCase()))
  ), [cat, q]);

  const totalIn = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);

  return (
    <AppShell>
      <PageHeader title="Transactions" subtitle="Auto-categorized by AURA · 4,218 transactions analyzed over 24 months" />

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Money in" value={formatINR(totalIn)} tint="success" icon={ArrowDownLeft} />
        <Stat label="Money out" value={formatINR(Math.abs(totalOut))} tint="warning" icon={ArrowUpRight} />
        <Stat label="Net" value={formatINR(totalIn + totalOut)} tint="brand" icon={Sparkles} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search merchant, location…" className="w-full bg-transparent outline-none" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Filter className="h-4 w-4" /> Category</div>
          <div className="hide-scrollbar flex max-w-full gap-1.5 overflow-x-auto">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${cat === c ? "bg-primary text-primary-foreground" : "border border-border bg-muted/40 text-muted-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Merchant</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                  <td className="px-4 py-3 font-medium">{t.merchant}</td>
                  <td className="px-4 py-3"><span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px]">{t.category}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{t.mode}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.location}</td>
                  <td className={`px-4 py-3 text-right font-semibold tabular-nums ${t.amount < 0 ? "text-foreground" : "text-success"}`}>
                    {t.amount < 0 ? "−" : "+"}{formatINR(Math.abs(t.amount))}
                  </td>
                  <td className="px-4 py-3">
                    {t.merchant === "MakeMyTrip" && <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-warning">Unusual</span>}
                    {t.merchant === "BESCOM" && <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-warning">+28% MoM</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border p-4 text-xs text-muted-foreground">
          Showing {filtered.length} transactions · AURA flagged {filtered.filter(t => t.merchant === "MakeMyTrip" || t.merchant === "BESCOM").length} for review.
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tint, icon: Icon }: { label: string; value: string; tint: string; icon: any }) {
  const tints: Record<string, string> = {
    brand: "bg-brand-soft text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning",
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className={`grid h-9 w-9 place-items-center rounded-lg ${tints[tint]}`}><Icon className="h-4 w-4" /></div>
      <div className="mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
