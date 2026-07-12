// Mock service layer — simulates the enterprise microservice API surface.
// Every UI module reads through this layer so nothing is hardcoded in components.
// In production these would be REST calls to isolated services behind an API gateway.

import {
  customer,
  accounts,
  netWorth,
  portfolio,
  expenseBreakdown,
  cashFlow,
  netWorthTrend,
  savingsTrend,
  healthScore,
  transactions,
  insights,
  goals,
  recommendations,
  riskProfile,
  upcomingBills,
  educationModules,
} from "./mockData";

// Simulate network latency for realism
const wait = <T,>(v: T, ms = 120): Promise<T> =>
  new Promise((r) => setTimeout(() => r(v), ms));

export const api = {
  auth: {
    me: () => wait({ user: customer, token: "jwt.mock.****", roles: ["customer"] }),
    login: (email: string) => wait({ ok: true, email, session: "sess_9f2a" }),
    logout: () => wait({ ok: true }),
  },
  customer: {
    get: () => wait(customer),
  },
  accounts: {
    list: () => wait(accounts),
    netWorth: () => wait(netWorth),
  },
  transactions: {
    list: () => wait(transactions),
    byMonth: () => wait(cashFlow),
    byCategory: () => wait(expenseBreakdown),
  },
  investments: {
    portfolio: () => wait(portfolio),
    allocation: () => wait(riskProfile.allocation),
  },
  goals: {
    list: () => wait(goals),
  },
  twin: {
    get: () =>
      wait({
        netWorth,
        netWorthTrend,
        savingsTrend,
        healthScore: healthScore.score,
      }),
  },
  forecast: {
    get: () => wait(cashFlow.slice(-3)),
  },
  scenario: {
    simulate: (input: { sipDelta?: number; expenseDelta?: number }) =>
      wait({
        input,
        projectedNetWorth30Y: 40000000 + (input.sipDelta ?? 0) * 12 * 20,
      }),
  },
  recommendations: {
    list: () => wait(recommendations),
  },
  insights: {
    list: () => wait(insights),
  },
  risk: {
    profile: () => wait(riskProfile),
  },
  bills: {
    upcoming: () => wait(upcomingBills),
  },
  health: {
    get: () => wait(healthScore),
  },
  education: {
    modules: () => wait(educationModules),
  },
  chat: {
    send: (msg: string) =>
      wait({
        response: `AURA reasoning grounded on ${transactions.length} transactions, ${goals.length} goals.`,
        confidence: 0.87,
        query: msg,
      }),
  },
  reports: {
    monthly: () =>
      wait({ month: "Nov 2025", savings: 88500, spend: 96500, health: 87 }),
    yearly: () => wait({ year: 2025, savings: 1042000, xirr: 16.2 }),
  },
};

// Service registry — used by the sandbox integrations page.
export const serviceRegistry = [
  { name: "Authentication Service", endpoint: "/auth/*", status: "healthy", latency: 42, version: "v2.4.1" },
  { name: "Customer Profile Service", endpoint: "/customer/*", status: "healthy", latency: 61, version: "v3.1.0" },
  { name: "Accounts Service", endpoint: "/accounts/*", status: "healthy", latency: 58, version: "v2.9.3" },
  { name: "Transaction Service", endpoint: "/transactions/*", status: "healthy", latency: 74, version: "v4.2.0" },
  { name: "Investment Portfolio Service", endpoint: "/portfolio/*", status: "healthy", latency: 88, version: "v2.1.4" },
  { name: "Goals Service", endpoint: "/goals/*", status: "healthy", latency: 46, version: "v1.7.2" },
  { name: "Financial Twin Engine", endpoint: "/financial-twin", status: "healthy", latency: 142, version: "v0.9.1" },
  { name: "AI Orchestrator", endpoint: "/chat, /reasoning", status: "healthy", latency: 1240, version: "v0.8.0" },
  { name: "Forecast Engine", endpoint: "/forecast", status: "healthy", latency: 210, version: "v1.2.0" },
  { name: "Recommendation Engine", endpoint: "/recommendations", status: "healthy", latency: 168, version: "v2.0.1" },
  { name: "Notification Engine", endpoint: "/notifications", status: "healthy", latency: 38, version: "v1.4.0" },
  { name: "Report Generator", endpoint: "/reports/*", status: "healthy", latency: 320, version: "v1.1.0" },
  { name: "Analytics Engine", endpoint: "/analytics/*", status: "healthy", latency: 96, version: "v2.3.0" },
  { name: "Audit Service", endpoint: "/audit/*", status: "healthy", latency: 22, version: "v1.0.4" },
] as const;
