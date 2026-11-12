import type { ServiceSlug } from "@/lib/types";

/**
 * Detailed service descriptions carried over word for word from the previous
 * sanyagold.com (Home, Assurance and Expert Accounting Services pages).
 * Only changes: "bookkeeping" is spelled "book-keeping", and the typo
 * "With out vast" is corrected to "With our vast".
 * Shown on each service page under "In detail".
 */
export interface ServiceDetailEntry {
  title: string;
  subtitle?: string;
  paragraphs: string[];
}

export const serviceDetails: Partial<Record<ServiceSlug, { intro: string[]; entries: ServiceDetailEntry[] }>> = {
  accounting: {
    intro: [
      "We offer comprehensive accounting solutions tailored to your business needs, from book-keeping to financial statement preparation.",
    ],
    entries: [
      {
        title: "Book-keeping",
        subtitle: "Financial Transactions Recording",
        paragraphs: [
          "Our book-keeping services allow you, the business owner, to focus on what truly matters—running your business!",
          "We have a dedicated team to manage your daily, weekly, monthly, and yearly accounting transactions.",
          "Our comprehensive book-keeping services include accounts payable and receivable, income and expense recording, month-end processes such as bank reconciliations, and tax withholding and remittance.",
        ],
      },
      {
        title: "Nonprofit Accounting",
        subtitle: "Reporting and Compliance",
        paragraphs: [
          "Our nonprofit accounting, reporting, and compliance services are tailored to meet the unique needs of charitable and tax-exempt organizations.",
          "We ensure accurate financial reporting, compliance with regulatory requirements, and transparency for stakeholders.",
          "Our services include preparing financial statements, managing grants and donations, tracking restricted funds, and ensuring adherence to nonprofit accounting standards.",
          "With our expertise, your organization can focus on its mission while confidently meeting reporting and compliance obligations.",
        ],
      },
    ],
  },
  payroll: {
    intro: [],
    entries: [
      {
        title: "Payroll",
        subtitle: "Business Payroll",
        paragraphs: [
          "Our payroll services include; calculating wages, managing direct deposits, withholding taxes, filing taxes, ensuring compliance and streamlining the payroll process",
        ],
      },
    ],
  },
  "hr-management": {
    intro: [],
    entries: [
      {
        title: "Human Resources",
        subtitle: "HR Solutions",
        paragraphs: [
          "Our HR solutions involves the entire employee life cycle including recruitment & hiring, onboarding & orientation, compensation, performance evaluation, training & development, compliance, safety & health.",
        ],
      },
    ],
  },
  consulting: {
    intro: [
      "Our consultancy services aim to optimize your financial processes and decision-making, leading to sustainable growth and profitability.",
    ],
    entries: [
      {
        title: "Controller/CFO Services",
        subtitle: "Financial Strategies",
        paragraphs: [
          "Our controller services involves maintaining accurate financial record, preparing financial statements, ensuring compliance with relevant laws, assisting with yearly audits and training accounting staff.",
          "Our CFO services includes cashflow management, developing & managing budgets, managing tax planning & compliance, providing financial advice to executives and overseeing financial reporting",
        ],
      },
      {
        title: "Business Start-up",
        subtitle: "Launching and Growing",
        paragraphs: [
          "Our business start-up services is aimed at assisting entrepreneurs in launching & growing their start-ups.",
          "Services provided includes business planning, business registration, financial advice, marketing & sales, recruitment & operations management, software development and coaching",
        ],
      },
      {
        title: "Process Improvement",
        subtitle: "Efficiency & Effectiveness",
        paragraphs: [
          "Our process improvement services aims to improve operational and financial efficiency & effectiveness",
          "We use methods such as Lean, Six Sigma, Agile, Total Quality Management and Process Mapping.",
          "Our goal is to help reduce cost, improve efficiency, improve employee morale, improve quality and increase customer satisfaction",
        ],
      },
      {
        title: "Forensic Accounting",
        subtitle: "Financial Investigations",
        paragraphs: [
          "With our vast audit and accounting skills, we investigate financial crimes, fraud and disputes.",
          "We also provide expert testimony during legal proceedings",
          "Our services include fraud detection & investigation, financial crimes investigation, bankruptcy and insolvency, business valuation, damage quantification and asset tracing & recovery",
        ],
      },
    ],
  },
  tax: {
    intro: [
      "Our tax services ensure compliance with regulations while maximizing deductions and optimizing your tax strategy for financial efficiency.",
    ],
    entries: [
      {
        title: "Tax Planning & Preparation",
        subtitle: "Business & Individual",
        paragraphs: [
          "Our tax planning services involve a long-term strategic approach that integrates all aspects of your financial plan.",
          "Our goal is to help you pay the lowest possible taxes over your lifetime or the life of your business. We achieve this by minimizing tax liability and implementing a tax-efficient investment strategy.",
          "Our tax preparation services are timely and ensure compliance with all relevant rules and regulations.",
          "We maximize all available credits and deductions while maintaining accuracy and reliability.",
        ],
      },
      {
        title: "Estates & Trusts",
        subtitle: "Customized Guidance",
        paragraphs: [
          "Our team of professionals guide you on the future and generations to come.",
          "We help business owners with succession planning, transfer of ownership and business continuity",
          "With a vast knowledge on the estate and trust laws, we are your preferred partners for minimizing your tax liability and protect your assets for your estate and heirs.",
        ],
      },
      {
        title: "State and Local Taxes",
        subtitle: "Efficient Tax Solutions",
        paragraphs: [
          "Our State and Local Tax (SALT) services help you manage all aspects of your state and local tax obligations.",
          "Our team of tax professionals provides expert guidance on the tax implications of business processes and transactions.",
          "Our services include, but are not limited to, nexus studies, SALT tax credits, state tax audits, out-of-state service and product offerings, and tax considerations for the sale or purchase of a business.",
        ],
      },
      {
        title: "IRS Representation",
        subtitle: "Efficient Tax Solutions",
        paragraphs: [
          "Taxpayers have the right to retain an authorized representative of their choice when dealing with the IRS.",
          "We are authorized to practice before the IRS, ensuring expert representation and support.",
          "Our services include interacting with the IRS on your behalf, providing necessary information and explanations, and entering into agreements with the IRS.",
        ],
      },
    ],
  },
  "audit-assurance": {
    intro: [
      "Our assurance services offer objective evaluations of financial information, giving stakeholders the confidence they need to make informed decisions. We help ensure transparency, compliance, and reliability through meticulous reviews and expert insights.",
      "Our auditing and assurance services provide independent professional assessments with the aim of improving reliability, accuracy and compliance with regulations while enhancing confidence for decision makers",
    ],
    entries: [
      {
        title: "Financial Audit",
        subtitle: "Independent and Accurate Opinion",
        paragraphs: [
          "Our financial statement audits are designed to deliver an independent and objective opinion on the accuracy and reliability of your financial statements.",
          "We prioritize client satisfaction and view every audit as a chance to drive positive change within your organization.",
          "Our auditing services involve a thorough examination and verification of your financial records, ensuring accuracy and compliance with regulatory standards.",
          "We offer detailed insights and actionable recommendations to strengthen your financial practices.",
        ],
      },
      {
        title: "Internal Control Audits",
        subtitle: "Effectiveness and Efficiency",
        paragraphs: [
          "Our internal controls audits are designed to ensure the integrity of financial reporting and regulatory compliance.",
          "We assess your company’s systems and processes to confirm compliance, financial accuracy, operational efficiency, and overall effectiveness.",
        ],
      },
      {
        title: "Risk Assessments",
        paragraphs: [
          "Our risk assessment services identify potential threats to your organization’s operations and financial health. We evaluate internal controls and processes to help you mitigate risks and strengthen decision-making.",
        ],
      },
      {
        title: "Financial Statement Review",
        subtitle: "Independent Examination",
        paragraphs: [
          "Our review services provide an independent examination that offers limited assurance that your financial statements are free from material misstatements and comply with Generally Accepted Accounting Principles (GAAP).",
        ],
      },
      {
        title: "Compliance Audit",
        subtitle: "Customized Guidance",
        paragraphs: [
          "Our compliance audits are designed to evaluate whether your organization adheres to relevant laws, regulations, internal policies, and industry standards.",
          "We help organizations identify and mitigate potential risks, ensuring a strong compliance posture.",
          "Our services include IT compliance audits, employee benefits and retirement plan audits, and single audits.",
        ],
      },
      {
        title: "Attestation Engagement",
        paragraphs: [
          "We provide independent attestation services to validate the accuracy and reliability of financial and non-financial information. Our work supports transparency, builds trust, and helps meet regulatory and stakeholder requirements.",
        ],
      },
      {
        title: "Compilations",
        subtitle: "Organizing Financial Data",
        paragraphs: [
          "Our compilation services involve organizing a company’s financial data into formal financial statements, including the income statement, balance sheet, and statement of cash flows.",
          "Our compilation service does not provide any assurance or opinion on the accuracy or fairness of the financial statements.",
        ],
      },
    ],
  },
};
