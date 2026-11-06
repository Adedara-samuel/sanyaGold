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
      className="group bg-card hover:border-accent/60 relative flex h-full flex-col rounded-2xl border p-7 shadow-sm transition-[border-color,box-shadow] duration-300 hover:shadow-[0_24px_50px_-24px_color-mix(in_oklch,var(--accent)_55%,transparent)]"
    >
      <div className="flex items-start justify-between">
        <span className="bg-accent-soft text-gold-ink grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105">
          <Icon className="size-5.5" aria-hidden="true" />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="text-muted-foreground group-hover:text-foreground size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <h3 className="mt-6 text-xl font-semibold">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
          {service.title}
        </Link>
      </h3>
      <p className="text-muted-foreground mt-3 leading-relaxed">{service.summary}</p>
      <p className="text-gold-ink mt-auto pt-6 text-sm font-medium">Learn more about {service.shortTitle.toLowerCase()}</p>
    </motion.div>
  );
}
