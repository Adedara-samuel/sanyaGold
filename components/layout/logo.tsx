import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Sanyagold logo: "The Golden Line" (approved Concept A, see
 * logo-concepts/Sanyagold/Concept-A-Abstract-Wordmark).
 *
 * An S built from evergreen strokes with a champagne-gold line through the
 * middle. Colours come from --sg-ink / --sg-gold, so it switches to the
 * approved reversed version in dark mode. `tone="mono"` draws everything in
 * currentColor (for watermarks on coloured panels).
 */
export function LogoMark({
  className,
  title,
  tone = "brand",
}: {
  className?: string;
  title?: string;
  tone?: "brand" | "mono";
}) {
  const ink = tone === "brand" ? "fill-sg-ink" : undefined;
  const gold = tone === "brand" ? "fill-sg-gold" : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-8 w-auto shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="currentColor"
    >
      <path className={ink} d="M0 0L100 0L89.5 10.5L0 10.5Z" />
      <path className={ink} d="M0 0H10.5V39.25H0Z" />
      <path className={gold} d="M0 44.75H100V55.25H0Z" />
      <path className={ink} d="M89.5 60.75H100V100H89.5Z" />
      <path className={ink} d="M10.5 89.5L100 89.5L100 100L0 100Z" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  href?: string | null;
  /** Show the "Accounting, Advisory and Consulting Services" line under the name. */
  descriptor?: boolean;
}

/** Horizontal lockup: mark · gold divider · SANYAGOLD (EB Garamond, tracked caps). */
export function Logo({ className, markClassName, wordClassName, href = "/", descriptor = false }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={markClassName} />
      <span aria-hidden="true" className="h-[1.6em] w-px shrink-0 bg-sg-gold" />
      <span className="flex flex-col">
        <span
          className={cn(
            "font-logo text-[1.3rem] leading-none font-medium tracking-[0.2em] text-sg-ink uppercase",
            wordClassName,
          )}
        >
          {siteConfig.name}
        </span>
        {descriptor && (
          <span className="mt-1.5 text-[0.5rem] leading-tight font-medium tracking-[0.2em] text-sg-ink/80 uppercase">
            Accounting, Advisory and Consulting Services
          </span>
        )}
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} aria-label={`${siteConfig.name} home`} className="rounded-lg focus-visible:outline-offset-4">
      {content}
    </Link>
  );
}
