/**
 * Single source of truth for every site-wide fact.
 * Anything wrapped in [square brackets] is a placeholder that must be replaced
 * before launch — see "Placeholders to replace" in README.md.
 */

export const siteConfig = {
  name: "Sanyagold",
  legalName: "Sanyagold CPA", // [Confirm exact registered legal entity name]
  tagline: "Accounting, tax and advisory for Minnesota nonprofits and small businesses",
  description:
    "Sanyagold is a Minnesota CPA firm providing accounting, tax, audit & review and business consulting for nonprofits and small businesses.",
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

  licensing: {
    firmPermit: "[Minnesota CPA Firm Permit #]",
    licensingBoard: "Minnesota Board of Accountancy",
    licensingBoardUrl: "https://boa.state.mn.us/",
    states: ["Minnesota"],
  },

  socials: {
    linkedin: "https://www.linkedin.com/company/[sanyagold]",
    facebook: "https://www.facebook.com/[sanyagold]",
    googleReviews: "https://g.page/r/[GOOGLE_PLACE_ID]/review",
  },

  booking: {
    // Set NEXT_PUBLIC_BOOKING_URL to a Cal.com or Calendly scheduling link.
    url: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  },

  cta: {
    primary: { label: "Book a Free Consultation", href: "/book" },
    secondary: { label: "Explore Services", href: "/services" },
  },

  nav: [
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Tax Services", href: "/services/tax", description: "Planning, preparation and filings for businesses and nonprofits." },
        { label: "Accounting & Bookkeeping", href: "/services/accounting", description: "Clean monthly books, payroll support and reporting." },
        { label: "Audit & Review", href: "/services/audit-assurance", description: "Independent audits, reviews and compilations." },
        { label: "Business Consulting", href: "/services/consulting", description: "Budgeting, forecasting and outsourced CFO support." },
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
    services: [
      { label: "Tax Services", href: "/services/tax" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting" },
      { label: "Audit & Review", href: "/services/audit-assurance" },
      { label: "Business Consulting", href: "/services/consulting" },
    ],
    company: [
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
