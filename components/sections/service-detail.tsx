"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ErrorState } from "@/components/query-state";
import { FaqList } from "@/components/sections/faq";
import { ServiceCard } from "@/components/sections/services-grid";
import { CtaButtons } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useService, useServices } from "@/hooks/use-services";
import { icons } from "@/lib/icons";

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
  const related = (allServices ?? []).filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="bg-grain absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
        <div aria-hidden="true" className="bg-accent/20 absolute -top-24 -left-24 size-96 rounded-full blur-3xl" />
        <div className="container-page relative grid gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <Reveal>
            <Link
              href="/services"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> All services
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="bg-accent-soft text-gold-ink grid size-12 place-items-center rounded-2xl">
                <Icon className="size-5.5" aria-hidden="true" />
              </span>
              <p className="eyebrow">Minnesota {service.shortTitle}</p>
            </div>
            <h1 className="mt-5 text-4xl leading-tight font-semibold sm:text-5xl">{service.title}</h1>
            <p className="text-lead mt-5 max-w-2xl">{service.description}</p>
            <CtaButtons className="mt-8" secondary={{ label: "Ask a question", href: "/contact" }} />
          </Reveal>
          <Reveal delay={0.15} className="bg-card rounded-2xl border p-6">
            <h2 className="font-sans text-sm font-semibold">A great fit for</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {service.idealFor.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="text-success mt-0.5 size-4 shrink-0" aria-hidden="true" />
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
                className="bg-card rounded-2xl border p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-sans text-base font-semibold">{offering.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{offering.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section bg-secondary/40 border-y" aria-labelledby="process-title">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="process-title" className="text-3xl font-semibold">
              How we work together
            </h2>
            <Stagger as="ol" className="mt-10 space-y-6">
              {service.process.map((step, index) => (
                <StaggerItem as="li" key={step.step} className="flex gap-5">
                  <span className="bg-primary text-primary-foreground grid size-10 shrink-0 place-items-center rounded-full font-serif font-semibold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold">{step.step}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{step.description}</p>
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

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="container-page">
            <h2 id="related-title" className="text-3xl font-semibold">
              Related services
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ServiceCard service={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
