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
      "Monthly bookkeeping and reporting",
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
  { slug: "real-estate", name: "Real Estate", icon: "home", featured: false },
  { slug: "construction", name: "Construction & Trades", icon: "building", featured: false },
  { slug: "healthcare", name: "Healthcare Practices", icon: "stethoscope", featured: false },
  { slug: "education", name: "Education", icon: "graduation", featured: false },
  { slug: "faith-based", name: "Faith-Based Organizations", icon: "church", featured: false },
];

export const featuredIndustries = industries.filter((industry) => industry.featured);
export const otherIndustries = industries.filter((industry) => !industry.featured);
