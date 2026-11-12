import { otherIndustries } from "@/content/industries";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaBanner } from "@/components/sections/cta-banner";
import { IndustriesFeatured } from "@/components/sections/industries-featured";
import { CtaButtons, JsonLd, PageHero, SectionHeading } from "@/components/shared";
import { icons } from "@/lib/icons";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve",
  description:
    "Industry-specific accounting, tax and audit support for Minnesota nonprofits, small businesses, professional services, government, education, healthcare, construction, real estate, manufacturing, retail, hospitality and logistics.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Focused expertise for the organizations we know best"
        description="We specialize in three areas and support organizations across many more, so the advice you get fits your rules, your reporting and your goals."
      >
        <CtaButtons secondary={null} />
      </PageHero>

      <section className="container-page pb-20" aria-label="Featured specialties">
        <IndustriesFeatured showHeading={false} />
      </section>

      <section className="section border-y bg-secondary/40" aria-labelledby="also-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Also serving"
            title={<span id="also-title">Other industries we support</span>}
            description="Don't see your industry? Most of what we do applies to any well-run organization. Just ask."
          />
          <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherIndustries.map((industry) => {
              const Icon = icons[industry.icon];
              return (
                <StaggerItem as="li" key={industry.slug} className="flex gap-4 rounded-2xl border bg-card p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-gold-ink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-medium">{industry.name}</span>
                    {industry.description && (
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {industry.description}
                      </span>
                    )}
                  </span>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
    </>
  );
}
