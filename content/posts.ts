import type { Post } from "@/lib/types";

/**
 * Blog posts as typed content. To add a post, append an object to this array.
 * When you move to a CMS, update `lib/data.ts` — pages and hooks stay the same.
 * These are general educational articles, not tax advice for any specific situation.
 */
export const posts: Post[] = [
  {
    slug: "form-990-basics-for-minnesota-nonprofits",
    title: "Form 990 basics for Minnesota nonprofits",
    excerpt:
      "Which version of Form 990 your organization files, what goes into it, and how to make filing season less stressful.",
    category: "Nonprofits",
    publishedAt: "2026-09-15",
    readingMinutes: 5,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "Most tax-exempt organizations must file an annual information return with the IRS. Which version you file depends mainly on your gross receipts and total assets. Filing on time keeps your exempt status in good standing and shows donors that you are well run.",
      },
      { type: "h2", text: "Which form do you file?" },
      {
        type: "ul",
        items: [
          "Form 990-N (e-Postcard): for small organizations with gross receipts normally at or below the IRS threshold.",
          "Form 990-EZ: a shorter return for mid-sized organizations under the IRS limits for receipts and assets.",
          "Form 990: the full return for larger organizations.",
        ],
      },
      {
        type: "callout",
        text: "IRS thresholds and Minnesota charitable reporting rules change from time to time. Check the current limits with your CPA before you file.",
      },
      { type: "h2", text: "Three habits that make filing easier" },
      {
        type: "ul",
        items: [
          "Keep restricted and unrestricted funds separate in your books all year.",
          "Keep board minutes, policies and compensation decisions documented.",
          "Reconcile your accounts monthly instead of waiting for year end.",
        ],
      },
      {
        type: "p",
        text: "If you're not sure which form applies to you, or you're behind on filings, a short conversation can help you understand your options.",
      },
    ],
  },
  {
    slug: "quarterly-estimated-taxes-small-business",
    title: "A simple guide to quarterly estimated taxes",
    excerpt:
      "Why estimated payments matter for small business owners, and a practical way to plan for them without the stress.",
    category: "Small Business",
    publishedAt: "2026-08-20",
    readingMinutes: 4,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "If you own a business that doesn't withhold tax from your income, you're generally expected to pay tax during the year through quarterly estimated payments. Missing them can lead to penalties and a large bill when you file.",
      },
      { type: "h2", text: "A practical approach" },
      {
        type: "ul",
        items: [
          "Set aside a fixed percentage of each deposit in a separate savings account.",
          "Review year-to-date profit with your accountant each quarter.",
          "Adjust your payments when your income changes significantly.",
        ],
      },
      {
        type: "callout",
        text: "Payment due dates and safe-harbor rules are set by the IRS and the Minnesota Department of Revenue. Confirm the current year's dates before you pay.",
      },
      {
        type: "p",
        text: "A short planning call each quarter takes most of the guesswork out of estimated taxes.",
      },
    ],
  },
  {
    slug: "audit-vs-review-vs-compilation",
    title: "Audit, review or compilation: which do you need?",
    excerpt:
      "A plain-English comparison of the three main types of financial statement services and when each one makes sense.",
    category: "Audit & Review",
    publishedAt: "2026-07-10",
    readingMinutes: 6,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "Lenders, funders and boards often ask for financial statements prepared or examined by a CPA. The three most common services offer different levels of assurance, at different costs.",
      },
      { type: "h2", text: "Compilation" },
      {
        type: "p",
        text: "A CPA presents your financial information as financial statements without providing assurance. It's useful when you need professionally formatted statements.",
      },
      { type: "h2", text: "Review" },
      {
        type: "p",
        text: "A review provides limited assurance, mainly through analytical procedures and inquiry. It's often enough for smaller lenders and some funders.",
      },
      { type: "h2", text: "Audit" },
      {
        type: "p",
        text: "An audit provides reasonable assurance and includes testing, confirmations and an evaluation of internal controls. It's often required for larger nonprofits and certain grants.",
      },
      {
        type: "callout",
        text: "Before choosing, ask the person requesting the statements exactly what level of service they require. It can save you time and money.",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
