import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { featuredIndustries, otherIndustries } from "@/content/industries";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared";
import { icons } from "@/lib/icons";

export function IndustriesFeatured({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <div>
      {showHeading && (
        <SectionHeading
          eyebrow="Who we serve"
          title="Specialists in three kinds of organizations"
          description="Focus means we know your rules, your reporting and your challenges, and you don't pay for us to learn them."
        />
      )}

      <Stagger as="ul" className="mt-14 grid gap-5 lg:grid-cols-3">
        {featuredIndustries.map((industry) => {
          const Icon = icons[industry.icon];
          return (
            <StaggerItem
              as="li"
              key={industry.slug}
              id={industry.slug}
              className="flex flex-col rounded-2xl border bg-card p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="size-5.5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{industry.name}</h3>
              <p className="mt-1 text-sm font-medium text-gold-ink">{industry.headline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{industry.description}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {industry.points?.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">We also work with</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {otherIndustries.map((industry) => {
            const Icon = icons[industry.icon];
            return (
              <li key={industry.slug}>
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {industry.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/industries"
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-ink"
        >
          See all industries
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  );
}
