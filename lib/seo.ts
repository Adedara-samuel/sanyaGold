import type { Metadata } from "next";
import { firmHref, getFirm } from "@/content/firms";
import { siteConfig } from "@/lib/site-config";
import type { Faq, FirmId, Post } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

/** Consistent per-page metadata with canonical URL, Open Graph and Twitter tags. */
export function pageMetadata({ title, description, path, type = "website" }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      type,
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

/** Stable JSON-LD @id for each firm, so services can reference their provider. */
export function firmOrganizationId(firm: FirmId) {
  return firm === "sanyagold" ? absoluteUrl("/#organization") : absoluteUrl(`${firmHref(firm)}#organization`);
}

/**
 * One organization node per independent firm. Contact details are the shared
 * website contact until each firm's own details are confirmed.
 */
export function organizationJsonLd(firmId: FirmId = "sanyagold") {
  const { address, contact, socials, openingHoursSpec } = siteConfig;
  const firm = getFirm(firmId);
  return {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "LocalBusiness"],
    "@id": firmOrganizationId(firmId),
    name: firm.name,
    legalName: firm.name,
    description: firm.description,
    url: firmId === "sanyagold" ? absoluteUrl("/") : absoluteUrl(firmHref(firmId)),
    ...(firmId === "sanyagold" ? { logo: absoluteUrl("/brand/sanyagold-logo.svg") } : {}),
    image: absoluteUrl("/opengraph-image"),
    telephone: `+1-${contact.phone}`,
    email: contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: { "@type": "State", name: "Minnesota" },
    openingHoursSpecification: openingHoursSpec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    // Placeholder social URLs contain "[" and are filtered out until replaced.
    ...(firmId === "sanyagold" ? { sameAs: Object.values(socials).filter((url) => !url.includes("[")) } : {}),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/opengraph-image"),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: { title: string; description: string; slug: string; firm: FirmId }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    provider: { "@id": firmOrganizationId(service.firm) },
    areaServed: { "@type": "State", name: "Minnesota" },
    url: absoluteUrl(`/services/${service.slug}`),
  };
}
