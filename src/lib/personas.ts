// Three customer personas the demo can switch between.
export type Persona = {
  id: string;
  label: string;
  name: string;
  age: number;
  occupation: string;
  segment: string;
  salary: number;
  savings: number;
  investments: number;
  liabilities: number;
  creditScore: number;
  riskAppetite: string;
  headline: string;
};

export const personas: Persona[] = [
  {
    id: "young-professional",
    label: "Young Professional",
    name: "Ananya Iyer",
    age: 27,
    occupation: "Software Engineer",
    segment: "Digital-First",
    salary: 92000,
    savings: 480000,
    investments: 260000,
    liabilities: 0,
    creditScore: 748,
    riskAppetite: "Aggressive",
    headline: "Building wealth foundations · high equity tilt",
  },
  {
    id: "family-person",
    label: "Family Person",
    name: "Rahul Sharma",
    age: 34,
    occupation: "Senior Product Manager",
    segment: "Priority Banking",
    salary: 185000,
    savings: 842000,
    investments: 1240000,
    liabilities: 2800000,
    creditScore: 782,
    riskAppetite: "Moderate-Aggressive",
    headline: "Multi-goal household · home loan · education planning",
  },
  {
    id: "senior-citizen",
    label: "Senior Citizen",
    name: "Suresh Menon",
    age: 62,
    occupation: "Retired · Ex-BHEL",
    segment: "Wealth Preservation",
    salary: 68000, // pension
    savings: 2400000,
    investments: 3200000,
    liabilities: 0,
    creditScore: 811,
    riskAppetite: "Conservative",
    headline: "Preservation & income · FD ladder · SCSS heavy",
  },
];
