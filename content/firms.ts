import type { Firm, FirmId } from "@/lib/types";

/**
 * The two independent firms presented on this website.
 *
 * They are separate businesses — neither owns the other. Each service in
 * content/services.ts names the firm that provides it via `firm`.
 * Copy here must not imply a parent/subsidiary or partnership relationship.
 */
export const firms: Firm[] = [
  {
    id: "sanyagold",
    name: "Sanyagold Accounting, Advisory and Consulting Services",
    shortName: "Sanyagold",
    monogram: "SG",
    focus: "book-keeping, payroll, HR and business advisory",
    summary:
      "Ongoing accounting support and business management, so your finances stay organized and your decisions are well informed.",
    description:
      "Sanyagold keeps the day-to-day financial side of your organization running smoothly: accurate books, reliable payroll, organized HR and practical advice on budgeting, growth and strategy.",
    highlights: [
      "Monthly book-keeping and financial reporting",
      "Payroll processing and payroll filings",
      "HR management and employee records",
      "Business advisory and consulting",
    ],
    strengths: [
      {
        title: "Organized, every month",
        description:
          "Books reconciled and reports delivered on a regular schedule, so you always know where you stand.",
      },
      {
        title: "People and payroll, handled together",
        description:
          "Payroll, payroll filings and HR records managed side by side, so your team is paid correctly and records agree.",
      },
      {
        title: "Advice you can act on",
        description: "Budgets, forecasts and plain-English guidance that help you plan, hire and grow with confidence.",
      },
      {
        title: "Ready when tax season comes",
        description:
          "Clean, well-documented books make tax preparation faster and smoother, whoever prepares your return.",
      },
    ],
  },
  {
    id: "oyebamiji-cpa",
    name: "W O Oyebamiji CPA LLC",
    shortName: "W O Oyebamiji CPA",
    monogram: "WO",
    focus: "tax, audit, review and attestation",
    summary:
      "Licensed CPA services for tax, financial assurance and compliance, delivered with professional independence.",
    description:
      "W O Oyebamiji CPA LLC provides the CPA services that require a licensed firm: tax planning and preparation, financial statement audits and single audits, reviews and other attestation engagements.",
    highlights: [
      "Tax planning and tax preparation",
      "Financial statement audits and single audits",
      "Financial reviews and compilations",
      "Attestation and agreed-upon procedures",
    ],
    strengths: [
      {
        title: "Licensed CPA expertise",
        description:
          "Tax, audit, review and attestation work performed by a licensed CPA firm and held to professional standards.",
      },
      {
        title: "Objective, independent assurance",
        description:
          "Audits, reviews and attestation engagements planned and performed in line with professional standards, including independence requirements.",
      },
      {
        title: "Proactive tax planning",
        description:
          "Year-round planning and accurate preparation for businesses, nonprofits and their owners, with notices handled on your behalf.",
      },
      {
        title: "Built for nonprofits",
        description:
          "Form 990s, financial statement audits and single audits for organizations with funder and federal-award requirements.",
      },
    ],
    licensing: {
      firmPermit: "[Minnesota CPA Firm Permit #]",
      licensingBoard: "Minnesota Board of Accountancy",
      licensingBoardUrl: "https://boa.state.mn.us/",
    },
  },
];

/** URL segment for each firm's dedicated page (/firms/[slug]). */
export const firmSlugs: Record<FirmId, string> = {
  sanyagold: "sanyagold",
  "oyebamiji-cpa": "w-o-oyebamiji-cpa",
};

/** Firm name with non-breaking spaces in "W O Oyebamiji" so the initials never wrap apart in headings. */
export function displayName(firm: Firm) {
  return firm.name.replace("W O Oyebamiji", "W O Oyebamiji");
}

export function getFirm(id: FirmId): Firm {
  const firm = firms.find((item) => item.id === id);
  if (!firm) throw new Error(`Unknown firm: ${id}`);
  return firm;
}

export function getFirmBySlug(slug: string): Firm | undefined {
  return firms.find((firm) => firmSlugs[firm.id] === slug);
}

export function firmHref(id: FirmId) {
  return `/firms/${firmSlugs[id]}`;
}

/** Statement used wherever the relationship between the firms needs to be explained. */
export const independenceStatement =
  "Sanyagold Accounting, Advisory and Consulting Services and W O Oyebamiji CPA LLC are independent firms. Tax, audit, review and attestation services are provided solely by W O Oyebamiji CPA LLC.";
