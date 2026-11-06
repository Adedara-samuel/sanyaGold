import "server-only";

import { cacheLife } from "next/cache";
import { dehydrate } from "@tanstack/react-query";
import { getFaqGroups, getPost, getPosts, getService, getServices, getTestimonials } from "@/lib/data";
import { makeQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";

type PrefetchTarget =
  | { key: "services" }
  | { key: "service"; slug: string }
  | { key: "testimonials" }
  | { key: "faqs" }
  | { key: "posts" }
  | { key: "post"; slug: string };

/**
 * Prefetches queries on the server (calling the data layer directly, not HTTP)
 * and returns dehydrated state for <HydrationBoundary>. The client hooks use the
 * same query keys, so they render instantly from cache and stay indexable.
 *
 * `"use cache"` lets the page prerender: TanStack timestamps data with Date.now(),
 * which Cache Components only allows inside a cached scope. Refresh cadence is set
 * by cacheLife — when a CMS is connected, add cacheTag() and revalidate on publish.
 */
export async function prefetchQueries(targets: PrefetchTarget[]) {
  "use cache";
  cacheLife("hours");

  const queryClient = makeQueryClient();

  await Promise.all(
    targets.map((target) => {
      switch (target.key) {
        case "services":
          return queryClient.prefetchQuery({ queryKey: queryKeys.services.all, queryFn: getServices });
        case "service":
          return queryClient.prefetchQuery({
            queryKey: queryKeys.services.detail(target.slug),
            queryFn: () => getService(target.slug),
          });
        case "testimonials":
          return queryClient.prefetchQuery({ queryKey: queryKeys.testimonials.all, queryFn: getTestimonials });
        case "faqs":
          return queryClient.prefetchQuery({ queryKey: queryKeys.faqs.all, queryFn: getFaqGroups });
        case "posts":
          return queryClient.prefetchQuery({ queryKey: queryKeys.posts.all, queryFn: getPosts });
        case "post":
          return queryClient.prefetchQuery({
            queryKey: queryKeys.posts.detail(target.slug),
            queryFn: () => getPost(target.slug),
          });
      }
    }),
  );

  return dehydrate(queryClient);
}
