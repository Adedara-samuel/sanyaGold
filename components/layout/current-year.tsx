import { cacheLife } from "next/cache";

/**
 * Current year for the footer, computed on the server instead of hard-coded.
 * Cache Components only allows reading the clock inside a cached scope; the cache
 * refreshes daily, so the year rolls over automatically on January 1.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <span>{new Date().getFullYear()}</span>;
}
