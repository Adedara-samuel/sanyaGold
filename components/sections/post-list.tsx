"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ErrorState } from "@/components/query-state";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/hooks/use-posts";
import { formatDate } from "@/lib/utils";

export function PostList() {
  const { data, isPending, isError, refetch, isRefetching } = usePosts();

  if (isPending) {
    return (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-72 rounded-2xl" />
        ))}
      </div>
    );
  }
  if (isError)
    return <ErrorState message="We couldn't load articles." onRetry={() => refetch()} isRetrying={isRefetching} />;
  if (!data.length) return <p className="text-center text-muted-foreground">New articles are on the way.</p>;

  return (
    <Stagger as="ul" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {data.map((post) => (
        <StaggerItem as="li" key={post.slug} className="h-full">
          <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Abstract cover — replace with a featured image per post if desired. */}
            <div aria-hidden="true" className="relative h-36 bg-gradient-to-br from-accent-soft via-secondary to-card">
              <div className="bg-grain absolute inset-0 opacity-60" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs">
                <Badge variant="gold">{post.category}</Badge>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden="true" /> {post.readingMinutes} min read
                </span>
              </div>
              <h2 className="mt-4 text-xl leading-snug font-semibold">
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
