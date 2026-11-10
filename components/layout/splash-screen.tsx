import { siteConfig } from "@/lib/site-config";

/**
 * Branded intro shown on the first page load of a session.
 *
 * Deep-navy panel, the Sanyagold mark interlocking, wordmark and a gold progress
 * bar, then the panel slides up like a curtain to reveal the site (≈2.6s total).
 *
 * Pure CSS (see `.sg-splash` in globals.css): it always removes itself, even if
 * JavaScript fails.
 * - Skipped on later full page loads in the same session (via `splashScript`).
 * - Hidden entirely for visitors who prefer reduced motion.
 * - Decorative only (aria-hidden), so screen readers go straight to the content.
 */
export function SplashScreen() {
  return (
    <div className="sg-splash" aria-hidden="true">
      <div className="sg-splash__inner">
        <span className="sg-splash__glow" />
        <svg viewBox="-400 -440 800 880" className="sg-splash__mark">
          <path
            className="sg-splash__hook sg-splash__hook--a"
            d="M-30 -428L-390 -220L-390 220L-185 338L200 116L200 -33L89 -33L89 50L-185 208L-277 155L-277 -155L26 -330Z"
          />
          <path
            className="sg-splash__hook sg-splash__hook--b"
            d="M30 428L390 220L390 -220L185 -338L-200 -116L-200 33L-89 33L-89 -50L185 -208L277 -155L277 155L-26 330Z"
          />
        </svg>
        <p className="sg-splash__word">{siteConfig.name}</p>
        <p className="sg-splash__tag">Accounting · Tax · Advisory</p>
        <span className="sg-splash__track">
          <span className="sg-splash__bar" />
        </span>
      </div>
    </div>
  );
}

/** Runs before paint: shows the splash once per browser session. */
export const splashScript = `try{var k="sg-splash-seen";if(sessionStorage.getItem(k)){document.documentElement.classList.add(k)}else{sessionStorage.setItem(k,"1")}}catch(e){}`;
