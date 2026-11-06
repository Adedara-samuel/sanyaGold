import type { Stat } from "@/lib/types";

/**
 * PLACEHOLDER NUMBERS — replace with verified figures before launch.
 * The UI shows a small "sample figures" note while any stat is a placeholder.
 */
export const stats: Stat[] = [
  { label: "Years of experience", value: 10, suffix: "+", placeholder: true },
  { label: "Clients served", value: 100, suffix: "+", placeholder: true },
  { label: "Returns filed each year", value: 250, suffix: "+", placeholder: true },
  { label: "Client retention", value: 95, suffix: "%", placeholder: true },
];
