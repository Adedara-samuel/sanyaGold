import Link from "next/link";
import { notFound } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import { FirmMark, firmAccent } from "@/components/firms/firm-mark";
import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaButtons, JsonLd, QueryBoundary, SectionHeading } from "@/components/shared";
import { firmHref, firms, firmSlugs, getFirmBySlug, independenceStatement } from "@/content/firms";
import { prefetchQueries } from "@/lib/prefetch";
import { breadcrumbJsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return firms.map((firm) => ({ slug: firmSlugs[firm.id] }));
}

export async function generateMetadata({ params }: PageProps<"/firms/[slug]">) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) return {};
  return pageMetadata({ title: firm.name, description: firm.summary, path: firmHref(firm.id) });
}

export default async function FirmPage({ params }: PageProps<"/firms/[slug]">) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) notFound();

  const otherFirm = firms.find((item) => item.id !== firm.id)!;
  const state = await prefetchQueries([{ key: "services" }]);

  return (
    <HydrationBoundary state={state}>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-grain absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute -top-24 -left-24 size-96 rounded-full blur-3xl",
            firm.id === "sanyagold" ? "bg-brand-mauve/20" : "bg-accent/25",
          )}
        />
        <div className="container-page relative grid gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <Reveal>
            <FirmMark firm={firm.id} className={firm.id === "sanyagold" ? "h-16" : "size-16 rounded-2xl text-xl"} />
            <p className="eyebrow mt-8 first-letter:uppercase">{firm.focus}</p>
            <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">{firm.name}</h1>
            <p className="text-lead mt-5 max-w-2xl">{firm.description}</p>
            <CtaButtons className="mt-8" secondary={{ label: "Ask a question", href: "/contact" }} />
          </Reveal>
          <Reveal
            delay={0.15}
            className={cn("overflow-hidden rounded-2xl border bg-card", firmAccent[firm.id].border)}
          >
            <span aria-hidden="true" className={cn("block h-1.5", firmAccent[firm.id].bar)} />
            <div className="p-6">
              <h2 className="font-sans text-sm font-semibold">Clients engage us for</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {firm.highlights.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              {firm.licensing && (
                <div className="mt-6 flex gap-2.5 border-t pt-5 text-sm">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                  <p className="text-muted-foreground">
                    Licensed CPA firm ·{" "}
                    <a
                      href={firm.licensing.licensingBoardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-4"
                    >
                      {firm.licensing.licensingBoard}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <br />
                    {firm.licensing.firmPermit}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-8" aria-labelledby="firm-services-title">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Services"
            title={<span id="firm-services-title">Services from {firm.shortName}</span>}
          />
          <div className="mt-10">
            <QueryBoundary className="h-[32rem]">
              <ServicesGrid firm={firm.id} />
            </QueryBoundary>
          </div>
        </div>
      </section>

      <section className="section border-y bg-secondary/40" aria-labelledby="complement-title">
        <div className="container-page">
          <Reveal
            className={cn(
              "grid gap-8 rounded-3xl border bg-card p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center",
              firmAccent[otherFirm.id].border,
            )}
          >
            <div className="flex items-start gap-5">
              <FirmMark firm={otherFirm.id} className={otherFirm.id === "sanyagold" ? "h-12" : "size-12"} />
              <div>
                <p className="eyebrow">A complementary, independent firm</p>
                <h2 id="complement-title" className="mt-3 text-2xl font-semibold sm:text-3xl">
                  {otherFirm.name}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  {otherFirm.summary} Many clients use both firms; others need just one. You decide what fits.
                </p>
              </div>
            </div>
            <Link
              href={firmHref(otherFirm.id)}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-gold-ink"
            >
              Explore {otherFirm.shortName}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            {independenceStatement}
          </p>
        </div>
      </section>

      <CtaBanner />
      <JsonLd
        data={[
          organizationJsonLd(firm.id),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our firms", path: "/firms" },
            { name: firm.name, path: firmHref(firm.id) },
          ]),
        ]}
      />
    </HydrationBoundary>
  );
}
