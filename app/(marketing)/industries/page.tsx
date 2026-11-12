import { industryFocus, otherIndustries } from "@/content/industries";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaBanner } from "@/components/sections/cta-banner";
import { IndustriesFeatured } from "@/components/sections/industries-featured";
import { CtaButtons, JsonLd, PageHero, SectionHeading } from "@/components/shared";
import { icons } from "@/lib/icons";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve",
  description:
    "Specialist accounting and tax support for Minnesota nonprofits, small businesses and professional services firms.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Focused expertise for the organizations we know best"
        description="We specialize in three areas, so the advice you get is specific to your rules, your reporting and your goals."
      >
        <CtaButtons secondary={null} />
      </PageHero>

      <section className="container-page pb-20" aria-label="Featured specialties">
        <IndustriesFeatured showHeading={false} />
      </section>

      <section className="section" aria-labelledby="focus-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Industry focus"
            title={<span id="focus-title">Industry-Focused Accounting Services</span>}
          />
          <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-2">
            {industryFocus.map((industry) => {
              const Icon = icons[industry.icon];
              return (
                <StaggerItem as="li" key={industry.name} className="flex gap-5 rounded-2xl border bg-card p-6 sm:p-7">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-gold-ink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold">{industry.name}</h3>
                    <div className="mt-2 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                      {industry.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section border-y bg-secondary/40" aria-labelledby="also-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Also serving"
            title={<span id="also-title">Other industries we support</span>}
            description="Don't see your industry? Most of what we do applies to any well-run organization. Just ask."
          />
          <Stagger as="ul" className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherIndustries.map((industry) => {
              const Icon = icons[industry.icon];
              return (
                <StaggerItem
                  as="li"
                  key={industry.slug}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-5"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-gold-ink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{industry.name}</span>
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
