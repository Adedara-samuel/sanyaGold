import { HydrationBoundary } from "@tanstack/react-query";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PostList } from "@/components/sections/post-list";
import { JsonLd, PageHero, QueryBoundary } from "@/components/shared";
import { prefetchQueries } from "@/lib/prefetch";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Plain-English guides on tax, nonprofit compliance and small business finance from Sanyagold, a Minnesota CPA firm.",
  path: "/blog",
});

export default async function BlogPage() {
  const state = await prefetchQueries([{ key: "posts" }]);

  return (
    <HydrationBoundary state={state}>
      <PageHero
        eyebrow="Blog"
        title="Guides and insights"
        description="Short, practical reads on tax, compliance and running a healthy organization in Minnesota."
      />
      <section className="container-page pb-20" aria-label="Articles">
        <QueryBoundary className="h-96">
          <PostList />
        </QueryBoundary>
      </section>
      <CtaBanner />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
    </HydrationBoundary>
  );
}
