import "server-only";

/**
 * Server-side data access layer.
 *
 * Route handlers (/api/*) and server-side prefetching both read through these
 * functions. Today they return typed seed data from /content. To move to a
 * database or headless CMS, change ONLY this file — the API contract, the
 * React Query hooks and the pages stay exactly the same.
 */

import { faqGroups } from "@/content/faqs";
import { industries } from "@/content/industries";
import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import type {
  FaqGroup,
  Industry,
  PortalDocument,
  Post,
  PostSummary,
  Service,
  Testimonial,
} from "@/lib/types";

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getService(slug: string): Promise<Service | null> {
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getIndustries(): Promise<Industry[]> {
  return industries;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}

export async function getFaqGroups(): Promise<FaqGroup[]> {
  return faqGroups;
}

export async function getPosts(): Promise<PostSummary[]> {
  return [...posts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(({ body: _body, ...summary }) => summary);
}

export async function getPost(slug: string): Promise<Post | null> {
  return posts.find((post) => post.slug === slug) ?? null;
}

// TODO(portal): replace with a per-user query once authentication exists.
// Documents must be scoped to the signed-in client and never listed globally.
export async function getDocuments(): Promise<PortalDocument[]> {
  return [
    {
      id: "demo-1",
      name: "2025 Profit and Loss (sample).pdf",
      sizeBytes: 182_000,
      uploadedAt: "2026-10-02T15:00:00.000Z",
      category: "Financial statements",
      status: "processed",
    },
    {
      id: "demo-2",
      name: "Bank statements Q3 (sample).pdf",
      sizeBytes: 1_240_000,
      uploadedAt: "2026-10-20T15:00:00.000Z",
      category: "Bank & credit card",
      status: "in-review",
    },
  ];
}
