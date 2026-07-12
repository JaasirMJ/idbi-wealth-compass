import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  HeartPulse,
  Sparkles,
  Network,
  Receipt,
  Lightbulb,
  Target,
  TrendingUp,
  ShieldAlert,
  GitBranch,
  GraduationCap,
  FileBarChart,
  Settings,
  Bell,
  Search,
  LogOut,
  Cpu,
  Radar,
  History,
  Zap,
  Brain,
  Bot,
  BarChart3,
  PlugZap,
  ShieldCheck,
  PlayCircle,
} from "lucide-react";
import { AuraLogo } from "./AuraLogo";
import { AIAvatar } from "./AIAvatar";
import { customer } from "@/lib/mockData";

const nav = [
  { to: "/demo", label: "Demo Mode", icon: PlayCircle },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/twin", label: "Financial Twin", icon: Cpu },
  { to: "/health", label: "Financial Health", icon: HeartPulse },
  { to: "/advisor", label: "AI Advisor", icon: Sparkles },
  { to: "/agents", label: "AI Agents", icon: Bot },
  { to: "/reasoning", label: "AI Reasoning", icon: Brain },
  { to: "/pipeline", label: "AI Architecture", icon: Network },
  { to: "/actions", label: "Next Best Actions", icon: Zap },
  { to: "/forecast", label: "Forecast", icon: Radar },
  { to: "/timeline", label: "Timeline", icon: History },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/insights", label: "Spending Insights", icon: Lightbulb },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/investments", label: "Investments", icon: TrendingUp },
  { to: "/risk", label: "Risk Profile", icon: ShieldAlert },
  { to: "/simulator", label: "Scenario Simulator", icon: GitBranch },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/education", label: "Learn", icon: GraduationCap },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/executive", label: "Executive Impact", icon: BarChart3 },
  { to: "/sandbox", label: "Sandbox APIs", icon: PlugZap },
  { to: "/compliance", label: "Compliance", icon: ShieldCheck },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;


export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 z-30 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
          <div className="flex items-center gap-2 px-5 py-5">
            <AuraLogo className="h-8 w-8" />
            <div>
              <div className="text-[15px] font-semibold tracking-tight text-white">IDBI AURA</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-white/50">AI Relationship Advisor</div>
            </div>
          </div>
          <nav className="hide-scrollbar mt-2 flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
            {nav.map((item) => {
              const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-sidebar-accent text-white shadow-inner"
                      : "text-white/70 hover:bg-sidebar-accent/60 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" />}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-sidebar-border p-3">
            <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-white/70 hover:bg-sidebar-accent/60 hover:text-white">
              <LogOut className="h-4 w-4" /> Sign out
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-h-screen w-full min-w-0 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-4 px-5 lg:px-8">
              <div className="flex flex-1 items-center gap-3">
                <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground md:flex">
                  <Search className="h-4 w-4" />
                  <span>Ask AURA or search transactions…</span>
                  <kbd className="ml-6 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
                </div>
              </div>
              <button className="relative rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
              </button>
              <div className="flex items-center gap-3">
                <div className="hidden text-right md:block">
                  <div className="text-[13px] font-medium leading-tight">{customer.name}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{customer.segment}</div>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-sm font-semibold text-white">
                  {customer.name.split(" ").map((s) => s[0]).join("")}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
      <AIAvatar />
    </div>
  );
}

export function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
