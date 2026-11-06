import { notFound } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { services } from "@/content/services";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ServiceDetail } from "@/components/sections/service-detail";
import { JsonLd, QueryBoundary } from "@/components/shared";
import { getService } from "@/lib/data";
import { prefetchQueries } from "@/lib/prefetch";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} in Minnesota`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const state = await prefetchQueries([{ key: "service", slug }, { key: "services" }]);

  return (
    <HydrationBoundary state={state}>
      <QueryBoundary className="container-page my-16 h-[40rem]">
        <ServiceDetail slug={slug} />
      </QueryBoundary>
      <CtaBanner title={`Talk to us about ${service.shortTitle.toLowerCase()}`} />
      <JsonLd
        data={[
          serviceJsonLd(service),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </HydrationBoundary>
  );
}
