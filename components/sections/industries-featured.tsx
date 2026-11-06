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
              className="bg-card flex flex-col rounded-2xl border p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="bg-primary text-primary-foreground grid size-12 place-items-center rounded-2xl">
                <Icon className="size-5.5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{industry.name}</h3>
              <p className="text-gold-ink mt-1 text-sm font-medium">{industry.headline}</p>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{industry.description}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {industry.points?.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check className="text-success mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="mt-10 text-center">
        <p className="text-muted-foreground text-sm">We also work with</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {otherIndustries.map((industry) => {
            const Icon = icons[industry.icon];
            return (
              <li key={industry.slug}>
                <Link
                  href="/industries"
                  className="bg-card/70 hover:border-accent hover:text-foreground text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {industry.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/industries" className="text-gold-ink group mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
          See all industries
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  );
}
