import Link from "next/link";
import { WoCrest } from "@/components/firms/firm-mark";
import { firmHref } from "@/content/firms";
import { cn } from "@/lib/utils";

/**
 * W O Oyebamiji CPA LLC horizontal lockup (approved "Assurance Crest"):
 * crest · brass divider · W O OYEBAMIJI (Playfair Display) over CPA LLC.
 */
export function WoLogo({
  className,
  markClassName,
  href = firmHref("oyebamiji-cpa"),
}: {
  className?: string;
  markClassName?: string;
  href?: string | null;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <WoCrest className={cn("h-9", markClassName)} />
      <span aria-hidden="true" className="h-[1.9em] w-px shrink-0 bg-wo-brass" />
      <span className="flex flex-col">
        <span className="font-crest text-[1.2rem] leading-none font-semibold tracking-[0.1em] whitespace-nowrap text-wo-ink">
          W O OYEBAMIJI
        </span>
        <span className="mt-1 text-[0.6rem] leading-none font-semibold tracking-[0.62em] text-wo-ink/85">CPA LLC</span>
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} aria-label="W O Oyebamiji CPA LLC" className="rounded-lg focus-visible:outline-offset-4">
      {content}
    </Link>
  );
}
