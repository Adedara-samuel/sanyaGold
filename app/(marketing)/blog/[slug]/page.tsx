import { notFound } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { posts } from "@/content/posts";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PostArticle } from "@/components/sections/post-article";
import { JsonLd } from "@/components/shared";
import { getPost } from "@/lib/data";
import { prefetchQueries } from "@/lib/prefetch";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article" });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const state = await prefetchQueries([{ key: "post", slug }]);

  return (
    <HydrationBoundary state={state}>
      <PostArticle slug={slug} />
      <CtaBanner title="Want advice for your situation?" />
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </HydrationBoundary>
  );
}
