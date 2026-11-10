"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ErrorState } from "@/components/query-state";
import { FirmLockup, firmAccent } from "@/components/firms/firm-mark";
import { Skeleton } from "@/components/ui/skeleton";
import { firmHref, firms } from "@/content/firms";
import { useServices } from "@/hooks/use-services";
import { cn } from "@/lib/utils";

/** Side-by-side presentation of both firms and the services each one provides. */
export function FirmsOverview() {
  const { data, isPending, isError, refetch, isRefetching } = useServices();

  if (isPending) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[30rem] rounded-3xl" />
        <Skeleton className="h-[30rem] rounded-3xl" />
      </div>
    );
  }
  if (isError) {
    return <ErrorState message="We couldn't load our services." onRetry={() => refetch()} isRetrying={isRefetching} />;
  }

  return (
    <Stagger as="ul" className="grid items-start gap-6 lg:grid-cols-2">
      {firms.map((firm) => {
        const firmServices = data.filter((service) => service.firm === firm.id);
        return (
          <StaggerItem
            as="li"
            key={firm.id}
            className="relative flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <span aria-hidden="true" className={cn("h-1.5 w-full", firmAccent[firm.id].bar)} />
            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <FirmLockup firm={firm.id} />
              <p className="mt-6 leading-relaxed text-muted-foreground">{firm.summary}</p>

              <ul className="mt-7 divide-y rounded-2xl border">
                {firmServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-start justify-between gap-4 px-5 py-4 transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-secondary/60"
                    >
                      <span>
                        <span className="block font-medium">{service.title}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                          {service.summary}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={firmHref(firm.id)}
                className="group mt-7 inline-flex items-center gap-1.5 self-start text-sm font-medium text-gold-ink"
              >
                About {firm.shortName}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
