import Link from "next/link";
import { HydrationBoundary } from "@tanstack/react-query";
import { ArrowRight, BookOpen, CalendarCheck, Lock, Upload } from "lucide-react";
import { allFaqs } from "@/content/faqs";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqTabs } from "@/components/sections/faq";
import { JsonLd, PageHero, QueryBoundary, SectionHeading } from "@/components/shared";
import { prefetchQueries } from "@/lib/prefetch";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources & FAQs",
  description:
    "Answers to common questions, plain-English guides and client tools from Sanyagold, a Minnesota CPA firm.",
  path: "/resources",
});

const tools = [
  {
    icon: BookOpen,
    title: "Blog & guides",
    description: "Plain-English articles on tax, nonprofits and small business finance.",
    href: "/blog",
  },
  {
    icon: Upload,
    title: "Send documents",
    description: "Upload files for your accountant through the client portal.",
    href: "/portal/documents",
  },
  {
    icon: Lock,
    title: "Client portal",
    description: "Sign in to see your documents and requests.",
    href: "/portal/login",
  },
  {
    icon: CalendarCheck,
    title: "Book a consultation",
    description: "Find a time that works for a free first conversation.",
    href: "/book",
  },
];

export default async function ResourcesPage() {
  const state = await prefetchQueries([{ key: "faqs" }]);

  return (
    <HydrationBoundary state={state}>
      <PageHero
        eyebrow="Resources"
        title="Helpful answers and client tools"
        description="Quick answers to common questions, guides you can read in five minutes and the tools you need to work with us."
      />

      <section className="container-page pb-20" aria-label="Client resources">
        <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <StaggerItem
              as="li"
              key={tool.title}
              className="group relative rounded-2xl border bg-card p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <tool.icon className="size-6 text-gold-ink" aria-hidden="true" />
              <h2 className="mt-4 font-sans text-base font-semibold">
                <Link href={tool.href} className="after:absolute after:inset-0 after:rounded-2xl">
                  {tool.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
              <ArrowRight
                className="mt-4 size-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="faqs" className="section border-y bg-secondary/40" aria-labelledby="faqs-title">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="FAQs" title={<span id="faqs-title">Frequently asked questions</span>} />
          <Reveal className="mt-12">
            <QueryBoundary className="h-96">
              <FaqTabs />
            </QueryBoundary>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Still have questions?"
        description="We're happy to talk it through. Book a free consultation or send us a message."
      />
      <JsonLd data={faqJsonLd(allFaqs)} />
    </HydrationBoundary>
  );
}
