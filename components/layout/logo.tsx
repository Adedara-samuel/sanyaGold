import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Sanyagold logo — vector rebuild of the existing brand mark (two interlocking
 * hooks forming a hexagonal "S") so it stays crisp at any size and adapts to
 * dark mode. Original PNGs are kept in /public/brand for reference.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="-400 -440 800 880"
      className={cn("h-8 w-auto text-brand-mauve", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="currentColor"
    >
      <path d="M-30 -428L-390 -220L-390 220L-185 338L200 116L200 -33L89 -33L89 50L-185 208L-277 155L-277 -155L26 -330Z" />
      <path d="M30 428L390 220L390 -220L185 -338L-200 -116L-200 33L-89 33L-89 -50L185 -208L277 -155L277 155L-26 330Z" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  href?: string | null;
}

export function Logo({ className, markClassName, wordClassName, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span
        className={cn(
          "font-serif text-[1.375rem] leading-none font-semibold tracking-tight text-logo-word",
          wordClassName,
        )}
      >
        {siteConfig.name}
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
