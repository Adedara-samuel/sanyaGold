"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { FirmBadge, FirmMark, firmAccent } from "@/components/firms/firm-mark";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ErrorState } from "@/components/query-state";
import { FaqList } from "@/components/sections/faq";
import { ServiceCard } from "@/components/sections/services-grid";
import { CtaButtons } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useService, useServices } from "@/hooks/use-services";
import { firmHref, firms, getFirm } from "@/content/firms";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ServiceDetail({ slug }: { slug: string }) {
  const { data: service, isPending, isError, refetch, isRefetching } = useService(slug);
  const { data: allServices } = useServices();

  if (isPending) {
    return (
      <div className="container-page space-y-6 py-20">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-64" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="container-page py-20">
        <ErrorState message="We couldn't load this service." onRetry={() => refetch()} isRetrying={isRefetching} />
      </div>
    );
  }

  const Icon = icons[service.icon];
  const firm = getFirm(service.firm);
  const otherFirm = firms.find((item) => item.id !== service.firm)!;
  // Related services come from the same firm first.
  const related = (allServices ?? [])
    .filter((item) => item.slug !== service.slug && item.firm === service.firm)
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-grain absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]"
        />
        <div aria-hidden="true" className="absolute -top-24 -left-24 size-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="container-page relative grid gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <Reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> All services
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-gold-ink">
                <Icon className="size-5.5" aria-hidden="true" />
              </span>
              <p className="eyebrow">Minnesota {service.shortTitle}</p>
            </div>
            <h1 className="mt-5 text-4xl leading-tight font-semibold sm:text-5xl">{service.title}</h1>
            {service.announcement && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/8 px-3.5 py-1.5 text-sm font-medium">
                <Sparkles className="size-4 text-success" aria-hidden="true" />
                {service.announcement}
              </p>
            )}
            <FirmBadge firm={service.firm} className="mt-5" />
            <p className="text-lead mt-5 max-w-2xl">{service.description}</p>
            <CtaButtons className="mt-8" secondary={{ label: "Ask a question", href: "/contact" }} />
          </Reveal>
          <Reveal delay={0.15} className="rounded-2xl border bg-card p-6">
            <h2 className="font-sans text-sm font-semibold">A great fit for</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {service.idealFor.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section pt-8" aria-labelledby="offerings-title">
        <div className="container-page">
          <h2 id="offerings-title" className="text-3xl font-semibold">
            What&apos;s included
          </h2>
          <Stagger as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((offering) => (
              <StaggerItem
                as="li"
                key={offering.title}
                className="rounded-2xl border bg-card p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-sans text-base font-semibold">{offering.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{offering.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section border-y bg-secondary/40" aria-labelledby="process-title">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="process-title" className="text-3xl font-semibold">
              How we work together
            </h2>
            <Stagger as="ol" className="mt-10 space-y-6">
              {service.process.map((step, index) => (
                <StaggerItem as="li" key={step.step} className="flex gap-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-serif font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold">{step.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Common questions</h2>
            <Reveal className="mt-10">
              <FaqList items={service.faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <div className="container-page">
          {related.length > 0 && (
            <>
              <h2 id="related-title" className="text-3xl font-semibold">
                More from {firm.shortName}
              </h2>
              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <ServiceCard service={item} />
                  </li>
                ))}
              </ul>
            </>
          )}

          <Reveal
            className={cn(
              "flex flex-col gap-5 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7",
              related.length > 0 && "mt-12",
              firmAccent[otherFirm.id].border,
            )}
          >
            <div className="flex items-start gap-4">
              <FirmMark firm={otherFirm.id} className="h-10" />
              <div>
                <h2 className="font-sans text-base font-semibold" id={related.length ? undefined : "related-title"}>
                  Also need help with {otherFirm.focus}?
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {otherFirm.name} is an independent firm that complements {firm.shortName}. Many clients use both.
                </p>
              </div>
            </div>
            <Link
              href={firmHref(otherFirm.id)}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-gold-ink"
            >
              Explore {otherFirm.shortName}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
