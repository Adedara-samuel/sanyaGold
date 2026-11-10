import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FirmLockup, firmAccent } from "@/components/firms/firm-mark";
import { Reveal } from "@/components/motion/reveal";
import { ServicesGrid } from "@/components/sections/services-grid";
import { QueryBoundary } from "@/components/shared";
import { firmHref, getFirm } from "@/content/firms";
import type { FirmId } from "@/lib/types";
import { cn } from "@/lib/utils";

/** One firm's identity header followed by that firm's service cards. */
export function FirmServicesSection({ firm, className }: { firm: FirmId; className?: string }) {
  const data = getFirm(firm);
  return (
    <section className={cn("scroll-mt-24", className)} id={firm} aria-label={`Services from ${data.name}`}>
      <Reveal
        className={cn(
          "flex flex-col gap-5 rounded-3xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8",
          firmAccent[firm].border,
          firmAccent[firm].soft,
        )}
      >
        <div>
          <FirmLockup firm={firm} headingLevel="h2" />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.description}</p>
        </div>
        <Link
          href={firmHref(firm)}
          className="group inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-gold-ink sm:self-center"
        >
          About {data.shortName}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </Reveal>
      <div className="mt-8">
        <QueryBoundary className="h-[32rem]">
          <ServicesGrid firm={firm} />
        </QueryBoundary>
      </div>
    </section>
  );
}
