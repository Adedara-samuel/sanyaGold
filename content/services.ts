import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "tax",
    title: "Tax Services",
    shortTitle: "Tax",
    icon: "receipt",
    summary: "Year-round tax planning and accurate filings, so there are no surprises in April.",
    description:
      "We prepare and file federal and Minnesota returns for small businesses, their owners and tax-exempt organizations, and we plan ahead with you during the year so you keep more of what you earn and stay in good standing with the IRS and the Minnesota Department of Revenue.",
    idealFor: [
      "Small business owners who want a proactive tax partner",
      "Nonprofits filing Form 990, 990-EZ or 990-N",
      "Owners of S corporations, partnerships and LLCs",
    ],
    offerings: [
      {
        title: "Business tax preparation",
        description: "Federal and Minnesota returns for S corps, C corps, partnerships and sole proprietors.",
      },
      {
        title: "Nonprofit Form 990",
        description: "Accurate 990 filings that tell your mission's story to donors and regulators.",
      },
      {
        title: "Tax planning",
        description: "Quarterly check-ins and estimated payments, so you are never caught off guard.",
      },
      {
        title: "Sales and payroll tax",
        description: "Help registering, filing and staying current with Minnesota sales and payroll taxes.",
      },
      {
        title: "Notices and correspondence",
        description: "We read the letter, explain what it means and respond on your behalf.",
      },
      {
        title: "Individual returns for owners",
        description: "Coordinated personal returns so your business and household plans line up.",
      },
    ],
    process: [
      { step: "Free consultation", description: "We learn about your situation and what you need from a tax partner." },
      {
        step: "Secure document collection",
        description: "You share documents through our client portal or a guided checklist.",
      },
      {
        step: "Preparation and review",
        description: "A CPA prepares your return and walks you through it before filing.",
      },
      { step: "Plan for next year", description: "We set reminders and a plan, so next year is even easier." },
    ],
    faqs: [
      {
        question: "When should I start working with you on taxes?",
        answer:
          "As early as possible. Planning during the year gives you more options than waiting until filing season.",
      },
      {
        question: "Do you file Minnesota returns as well as federal?",
        answer: "Yes. We handle both federal and Minnesota filings, plus other states if you have activity there.",
      },
    ],
  },
  {
    slug: "accounting",
    title: "Accounting & Bookkeeping",
    shortTitle: "Accounting",
    icon: "book",
    summary: "Clean, up-to-date books and clear monthly reports you can actually use to make decisions.",
    description:
      "We keep your books accurate and current every month, reconcile your accounts and deliver simple financial reports, so you always know where your organization stands and are ready for tax time, lenders, boards and grantmakers.",
    idealFor: [
      "Growing businesses that have outgrown do-it-yourself bookkeeping",
      "Nonprofits that need fund and grant tracking",
      "Teams that want a reliable monthly close",
    ],
    offerings: [
      {
        title: "Monthly bookkeeping",
        description: "Transactions categorized and accounts reconciled every month.",
      },
      {
        title: "Financial statements",
        description: "Profit and loss, balance sheet and cash flow reports in plain English.",
      },
      {
        title: "Nonprofit fund accounting",
        description: "Restricted and unrestricted funds tracked clearly for boards and grantors.",
      },
      {
        title: "Payroll support",
        description: "Coordination with your payroll provider, so filings and records stay accurate.",
      },
      {
        title: "Catch-up and clean-up",
        description: "Behind on your books? We bring them current and set up a system that sticks.",
      },
      {
        title: "Software setup",
        description: "Help choosing and setting up QuickBooks Online or similar accounting software.",
      },
    ],
    process: [
      { step: "Discovery", description: "We review your current books, systems and reporting needs." },
      { step: "Clean-up", description: "We correct past issues and set up a clear chart of accounts." },
      { step: "Monthly close", description: "Each month we reconcile, review and deliver your reports." },
      { step: "Check-in", description: "A short call to talk through the numbers and what they mean." },
    ],
    faqs: [
      {
        question: "Which accounting software do you work with?",
        answer:
          "We most often work in QuickBooks Online, and we can work with other common platforms. [Confirm supported software]",
      },
      {
        question: "Can you help if my books are months behind?",
        answer: "Yes. Catch-up bookkeeping is one of the most common ways clients start working with us.",
      },
    ],
  },
  {
    slug: "audit-assurance",
    title: "Audit & Review",
    shortTitle: "Audit & Review",
    icon: "shield",
    summary: "Independent audits, reviews and compilations that give boards, lenders and funders confidence.",
    description:
      "When a funder, lender or board needs independent assurance on your financial statements, we provide audits, reviews and compilations with clear communication at every step, so the process is predictable and your team is never left guessing.",
    idealFor: [
      "Nonprofits with audit requirements from grantors or the state",
      "Businesses with lender or investor reporting requirements",
      "Boards that want independent assurance",
    ],
    offerings: [
      {
        title: "Financial statement audits",
        description: "The highest level of assurance for boards, funders and lenders.",
      },
      {
        title: "Reviews",
        description: "Limited assurance when a full audit is not required, at a lower cost.",
      },
      {
        title: "Compilations",
        description: "Professionally presented financial statements without assurance.",
      },
      {
        title: "Agreed-upon procedures",
        description: "Targeted procedures for specific grant or contract requirements.",
      },
      {
        title: "Audit readiness",
        description: "Help preparing schedules and documentation before audit fieldwork begins.",
      },
      {
        title: "Internal control advice",
        description: "Practical recommendations to strengthen your financial processes.",
      },
    ],
    process: [
      { step: "Scoping", description: "We confirm which level of service your stakeholders require." },
      { step: "Planning", description: "We share a timeline and a clear list of what we need from you." },
      { step: "Fieldwork", description: "We perform our procedures with minimal disruption to your team." },
      { step: "Reporting", description: "We deliver our report and walk your board or leadership through it." },
    ],
    faqs: [
      {
        question: "What is the difference between an audit and a review?",
        answer:
          "An audit provides reasonable assurance and includes testing and verification. A review provides limited assurance, mainly through analysis and inquiry, and costs less.",
      },
      {
        question: "Does my nonprofit need an audit?",
        answer:
          "It depends on your revenue, your funders' requirements and Minnesota's rules for charitable organizations. We can help you figure out what applies to you.",
      },
    ],
  },
  {
    slug: "consulting",
    title: "Business Consulting",
    shortTitle: "Consulting",
    icon: "compass",
    summary: "Budgets, forecasts and outsourced CFO support to help you plan with confidence and grow.",
    description:
      "Beyond compliance, we help you understand your numbers and plan ahead, from budgets and cash flow forecasts to pricing, entity structure and board-ready reporting, as an extension of your leadership team.",
    idealFor: [
      "Owners planning growth, hiring or a major purchase",
      "Nonprofit executive directors working with boards",
      "Organizations that need part-time CFO-level support",
    ],
    offerings: [
      {
        title: "Budgeting and forecasting",
        description: "Realistic budgets and cash flow forecasts you can update as things change.",
      },
      {
        title: "Outsourced CFO",
        description: "Strategic financial leadership without the cost of a full-time hire.",
      },
      {
        title: "Entity and structure advice",
        description: "Help choosing the right structure for liability, taxes and growth.",
      },
      {
        title: "Board and grant reporting",
        description: "Clear reports for boards, grantmakers and other stakeholders.",
      },
      {
        title: "Process improvement",
        description: "Simpler billing, approvals and month-end processes that save time.",
      },
      {
        title: "New business setup",
        description: "Registrations, accounting setup and a financial plan for your first year.",
      },
    ],
    process: [
      { step: "Listen", description: "We learn your goals, challenges and timeline." },
      { step: "Analyze", description: "We review your numbers and identify opportunities." },
      { step: "Recommend", description: "We give clear, prioritized recommendations." },
      { step: "Support", description: "We stay involved as you put the plan into action." },
    ],
    faqs: [
      {
        question: "Do I need to be a tax or accounting client to use consulting?",
        answer: "No. Many clients start with a single consulting project.",
      },
      {
        question: "How is consulting priced?",
        answer:
          "Most projects are priced at a fixed fee after a free consultation, so you know the cost up front. [Confirm pricing approach]",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
