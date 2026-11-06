import Script from "next/script";

/**
 * Optional, privacy-friendly analytics. Off unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 * Plausible is cookieless, so no consent banner is required. If you switch to a
 * cookie-based tool (e.g. Google Analytics), add a consent banner first.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
}
