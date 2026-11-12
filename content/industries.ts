import type { IconName, Industry } from "@/lib/types";

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
  { slug: "real-estate", name: "Real Estate", icon: "home", featured: false },
  { slug: "construction", name: "Construction & Trades", icon: "building", featured: false },
  { slug: "healthcare", name: "Healthcare Practices", icon: "stethoscope", featured: false },
  { slug: "education", name: "Education", icon: "graduation", featured: false },
  { slug: "faith-based", name: "Faith-Based Organizations", icon: "church", featured: false },
  { slug: "government", name: "Government", icon: "landmark", featured: false },
  { slug: "manufacturing", name: "Manufacturing", icon: "factory", featured: false },
  { slug: "retail", name: "Retail", icon: "shopping", featured: false },
  { slug: "hospitality", name: "Hospitality", icon: "hotel", featured: false },
  { slug: "logistics", name: "Logistics", icon: "truck", featured: false },
];

export const featuredIndustries = industries.filter((industry) => industry.featured);
export const otherIndustries = industries.filter((industry) => !industry.featured);

/**
 * "Industry-Focused Accounting Services", word for word from the previous
 * sanyagold.com Industry Focus page.
 */
export const industryFocus: { name: string; icon: IconName; paragraphs: string[] }[] = [
  {
    name: "Nonprofit",
    icon: "heart",
    paragraphs: [
      "At Sanyagold, we understand the unique challenges faced by non-profit organizations. Our services are designed to help you navigate the complexities of financial management, compliance, and reporting, allowing you to focus on your mission.",
      "We offer tailored solutions to ensure transparency, efficiency, and sustainability in your operations.",
    ],
  },
  {
    name: "Professional Services",
    icon: "briefcase",
    paragraphs: [
      "Professional services firms rely on accurate financial planning and strategy to ensure growth and success.",
    ],
  },
  {
    name: "Government",
    icon: "landmark",
    paragraphs: [
      "We work closely with government entities to provide transparent, reliable financial management and consulting services.",
      "Our expertise helps ensure compliance with government regulations, improve efficiency, and optimize budgeting and financial planning, supporting your mission to serve the public effectively and responsibly.",
    ],
  },
  {
    name: "Construction & Real Estate",
    icon: "building",
    paragraphs: [
      "The construction and real estate industries require precision in budgeting, project management, and financial reporting.",
      "At Sanyagold, we offer solutions to manage cash flow, ensure compliance with industry regulations, and improve financial performance.",
      "Whether you’re handling large-scale projects or managing properties, we provide the financial insight to help you succeed.",
    ],
  },
  {
    name: "Manufacturing",
    icon: "factory",
    paragraphs: [
      "The manufacturing industry demands precise financial planning and cost management to maintain efficiency and profitability.",
      "At Sanyagold, we offer tailored solutions to streamline operations, manage supply chain costs, and ensure compliance with industry regulations.",
      "Our expertise in financial reporting and analysis helps manufacturing businesses optimize production and maximize profitability.",
    ],
  },
  {
    name: "Education",
    icon: "graduation",
    paragraphs: [
      "Educational institutions face unique financial challenges, including funding, budget management, and compliance with educational regulations. Sanyagold offers specialized services to help schools, universities, and educational organizations manage their finances effectively.",
      "We provide strategies for cost optimization, financial reporting, and long-term sustainability, allowing you to focus on providing high-quality education.",
    ],
  },
  {
    name: "Retail",
    icon: "shopping",
    paragraphs: [
      "In the retail sector, managing cash flow, inventory, and customer expectations is critical to success.",
      "At Sanyagold, we provide comprehensive financial services to help retail businesses navigate market fluctuations, optimize pricing strategies, and ensure efficient operations.",
      "Our solutions help you stay competitive and profitable in a dynamic and fast-paced market.",
    ],
  },
  {
    name: "Healthcare",
    icon: "stethoscope",
    paragraphs: [
      "At Sanyagold, we understand the intricacies of the healthcare sector, where financial management must align with regulatory standards and patient care priorities.",
      "Our services are designed to help healthcare providers manage costs, optimize reimbursement processes, ensure compliance, and maintain financial transparency, allowing you to focus on delivering exceptional patient care.",
    ],
  },
  {
    name: "Hospitality",
    icon: "hotel",
    paragraphs: [
      "The hospitality industry faces unique financial challenges, including managing fluctuating revenues and high operational costs.",
      "At Sanyagold, we offer tailored financial services to help hospitality businesses streamline their operations, manage cash flow, and optimize profitability.",
      "Our expertise ensures you maintain a competitive edge in an ever-evolving industry while focusing on delivering exceptional guest experiences.",
    ],
  },
  {
    name: "Logistics",
    icon: "truck",
    paragraphs: [
      "The logistics industry requires a strong focus on cost efficiency, supply chain management, and financial compliance.",
      "At Sanyagold, we offer expert financial services to help logistics companies optimize their operations, improve profitability, and ensure regulatory compliance.",
      "Our solutions support better decision-making, enabling you to stay competitive in an ever-evolving industry.",
    ],
  },
];
