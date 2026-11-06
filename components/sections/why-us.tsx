import { Clock, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaButtons, SectionHeading } from "@/components/shared";

const reasons = [
  {
    icon: MessageCircle,
    title: "Plain-English advice",
    description: "No jargon. We explain what your numbers mean and what to do next.",
  },
  {
    icon: Clock,
    title: "Responsive, year-round",
    description: "We're here all year, not just in tax season, and we reply quickly.",
  },
  {
    icon: Sparkles,
    title: "Specialists, not generalists",
    description: "Deep experience with nonprofits, small businesses and professional services.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed and accountable",
    description: "A Minnesota-licensed CPA firm held to professional and ethical standards.",
  },
];

export function WhyUs() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Sanyagold"
            title={<span id="why-title">A CPA partner who feels like part of your team</span>}
            description="We combine the expertise of a CPA firm with the attention of a boutique practice. You'll always know who's working on your account and what's happening next."
          />
          <Reveal delay={0.1}>
            <CtaButtons className="mt-8" secondary={{ label: "Meet the team", href: "/about" }} />
          </Reveal>
        </div>

        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <StaggerItem
              as="li"
              key={reason.title}
              className="rounded-2xl border bg-card p-6 transition-shadow duration-300 hover:shadow-md"
            >
              <reason.icon className="size-6 text-gold-ink" aria-hidden="true" />
              <h3 className="mt-4 font-sans text-base font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
