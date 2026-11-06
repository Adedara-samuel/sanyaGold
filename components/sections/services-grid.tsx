"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ErrorState } from "@/components/query-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useServices } from "@/hooks/use-services";
import { icons } from "@/lib/icons";
import type { Service } from "@/lib/types";

export function ServicesGrid() {
  const { data, isPending, isError, refetch, isRefetching } = useServices();

  if (isPending) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-60 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorState message="We couldn't load our services." onRetry={() => refetch()} isRetrying={isRefetching} />;
  }

  return (
    <Stagger as="ul" className="grid gap-5 sm:grid-cols-2">
      {data.map((service) => (
        <StaggerItem as="li" key={service.slug} className="h-full">
          <ServiceCard service={service} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col rounded-2xl border bg-card p-7 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_24px_50px_-24px_color-mix(in_oklch,var(--accent)_55%,transparent)]"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-gold-ink transition-transform duration-300 group-hover:scale-105">
          <Icon className="size-5.5" aria-hidden="true" />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </div>
      <h3 className="mt-6 text-xl font-semibold">
        <Link
          href={`/services/${service.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{service.summary}</p>
      <p className="mt-auto pt-6 text-sm font-medium text-gold-ink">
        Learn more about {service.shortTitle.toLowerCase()}
      </p>
    </motion.div>
  );
}
