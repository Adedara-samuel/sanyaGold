import { HydrationBoundary } from "@tanstack/react-query";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FirmsComplement } from "@/components/sections/firms-complement";
import { FirmsOverview } from "@/components/sections/firms-overview";
import { CtaButtons, JsonLd, PageHero, QueryBoundary } from "@/components/shared";
import { prefetchQueries } from "@/lib/prefetch";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Firms",
  description:
    "Sanyagold Accounting, Advisory and Consulting Services and W O Oyebamiji CPA LLC: two independent, complementary firms serving Minnesota nonprofits and small businesses.",
  path: "/firms",
});

export default async function FirmsPage() {
  const state = await prefetchQueries([{ key: "services" }]);

  return (
    <HydrationBoundary state={state}>
      <PageHero
        eyebrow="Our firms"
        title="Two independent firms, one place to start"
        description="Sanyagold provides accounting, payroll, HR and business advisory. W O Oyebamiji CPA LLC provides tax, audit, review and attestation. Engage either firm independently, or benefit from both."
      >
        <CtaButtons secondary={null} />
      </PageHero>

      <section className="container-page pb-20" aria-label="The two firms">
        <QueryBoundary className="h-[32rem]">
          <FirmsOverview />
        </QueryBoundary>
      </section>

      <FirmsComplement className="border-t bg-secondary/40" />

      <CtaBanner />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our firms", path: "/firms" },
        ])}
      />
    </HydrationBoundary>
  );
}
