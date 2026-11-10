import { Check } from "lucide-react";
import { FirmMark, firmAccent } from "@/components/firms/firm-mark";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared";
import { displayName, firms, independenceStatement } from "@/content/firms";
import { cn } from "@/lib/utils";

const roles: Record<string, string> = {
  sanyagold: "Ongoing accounting, book-keeping, payroll, HR and business advisory support throughout the year.",
  "oyebamiji-cpa": "Tax planning and preparation, audits, single audits, reviews and attestation services.",
};

const options = [
  {
    title: "Work with Sanyagold",
    description: "For book-keeping, payroll, HR management and business advisory.",
  },
  {
    title: "Work with W O Oyebamiji CPA LLC",
    description: "For tax, audits, single audits, reviews and attestation.",
  },
  {
    title: "Use both firms",
    description: "Well-kept books from Sanyagold make tax planning and preparation smoother.",
  },
];

/** Explains how the two independent firms complement one another. */
export function FirmsComplement({ className }: { className?: string }) {
  return (
    <section className={cn("section", className)} aria-labelledby="complement-title">
      <div className="container-page">
        <SectionHeading
          eyebrow="Two firms, working side by side"
          title={<span id="complement-title">Independent firms that complement each other</span>}
          description="Many clients use services from both firms. Others need just one. You choose the support that fits your organization."
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
          {firms.flatMap((firm, index) => {
            const card = (
              <Reveal
                key={firm.id}
                delay={index * 0.1}
                direction={index === 0 ? "right" : "left"}
                className={cn("flex gap-5 rounded-2xl border bg-card p-6 sm:p-7", firmAccent[firm.id].border)}
              >
                <FirmMark firm={firm.id} className={firm.id === "sanyagold" ? "h-11" : "size-11"} />
                <div>
                  <h3 className="font-sans text-base font-semibold">{displayName(firm)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{roles[firm.id]}</p>
                </div>
              </Reveal>
            );
            if (index === 0) return [card];
            return [
              <div key="connector" aria-hidden="true" className="flex items-center justify-center">
                <span className="grid size-11 place-items-center rounded-full border bg-background font-serif text-xl text-gold-ink shadow-sm">
                  +
                </span>
              </div>,
              card,
            ];
          })}
        </div>

        <Stagger as="ul" className="mt-10 grid gap-4 md:grid-cols-3">
          {options.map((option) => (
            <StaggerItem as="li" key={option.title} className="flex gap-3 rounded-2xl bg-secondary/60 p-5">
              <Check className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              <div>
                <h3 className="font-sans text-sm font-semibold">{option.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            {independenceStatement} Each engagement is with the firm that provides the service.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
