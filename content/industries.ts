import type { Industry } from "@/lib/types";

export const industries: Industry[] = [
  {
    slug: "nonprofits",
    name: "Nonprofits",
    icon: "heart",
    featured: true,
    headline: "More time for your mission, less time on compliance",
    description:
      "Form 990s, fund accounting, grant tracking and audit readiness, explained clearly for executive directors, finance staff and boards.",
    points: [
      "Restricted and unrestricted fund tracking",
      "Form 990 preparation and filing",
      "Grant budgets and funder reporting",
      "Audit and review preparation",
    ],
  },
  {
    slug: "small-businesses",
    name: "Small Businesses",
    icon: "store",
    featured: true,
    headline: "Clear numbers and a plan for growth",
    description:
      "Monthly books, proactive tax planning and practical advice for owner-operated businesses across Minnesota, from first hire to fifty employees.",
    points: [
      "Monthly book-keeping and reporting",
      "Quarterly tax planning and estimates",
      "Sales and payroll tax compliance",
      "Cash flow forecasting",
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: "briefcase",
    featured: true,
    headline: "Built for firms that bill their time",
    description:
      "For consultants, agencies, legal and design practices: project profitability, partner distributions and entity planning that fits how you work.",
    points: [
      "Project and client profitability",
      "Partner and owner compensation planning",
      "S corporation and entity strategy",
      "Retirement plan coordination",
    ],
  },
  {
    slug: "government",
    name: "Government Entities",
    icon: "landmark",
    featured: false,
    description:
      "Transparent financial management, budgeting and compliance, plus audits and single audits of public funds.",
  },
  {
    slug: "education",
    name: "Education",
    icon: "graduation",
    featured: false,
    description: "Funding, budget management and compliance support for schools, colleges and education programs.",
  },
  {
    slug: "healthcare",
    name: "Healthcare Practices",
    icon: "stethoscope",
    featured: false,
    description: "Cost management, reimbursement tracking, compliance and clear financial reporting for practices.",
  },
  {
    slug: "construction",
    name: "Construction & Trades",
    icon: "building",
    featured: false,
    description: "Job budgeting, project costing, cash flow management and reporting for contractors.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: "home",
    featured: false,
    description: "Property-level books, cash flow and reporting for owners, investors and managers.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "factory",
    featured: false,
    description: "Financial planning, cost management, and reporting and analysis that show true product margins.",
  },
  {
    slug: "retail",
    name: "Retail",
    icon: "shopping",
    featured: false,
    description: "Cash flow, inventory, pricing strategy and sales tax, so your store runs efficiently.",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: "hotel",
    featured: false,
    description: "Managing seasonal swings in revenue, cash flow and payroll to protect profitability.",
  },
  {
    slug: "logistics",
    name: "Logistics & Transportation",
    icon: "truck",
    featured: false,
    description: "Cost efficiency, supply chain finances and regulatory compliance for carriers and distributors.",
  },
  {
    slug: "faith-based",
    name: "Faith-Based Organizations",
    icon: "church",
    featured: false,
    description: "Contribution tracking, fund accounting and clear reporting for congregations and ministries.",
  },
];

export const featuredIndustries = industries.filter((industry) => industry.featured);
export const otherIndustries = industries.filter((industry) => !industry.featured);
