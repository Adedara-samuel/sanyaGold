import type { FirmId, Service } from "@/lib/types";

/**
 * Services grouped by the independent firm that provides them (`firm`).
 *   - sanyagold:     Sanyagold Accounting, Advisory and Consulting Services
 *   - oyebamiji-cpa: W O Oyebamiji CPA LLC (tax, audit, review, attestation)
 * Order matters: services are listed in this order within each firm.
 */
export const services: Service[] = [
  /* ─────────────── Sanyagold Accounting, Advisory and Consulting Services ─────────────── */
  {
    slug: "accounting",
    firm: "sanyagold",
    title: "Accounting & Book-keeping",
    shortTitle: "Book-keeping",
    icon: "book",
    summary: "Clean, up-to-date books and clear monthly reports you can actually use to make decisions.",
    description:
      "We keep your books accurate and current every month, reconcile your accounts and deliver simple financial reports, so you always know where your organization stands and are ready for tax time, lenders, boards and grantmakers.",
    idealFor: [
      "Growing businesses that have outgrown do-it-yourself book-keeping",
      "Nonprofits that need fund and grant tracking",
      "Teams that want a reliable monthly close",
    ],
    offerings: [
      {
        title: "Monthly book-keeping",
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
        title: "Payroll records",
        description: "Payroll entries and liabilities recorded accurately, so your books and payroll always agree.",
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
        answer: "Yes. Catch-up book-keeping is one of the most common ways clients start working with us.",
      },
    ],
  },
  {
    slug: "payroll",
    firm: "sanyagold",
    title: "Payroll Services",
    shortTitle: "Payroll",
    icon: "wallet",
    summary: "Accurate, on-time payroll and payroll filings, so your team is paid correctly and you stay compliant.",
    description:
      "We run payroll on your schedule, handle withholding, deposits and payroll filings, and keep clear records, so paying your people is one less thing to worry about.",
    idealFor: [
      "Small businesses with hourly or salaried employees",
      "Nonprofits managing staff across grants and programs",
      "Owners who want to stop running payroll themselves",
    ],
    offerings: [
      {
        title: "Payroll processing",
        description: "Weekly, biweekly or monthly payroll with direct deposit and pay stubs.",
      },
      {
        title: "Payroll tax deposits and filings",
        description: "Federal and Minnesota withholding deposits and quarterly payroll returns.",
      },
      {
        title: "Year-end forms",
        description: "W-2s, W-3s and 1099s prepared and filed on time.",
      },
      {
        title: "New hire setup",
        description: "New employee records, withholding forms and state new-hire reporting.",
      },
      {
        title: "Payroll setup and migration",
        description: "Setting up payroll for the first time, or moving from another provider.",
      },
      {
        title: "Payroll reporting",
        description: "Clear payroll reports by employee, department, program or grant.",
      },
    ],
    process: [
      { step: "Setup", description: "We gather employee details, pay schedules and tax accounts." },
      { step: "Run payroll", description: "Each pay period you approve hours and we process payroll." },
      { step: "File and deposit", description: "We make payroll tax deposits and file the required returns." },
      { step: "Report", description: "You receive clear payroll reports and year-end forms." },
    ],
    faqs: [
      {
        question: "Which payroll platform do you use?",
        answer: "We can work with the platform you already use or recommend one that fits. [Confirm payroll platform]",
      },
      {
        question: "Can you take over payroll partway through the year?",
        answer: "Yes. We bring over your year-to-date figures so your quarterly and year-end filings stay accurate.",
      },
    ],
  },
  {
    slug: "hr-management",
    firm: "sanyagold",
    title: "HR Management",
    shortTitle: "HR",
    icon: "people",
    summary: "Practical HR support, from onboarding and policies to employee records, without a full-time HR hire.",
    description:
      "We help you build simple, organized HR practices: clear policies, smooth onboarding, well-kept employee records and day-to-day HR support as your team grows.",
    idealFor: [
      "Growing teams without a dedicated HR person",
      "Nonprofits managing staff and volunteers",
      "Owners who want consistent, well-documented HR practices",
    ],
    offerings: [
      {
        title: "Policies and employee handbook",
        description: "Clear workplace policies and a handbook your team can actually use.",
      },
      {
        title: "Onboarding and offboarding",
        description: "Checklists, paperwork and records for every employee who joins or leaves.",
      },
      {
        title: "Employee records",
        description: "Organized personnel files, I-9 records and documentation.",
      },
      {
        title: "Benefits administration support",
        description: "Help coordinating enrollments and changes with your benefits providers.",
      },
      {
        title: "Job descriptions and pay structure",
        description: "Consistent job descriptions and a clear framework for pay decisions.",
      },
      {
        title: "Day-to-day HR support",
        description: "A knowledgeable point of contact for everyday HR questions.",
      },
    ],
    process: [
      { step: "Assess", description: "We review your current HR practices, records and needs." },
      { step: "Organize", description: "We put the essential policies, records and checklists in place." },
      { step: "Support", description: "We help with onboarding, changes and everyday HR questions." },
      { step: "Review", description: "We check in regularly to keep your practices current as you grow." },
    ],
    faqs: [
      {
        question: "Do you provide legal advice on employment matters?",
        answer:
          "No. We help you organize and run HR practices. For legal questions, we recommend speaking with an employment attorney.",
      },
      {
        question: "Can HR support be combined with payroll?",
        answer: "Yes. Many clients use both, so employee records and payroll stay consistent.",
      },
    ],
  },
  {
    slug: "consulting",
    firm: "sanyagold",
    title: "Business Advisory & Consulting",
    shortTitle: "Advisory",
    icon: "compass",
    summary: "Budgets, forecasts and outsourced CFO support to help you plan with confidence and grow.",
    description:
      "Beyond the day-to-day, we help you understand your numbers and plan ahead, from budgets and cash flow forecasts to pricing, business structure and board-ready reporting, as an extension of your leadership team.",
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
        title: "Controller and CFO services",
        description: "Strategic financial leadership without the cost of a full-time hire.",
      },
      {
        title: "Business structure advice",
        description: "Help choosing a structure that supports liability protection and growth.",
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
        title: "Business start-up",
        description: "Registrations, accounting setup and a financial plan for your first year.",
      },
      {
        title: "Forensic accounting",
        description: "Careful review of records when something doesn't add up, with clear findings.",
      },
      {
        title: "Outsourced business support",
        description: "Back-office accounting and administrative support so your team can focus on its work.",
      },
      {
        title: "Strategic planning",
        description: "Turning goals into a practical financial plan with clear milestones.",
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
        question: "Do I need to be a book-keeping client to use advisory services?",
        answer: "No. Many clients start with a single advisory or consulting project.",
      },
      {
        question: "How is consulting priced?",
        answer:
          "Most projects are priced at a fixed fee after a free consultation, so you know the cost up front. [Confirm pricing approach]",
      },
    ],
  },

  /* ─────────────────────────── W O Oyebamiji CPA LLC ─────────────────────────── */
  {
    slug: "tax",
    firm: "oyebamiji-cpa",
    title: "Tax Services",
    shortTitle: "Tax",
    icon: "receipt",
    summary: "Year-round tax planning and accurate tax preparation, so there are no surprises in April.",
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
        title: "State and local taxes",
        description: "Minnesota and multi-state filings, including sales and use tax.",
      },
      {
        title: "Individual returns for owners",
        description: "Coordinated personal returns so your business and household plans line up.",
      },
      {
        title: "Estates and trusts",
        description: "Fiduciary returns and planning support for estates and trusts.",
      },
      {
        title: "IRS representation",
        description: "We review notices, explain what they mean and respond to tax authorities on your behalf.",
      },
    ],
    process: [
      { step: "Free consultation", description: "We learn about your situation and what you need from a tax partner." },
      {
        step: "Secure document collection",
        description: "You share documents through the client portal or a guided checklist.",
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
    slug: "audit-assurance",
    firm: "oyebamiji-cpa",
    title: "Audit, Review & Attestation",
    shortTitle: "Audit & Review",
    icon: "shield",
    summary:
      "Independent audits, single audits, reviews and attestation engagements that give boards, lenders and funders confidence.",
    description:
      "When a funder, lender or board needs independent assurance on your financial statements, we provide audits, single audits, reviews and other attestation services with clear communication at every step, so the process is predictable and your team is never left guessing.",
    idealFor: [
      "Nonprofits with audit requirements from grantors or the state",
      "Organizations that spend federal awards and need a single audit",
      "Businesses with lender or investor reporting requirements",
    ],
    offerings: [
      {
        title: "Financial statement audits",
        description: "The highest level of assurance for boards, funders and lenders.",
      },
      {
        title: "Single audits",
        description: "Audits of federal award programs under the Uniform Guidance.",
      },
      {
        title: "Financial reviews",
        description: "Limited assurance when a full audit is not required, at a lower cost.",
      },
      {
        title: "Compilations",
        description: "Professionally presented financial statements without assurance.",
      },
      {
        title: "Attestation engagements",
        description: "Examinations and agreed-upon procedures for grant, contract or regulatory requirements.",
      },
      {
        title: "Compliance and internal control audits",
        description: "Testing whether controls and processes meet the rules that apply to you.",
      },
      {
        title: "Risk assessments",
        description: "Identifying where errors or misstatements are most likely, and how to address them.",
      },
      {
        title: "Audit readiness",
        description: "Help preparing schedules and documentation before audit fieldwork begins.",
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
        question: "When is a single audit required?",
        answer:
          "Generally when an organization spends federal awards above the threshold set by the Uniform Guidance in a fiscal year. We can help you confirm whether it applies to you.",
      },
      {
        question: "Does my nonprofit need an audit?",
        answer:
          "It depends on your revenue, your funders' requirements and Minnesota's rules for charitable organizations. We can help you figure out what applies to you.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function servicesForFirm(firm: FirmId) {
  return services.filter((service) => service.firm === firm);
}
