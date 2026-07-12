// Mock IDBI AURA financial data - realistic synthetic banking data
export const customer = {
  id: "IDBI-8842-2019",
  name: "Rahul Sharma",
  age: 34,
  occupation: "Senior Product Manager",
  employer: "Tata Consultancy Services",
  city: "Mumbai, MH",
  salary: 185000, // monthly
  savings: 842000,
  currentInvestments: 1240000,
  loans: 2800000, // home loan outstanding
  creditScore: 782,
  monthlyExpenses: 96500,
  familySize: 3,
  riskAppetite: "Moderate-Aggressive",
  preferredLanguage: "English",
  customerSince: "2019",
  segment: "Priority Banking",
  panMasked: "XXXXX1234K",
  accountMasked: "XXXX XXXX 4271",
};

export const accounts = [
  { type: "Savings", masked: "XXXX 4271", balance: 428750, ifsc: "IBKL0000103" },
  { type: "Salary", masked: "XXXX 9812", balance: 184220, ifsc: "IBKL0000103" },
  { type: "Fixed Deposit", masked: "FD 220034", balance: 500000, ifsc: "IBKL0000103" },
];

export const netWorth = {
  cash: 612970,
  investments: 1240000,
  fd: 500000,
  realEstate: 6500000,
  liabilities: 2800000,
  total: 6052970,
};

export const portfolio = [
  { name: "Mutual Funds", value: 620000, color: "var(--chart-1)" },
  { name: "Stocks", value: 340000, color: "var(--chart-2)" },
  { name: "FD", value: 500000, color: "var(--chart-3)" },
  { name: "Gold (SGB)", value: 180000, color: "var(--chart-4)" },
  { name: "Insurance", value: 100000, color: "var(--chart-5)" },
];

export const expenseBreakdown = [
  { name: "Home Loan EMI", value: 32500, color: "var(--chart-1)" },
  { name: "Groceries", value: 14200, color: "var(--chart-2)" },
  { name: "Dining", value: 11800, color: "var(--chart-5)" },
  { name: "Transport & Fuel", value: 8600, color: "var(--chart-3)" },
  { name: "Utilities", value: 6400, color: "var(--chart-4)" },
  { name: "Subscriptions", value: 3800, color: "var(--chart-2)" },
  { name: "Shopping", value: 12200, color: "var(--chart-5)" },
  { name: "Others", value: 7000, color: "var(--chart-3)" },
];

export const cashFlow = [
  { month: "Feb", income: 185000, expenses: 88400, savings: 96600 },
  { month: "Mar", income: 185000, expenses: 91200, savings: 93800 },
  { month: "Apr", income: 205000, expenses: 94100, savings: 110900 },
  { month: "May", income: 185000, expenses: 89700, savings: 95300 },
  { month: "Jun", income: 185000, expenses: 102400, savings: 82600 },
  { month: "Jul", income: 185000, expenses: 96500, savings: 88500 },
  { month: "Aug", income: 210000, expenses: 98200, savings: 111800 },
  { month: "Sep", income: 185000, expenses: 94300, savings: 90700 },
  { month: "Oct", income: 185000, expenses: 108900, savings: 76100 },
  { month: "Nov", income: 185000, expenses: 96500, savings: 88500 },
];

export const netWorthTrend = [
  { month: "Feb", value: 5320000 },
  { month: "Mar", value: 5418000 },
  { month: "Apr", value: 5532000 },
  { month: "May", value: 5641000 },
  { month: "Jun", value: 5720000 },
  { month: "Jul", value: 5812000 },
  { month: "Aug", value: 5904000 },
  { month: "Sep", value: 5972000 },
  { month: "Oct", value: 6008000 },
  { month: "Nov", value: 6052970 },
];

export const savingsTrend = cashFlow.map((c) => ({ month: c.month, savings: c.savings }));

export const healthScore = {
  score: 87,
  label: "Excellent Financial Discipline",
  breakdown: [
    { key: "Savings Ratio", value: 92, weight: 15, insight: "You save 47% of monthly income — well above the 30% benchmark." },
    { key: "Debt Ratio", value: 78, weight: 15, insight: "EMI-to-income at 17.5%. Healthy, under the 40% ceiling." },
    { key: "Investment Diversification", value: 84, weight: 12, insight: "5 asset classes. Consider adding international equity exposure." },
    { key: "Liquidity", value: 88, weight: 10, insight: "₹6.1L in accessible cash — 6.3× monthly expenses." },
    { key: "Emergency Fund", value: 82, weight: 12, insight: "Current fund covers 5.8 months. Target: 6 months." },
    { key: "Credit Behaviour", value: 95, weight: 12, insight: "CIBIL 782. Zero missed payments in 24 months." },
    { key: "Bill Payments", value: 96, weight: 8, insight: "100% on-time for the last 12 months." },
    { key: "Cash Flow Stability", value: 81, weight: 16, insight: "Slight variance from Oct discretionary spend. Trend improving." },
  ],
};

export const transactions = [
  { id: "T1042", date: "2025-11-14", merchant: "Swiggy", category: "Dining", amount: -742, mode: "UPI", location: "Mumbai" },
  { id: "T1041", date: "2025-11-14", merchant: "Amazon Pay", category: "Shopping", amount: -3499, mode: "UPI", location: "Online" },
  { id: "T1040", date: "2025-11-13", merchant: "IndianOil", category: "Transport & Fuel", amount: -2400, mode: "Card", location: "Andheri" },
  { id: "T1039", date: "2025-11-12", merchant: "Netflix", category: "Subscriptions", amount: -649, mode: "Auto Debit", location: "Online" },
  { id: "T1038", date: "2025-11-12", merchant: "Zomato", category: "Dining", amount: -1240, mode: "UPI", location: "Mumbai" },
  { id: "T1037", date: "2025-11-11", merchant: "HDFC MF SIP", category: "Investment", amount: -25000, mode: "Auto Debit", location: "—" },
  { id: "T1036", date: "2025-11-10", merchant: "Uber", category: "Transport & Fuel", amount: -388, mode: "UPI", location: "Mumbai" },
  { id: "T1035", date: "2025-11-10", merchant: "BESCOM", category: "Utilities", amount: -4820, mode: "NetBanking", location: "Mumbai" },
  { id: "T1034", date: "2025-11-08", merchant: "BigBasket", category: "Groceries", amount: -3820, mode: "UPI", location: "Online" },
  { id: "T1033", date: "2025-11-05", merchant: "HDFC Home Loan EMI", category: "Home Loan EMI", amount: -32500, mode: "Auto Debit", location: "—" },
  { id: "T1032", date: "2025-11-01", merchant: "TCS Payroll", category: "Salary", amount: 185000, mode: "NEFT", location: "—" },
  { id: "T1031", date: "2025-10-31", merchant: "MakeMyTrip", category: "Travel", amount: -18400, mode: "Card", location: "Online" },
  { id: "T1030", date: "2025-10-28", merchant: "Apollo Pharmacy", category: "Health", amount: -1240, mode: "UPI", location: "Andheri" },
  { id: "T1029", date: "2025-10-27", merchant: "Cult Fit", category: "Subscriptions", amount: -1499, mode: "Card", location: "Online" },
  { id: "T1028", date: "2025-10-26", merchant: "Starbucks", category: "Dining", amount: -520, mode: "UPI", location: "BKC" },
  { id: "T1027", date: "2025-10-25", merchant: "ICICI Pru Term", category: "Insurance", amount: -2100, mode: "Auto Debit", location: "—" },
  { id: "T1026", date: "2025-10-22", merchant: "Reliance Smart", category: "Groceries", amount: -4680, mode: "Card", location: "Andheri" },
  { id: "T1025", date: "2025-10-20", merchant: "Ola", category: "Transport & Fuel", amount: -280, mode: "UPI", location: "Mumbai" },
];

export const insights = [
  {
    id: "I1",
    severity: "warning",
    title: "Dining spend up 34% MoM",
    detail: "Restaurant and food delivery expenses reached ₹11,800 in November, versus a 6-month average of ₹8,800. Weekend spikes account for 62% of the increase.",
    recommendation: "Set a ₹9,500 dining envelope. AURA can auto-nudge you when you cross 80%.",
    impact: "Could recover ₹27,600 annually toward your goals.",
  },
  {
    id: "I2",
    severity: "info",
    title: "Subscriptions up ₹1,499",
    detail: "Cult Fit renewed at annual pricing. 3 idle subscriptions detected (avg. usage < 2 sessions/mo).",
    recommendation: "Review and pause Prime Video, Cult Fit for 90 days.",
    impact: "Immediate saving of ₹4,197 over the next quarter.",
  },
  {
    id: "I3",
    severity: "success",
    title: "SIP consistency streak: 27 months",
    detail: "You have not missed a SIP instalment since Aug 2023. Your equity portfolio XIRR is 16.2%.",
    recommendation: "Step-up SIP by ₹5,000 to accelerate the House Upgrade goal by 11 months.",
    impact: "Reaches ₹1.5 Cr corpus target by Q3 2029.",
  },
  {
    id: "I4",
    severity: "warning",
    title: "Electricity bill 28% above cluster average",
    detail: "November BESCOM ₹4,820 vs ₹3,760 for similar apartments in Andheri West.",
    recommendation: "Enable AURA energy-audit — connects to your provider to spot draw anomalies.",
    impact: "Potential savings of ₹8,000+/year.",
  },
  {
    id: "I5",
    severity: "info",
    title: "Cash withdrawals reduced 61% YoY",
    detail: "You transitioned strongly to UPI. Cash use now 4% of monthly spend.",
    recommendation: "Reduce your linked ATM limit to lower fraud surface.",
    impact: "Security posture improvement.",
  },
];

export const goals = [
  { id: "G1", name: "Emergency Fund", target: 600000, current: 542000, deadline: "Feb 2026", monthly: 12000, on_track: true },
  { id: "G2", name: "House Upgrade — Powai", target: 15000000, current: 3620000, deadline: "Q3 2029", monthly: 75000, on_track: true },
  { id: "G3", name: "Aarav's Higher Education", target: 5000000, current: 820000, deadline: "2035", monthly: 18000, on_track: true },
  { id: "G4", name: "Europe Family Vacation", target: 450000, current: 180000, deadline: "Jul 2026", monthly: 25000, on_track: false },
  { id: "G5", name: "Retirement Corpus", target: 40000000, current: 1240000, deadline: "2050", monthly: 42000, on_track: true },
];

export const recommendations = [
  { id: "R1", type: "Mutual Fund", name: "Parag Parikh Flexi Cap", risk: "Moderate", horizon: "5Y+", expected: "14–16%", rationale: "Diversified across geographies. Complements your India-heavy portfolio.", amount: 15000, tag: "Diversification" },
  { id: "R2", type: "Mutual Fund", name: "ICICI Prudential Bluechip", risk: "Moderate", horizon: "3Y+", expected: "12–14%", rationale: "Large-cap stability during expected volatility in Q1 2026.", amount: 10000, tag: "Core" },
  { id: "R3", type: "Sovereign Gold Bond", name: "SGB Series 2026-I", risk: "Low", horizon: "8Y", expected: "2.5% + gold price", rationale: "Tax-free maturity, hedge against inflation.", amount: 50000, tag: "Hedge" },
  { id: "R4", type: "IDBI Bank FD", name: "Priority Banking 555-day FD", risk: "Very Low", horizon: "1.5Y", expected: "7.55%", rationale: "Emergency fund overflow — beats savings interest by 4.5%.", amount: 100000, tag: "Liquidity" },
  { id: "R5", type: "Term Insurance", name: "Cover Top-up to ₹2 Cr", risk: "—", horizon: "Life", expected: "—", rationale: "Current cover ₹75L is inadequate for family of 3 with home loan.", amount: 1450, tag: "Protection" },
];

export const riskProfile = {
  score: 68,
  label: "Moderate-Aggressive",
  factors: [
    { name: "Age Horizon", score: 82, note: "26 years to retirement — long runway for equity." },
    { name: "Income Stability", score: 88, note: "Salaried, tier-1 employer, 8y tenure." },
    { name: "Dependent Load", score: 62, note: "Spouse + 1 child, single income household." },
    { name: "Leverage", score: 74, note: "Home loan EMI 17.5% of income." },
    { name: "Behavioural Tolerance", score: 58, note: "Historical rebalancing pattern suggests moderate loss aversion." },
    { name: "Liquidity Buffer", score: 88, note: "6.3× monthly expenses in liquid assets." },
  ],
  allocation: [
    { asset: "Equity", current: 39, recommended: 55 },
    { asset: "Debt / FD", current: 32, recommended: 25 },
    { asset: "Gold", current: 11, recommended: 8 },
    { asset: "Real Estate", current: 12, recommended: 10 },
    { asset: "Cash", current: 6, recommended: 2 },
  ],
};

export const upcomingBills = [
  { name: "Home Loan EMI", amount: 32500, due: "05 Dec", auto: true },
  { name: "ICICI Term Premium", amount: 2100, due: "12 Dec", auto: true },
  { name: "Airtel Broadband", amount: 1099, due: "14 Dec", auto: true },
  { name: "Credit Card — HDFC", amount: 18420, due: "18 Dec", auto: false },
];

export const educationModules = [
  { id: "E1", title: "Understanding SIP Step-Up", duration: "6 min", level: "Beginner", tag: "Investing" },
  { id: "E2", title: "Tax Harvesting for ELSS Investors", duration: "9 min", level: "Intermediate", tag: "Tax" },
  { id: "E3", title: "Building an Emergency Fund the Right Way", duration: "5 min", level: "Beginner", tag: "Foundations" },
  { id: "E4", title: "Home Loan Prepayment vs SIP Top-up", duration: "11 min", level: "Advanced", tag: "Strategy" },
  { id: "E5", title: "Sovereign Gold Bonds Explained", duration: "7 min", level: "Intermediate", tag: "Fixed Income" },
  { id: "E6", title: "Behavioural Finance — Beating Loss Aversion", duration: "10 min", level: "Advanced", tag: "Mindset" },
];

export const formatINR = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (abs >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};
