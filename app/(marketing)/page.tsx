import Link from "next/link";
import { HydrationBoundary } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { homeFaqs } from "@/content/faqs";
import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqPreview } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { IndustriesFeatured } from "@/components/sections/industries-featured";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsBar } from "@/components/sections/stats";
import { TeamGrid } from "@/components/sections/team";
import { TestimonialsCarousel } from "@/components/sections/testimonials";
import { WhyUs } from "@/components/sections/why-us";
import { CtaButtons, JsonLd, QueryBoundary, SectionHeading } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { prefetchQueries } from "@/lib/prefetch";
import { faqJsonLd } from "@/lib/seo";

export default async function HomePage() {
  const state = await prefetchQueries([{ key: "services" }, { key: "testimonials" }, { key: "faqs" }]);

  return (
    <HydrationBoundary state={state}>
      <Hero />

      <StatsBar />

      <section className="section" aria-labelledby="services-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title={<span id="services-title">Everything your finances need, under one roof</span>}
            description="Four core services, each with its own team and process, so you get exactly the help you need."
          />
          <div className="mt-14">
            <QueryBoundary className="h-[32rem]">
              <ServicesGrid />
            </QueryBoundary>
          </div>
          <Reveal className="mt-10 flex justify-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/services">
                Explore all services
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <div className="bg-secondary/40 border-y">
        <WhyUs />
      </div>

      <section className="section" aria-label="Industries">
        <div className="container-page">
          <IndustriesFeatured />
        </div>
      </section>

      <section className="section bg-secondary/40 border-y" aria-labelledby="team-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our team"
            title={<span id="team-title">Real people who know your name</span>}
            description="You'll work directly with licensed professionals, not a call center."
          />
          <div className="mt-14">
            <TeamGrid />
          </div>
          <Reveal className="mt-10 flex justify-center">
            <Button asChild variant="outline" className="group">
              <Link href="/about">
                About Sanyagold
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="testimonials-title">
        <div className="container-page">
          <SectionHeading eyebrow="Client stories" title={<span id="testimonials-title">What our clients say</span>} />
          <div className="mt-12">
            <QueryBoundary className="mx-auto h-80 max-w-3xl">
              <TestimonialsCarousel />
            </QueryBoundary>
          </div>
        </div>
      </section>

      <section className="section bg-secondary/40 border-y" aria-labelledby="faq-title">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQs"
              title={<span id="faq-title">Questions, answered</span>}
              description="Can't find what you're looking for? We're happy to help."
            />
            <Reveal delay={0.1}>
              <CtaButtons className="mt-8" secondary={{ label: "See all FAQs", href: "/resources#faqs" }} />
            </Reveal>
          </div>
          <Reveal>
            <QueryBoundary className="h-80">
              <FaqPreview />
            </QueryBoundary>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </HydrationBoundary>
  );
}
