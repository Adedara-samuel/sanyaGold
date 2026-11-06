import type { Testimonial } from "@/lib/types";

/**
 * PLACEHOLDER DATA.
 * Replace with real client testimonials (with written permission) or Google reviews.
 * Every entry is flagged `isPlaceholder: true` and the UI labels it as a sample.
 * Do not publish invented quotes as if they came from real clients.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "[Client Name]",
    role: "[Executive Director]",
    organization: "[Minnesota Nonprofit]",
    quote:
      "[Sample testimonial] Replace with a real quote about how Sanyagold helped with Form 990 filings, audit preparation or board reporting.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t2",
    name: "[Client Name]",
    role: "[Owner]",
    organization: "[Local Small Business]",
    quote:
      "[Sample testimonial] Replace with a real quote about monthly bookkeeping, tax planning or cash flow support.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t3",
    name: "[Client Name]",
    role: "[Managing Partner]",
    organization: "[Professional Services Firm]",
    quote: "[Sample testimonial] Replace with a real quote about consulting, forecasting or entity planning.",
    rating: 5,
    isPlaceholder: true,
  },
];
