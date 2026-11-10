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
    focus: "Accounting, payroll, HR and business advisory",
    summary:
      "Ongoing accounting support and business management, so your finances stay organized and your decisions are well informed.",
    description:
      "Sanyagold keeps the day-to-day financial side of your organization running smoothly: accurate books, reliable payroll, organized HR and practical advice on budgeting, growth and strategy.",
    highlights: [
      "Monthly bookkeeping and financial reporting",
      "Payroll processing and payroll filings",
      "HR management and employee records",
      "Business advisory and consulting",
    ],
  },
  {
    id: "oyebamiji-cpa",
    name: "W O Oyebamiji CPA LLC",
    shortName: "W O Oyebamiji CPA",
    monogram: "WO",
    focus: "Tax, audit, review and attestation",
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
