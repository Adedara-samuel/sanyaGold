import { siteConfig } from "@/lib/site-config";

/**
 * Branded intro shown on the first page load of a session.
 *
 * Evergreen panel where the Golden Line S draws itself stroke by stroke and the
 * gold line sweeps through, then the wordmark and a gold progress bar, and the
 * panel slides up like a curtain to reveal the site (≈2.6s total).
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
        <svg viewBox="0 0 100 100" className="sg-splash__mark">
          <path className="sg-splash__top" d="M0 0L100 0L89.5 10.5L0 10.5Z" />
          <path className="sg-splash__stem-l" d="M0 0H10.5V39.25H0Z" />
          <path className="sg-splash__gold" d="M0 44.75H100V55.25H0Z" />
          <path className="sg-splash__stem-r" d="M89.5 60.75H100V100H89.5Z" />
          <path className="sg-splash__bottom" d="M10.5 89.5L100 89.5L100 100L0 100Z" />
        </svg>
        <p className="sg-splash__word">{siteConfig.name}</p>
        <p className="sg-splash__tag">Accounting · Advisory · Consulting</p>
        <span className="sg-splash__track">
          <span className="sg-splash__bar" />
        </span>
      </div>
    </div>
  );
}

/** Runs before paint: shows the splash once per browser session. */
export const splashScript = `try{var k="sg-splash-seen";if(sessionStorage.getItem(k)){document.documentElement.classList.add(k)}else{sessionStorage.setItem(k,"1")}}catch(e){}`;
