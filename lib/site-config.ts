/**
 * Single source of truth for every site-wide fact.
 * Anything wrapped in [square brackets] is a placeholder that must be replaced
 * before launch — see "Placeholders to replace" in README.md.
 */

export const siteConfig = {
  // Website brand. The two independent firms are described in content/firms.ts.
  name: "Sanyagold",
  legalName: "Sanyagold Accounting, Advisory and Consulting Services",
  tagline: "Accounting, tax and advisory for Minnesota nonprofits and small businesses",
  description:
    "Two independent, complementary Minnesota firms: Sanyagold Accounting, Advisory and Consulting Services for book-keeping, payroll, HR and business advisory, and W O Oyebamiji CPA LLC for tax, audit, review and attestation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sanyagold.com",

  contact: {
    phone: "763-400-1411",
    phoneHref: "tel:+17634001411",
    email: "info@sanyagold.com",
  },

  // Address taken from the current sanyagold.com business profile — verify before launch.
  address: {
    street: "11608 5th St NE",
    city: "Hanover",
    region: "MN",
    postalCode: "55341",
    country: "US",
  },

  hours: [
    { days: "Monday – Friday", time: "[9:00 AM – 5:00 PM]" },
    { days: "Saturday – Sunday", time: "[By appointment]" },
  ],
  // Machine-readable hours for JSON-LD — keep in sync with `hours` above.
  openingHoursSpec: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],

  socials: {
    linkedin: "https://www.linkedin.com/company/[sanyagold]",
    facebook: "https://www.facebook.com/[sanyagold]",
    googleReviews: "https://g.page/r/[GOOGLE_PLACE_ID]/review",
  },

  // Built-in consultation scheduler (calendar + time slots, confirmed by email).
  booking: {
    timeZone: "America/Chicago", // Minnesota
    timeZoneLabel: "Central Time",
    durationMinutes: 30,
    // 24h start times offered each open day. Keep in sync with `hours` above.
    slots: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
    closedWeekdays: [0, 6], // Sunday, Saturday
    maxDaysAhead: 60,
  },

  cta: {
    primary: { label: "Book a Free Consultation", href: "/book" },
    secondary: { label: "Explore Services", href: "/services" },
  },

  nav: [
    {
      label: "Services",
      href: "/services",
      // Grouped by the independent firm that provides each service.
      children: [
        {
          group: "Sanyagold Accounting, Advisory and Consulting Services",
          label: "Accounting & Book-keeping",
          href: "/services/accounting",
          description: "Clean monthly books and clear financial reports.",
        },
        {
          group: "Sanyagold Accounting, Advisory and Consulting Services",
          label: "Payroll Services",
          href: "/services/payroll",
          description: "On-time payroll, payroll filings and year-end forms.",
        },
        {
          group: "Sanyagold Accounting, Advisory and Consulting Services",
          label: "HR Management",
          href: "/services/hr-management",
          description: "Policies, onboarding and employee records.",
        },
        {
          group: "Sanyagold Accounting, Advisory and Consulting Services",
          label: "Business Advisory & Consulting",
          href: "/services/consulting",
          description: "Budgets, forecasts and CFO-level support.",
        },
        {
          group: "W O Oyebamiji CPA LLC",
          label: "Tax Services",
          href: "/services/tax",
          description: "Tax planning and tax preparation for businesses and nonprofits.",
        },
        {
          group: "W O Oyebamiji CPA LLC",
          label: "Audit, Review & Attestation",
          href: "/services/audit-assurance",
          description: "Audits, single audits, reviews and attestation.",
        },
      ],
    },
    {
      label: "Our Firms",
      href: "/firms",
      children: [
        {
          label: "Sanyagold",
          href: "/firms/sanyagold",
          description: "Accounting, Advisory and Consulting Services: book-keeping, payroll, HR and advisory.",
        },
        {
          label: "W O Oyebamiji CPA LLC",
          href: "/firms/w-o-oyebamiji-cpa",
          description: "Licensed CPA firm: tax, audit, review and attestation.",
        },
      ],
    },
    { label: "Industries", href: "/industries" },
    { label: "About", href: "/about" },
    {
      label: "Resources",
      href: "/resources",
      children: [
        { label: "Blog", href: "/blog", description: "Plain-English guides on tax, compliance and finance." },
        { label: "FAQs", href: "/resources#faqs", description: "Answers to the questions we hear most." },
      ],
    },
    { label: "Client Portal", href: "/portal/login" },
  ],

  footer: {
    // Services grouped by the firm that provides them.
    serviceGroups: [
      {
        title: "Sanyagold",
        href: "/firms/sanyagold",
        links: [
          { label: "Accounting & Book-keeping", href: "/services/accounting" },
          { label: "Payroll Services", href: "/services/payroll" },
          { label: "HR Management", href: "/services/hr-management" },
          { label: "Business Advisory & Consulting", href: "/services/consulting" },
        ],
      },
      {
        title: "W O Oyebamiji CPA LLC",
        href: "/firms/w-o-oyebamiji-cpa",
        links: [
          { label: "Tax Services", href: "/services/tax" },
          { label: "Audit, Review & Attestation", href: "/services/audit-assurance" },
        ],
      },
    ],
    company: [
      { label: "Our Firms", href: "/firms" },
      { label: "About Us", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Consultation", href: "/book" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/resources#faqs" },
      { label: "Client Portal", href: "/portal/login" },
      { label: "Secure Upload", href: "/portal/documents" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const formattedAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`;
