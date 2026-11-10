import Link from "next/link";
import { LogoMark } from "@/components/layout/logo";
import { displayName, firmHref, getFirm } from "@/content/firms";
import type { FirmId } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Per-firm accents. Decorative only (marks, bars, borders), never small text,
 * so contrast stays within WCAG AA in both themes.
 */
export const firmAccent: Record<FirmId, { bar: string; soft: string; border: string; ring: string }> = {
  sanyagold: {
    bar: "bg-brand-mauve",
    soft: "bg-brand-mauve/8",
    border: "border-brand-mauve/35",
    ring: "ring-brand-mauve/30",
  },
  "oyebamiji-cpa": {
    bar: "bg-primary",
    soft: "bg-primary/5",
    border: "border-primary/25",
    ring: "ring-primary/25",
  },
};

/**
 * Visual mark for each firm. Sanyagold uses its existing logo mark.
 * W O Oyebamiji CPA LLC uses a typographic monogram until an official logo is supplied.
 * TODO: replace the monogram with the firm's official logo when available.
 */
export function FirmMark({ firm, className }: { firm: FirmId; className?: string }) {
  if (firm === "sanyagold") {
    return <LogoMark className={cn("h-10 w-auto", className)} />;
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl bg-primary font-serif text-[0.95rem] font-semibold tracking-wide text-primary-foreground ring-1 ring-accent/60 ring-offset-2 ring-offset-background",
        className,
      )}
    >
      {getFirm(firm).monogram}
    </span>
  );
}

/** Mark + full firm name, with the firm's focus underneath. */
export function FirmLockup({
  firm,
  className,
  headingLevel: Heading = "h3",
  link = false,
}: {
  firm: FirmId;
  className?: string;
  headingLevel?: "h2" | "h3";
  link?: boolean;
}) {
  const data = getFirm(firm);
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <FirmMark firm={firm} className={firm === "sanyagold" ? "h-11" : "size-11"} />
      <div className="min-w-0">
        <Heading className="text-xl leading-snug font-semibold text-balance">
          {link ? (
            <Link href={firmHref(firm)} className="underline-offset-4 hover:underline">
              {displayName(data)}
            </Link>
          ) : (
            displayName(data)
          )}
        </Heading>
        <p className="mt-0.5 text-sm text-muted-foreground first-letter:uppercase">{data.focus}</p>
      </div>
    </div>
  );
}

/** Small "Provided by …" pill used on service pages and cards. */
export function FirmBadge({
  firm,
  className,
  prefix = "Provided by",
}: {
  firm: FirmId;
  className?: string;
  prefix?: string;
}) {
  const data = getFirm(firm);
  return (
    <Link
      href={firmHref(firm)}
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-full border bg-card/80 py-1 pr-3.5 pl-1.5 text-xs font-medium backdrop-blur transition-colors hover:border-accent",
        firmAccent[firm].border,
        className,
      )}
    >
      <FirmMark
        firm={firm}
        className={firm === "sanyagold" ? "h-5" : "size-6 rounded-full text-[0.6rem] ring-0 ring-offset-0"}
      />
      <span className="truncate">
        <span className="text-muted-foreground">{prefix} </span>
        {data.name}
      </span>
    </Link>
  );
}
