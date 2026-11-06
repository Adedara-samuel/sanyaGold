import { HydrationBoundary } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaButtons, JsonLd, PageHero, SectionHeading } from "@/components/shared";
import { prefetchQueries } from "@/lib/prefetch";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Tax, accounting & bookkeeping, audit & review and business consulting for Minnesota nonprofits and small businesses.",
  path: "/services",
});

const steps = [
  { title: "Free consultation", description: "A relaxed conversation about your goals and what you need." },
  { title: "Clear proposal", description: "A written scope and a fixed or monthly fee, with no surprises." },
  { title: "Easy onboarding", description: "Secure document upload and a simple checklist to get started." },
  { title: "Ongoing support", description: "Regular check-ins and a team that knows your organization." },
];

export default async function ServicesPage() {
  const state = await prefetchQueries([{ key: "services" }]);

  return (
    <HydrationBoundary state={state}>
      <PageHero
        eyebrow="Services"
        title="Accounting, tax and advisory, made simple"
        description="Whether you need a reliable monthly close, an accurate Form 990 or a plan for growth, we'll match you with the right service."
      >
        <CtaButtons secondary={null} />
      </PageHero>

      <section className="container-page pb-20" aria-label="Our services">
        <ServicesGrid />
      </section>

      <section className="section bg-secondary/40 border-y" aria-labelledby="how-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title={<span id="how-title">Getting started is easy</span>}
            description="Four simple steps from first conversation to ongoing support."
          />
          <Stagger as="ol" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <StaggerItem as="li" key={step.title} className="bg-card relative rounded-2xl border p-6">
                <span className="text-gold-ink font-serif text-3xl font-semibold">0{index + 1}</span>
                <h3 className="mt-3 font-sans text-base font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="text-muted-foreground mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {["No long-term contracts required", "Fixed, transparent fees", "Serving clients across Minnesota"].map((point) => (
              <span key={point} className="inline-flex items-center gap-2">
                <CheckCircle2 className="text-success size-4" aria-hidden="true" />
                {point}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </HydrationBoundary>
  );
}
