"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Info } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ErrorState } from "@/components/query-state";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePost } from "@/hooks/use-posts";
import type { PostBlock } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 text-2xl font-semibold">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 font-sans text-lg font-semibold">{block.text}</h3>;
    case "p":
      return <p className="mt-5 leading-relaxed">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-5 list-disc space-y-2 pl-6 leading-relaxed marker:text-gold-ink">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="mt-8 flex gap-3 rounded-2xl border border-accent/40 bg-accent-soft p-5 text-sm leading-relaxed">
          <Info className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden="true" />
          <p>{block.text}</p>
        </aside>
      );
  }
}

export function PostArticle({ slug }: { slug: string }) {
  const { data: post, isPending, isError, refetch, isRefetching } = usePost(slug);

  if (isPending) {
    return (
      <div className="container-page max-w-3xl space-y-5 py-16">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-80" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="container-page max-w-3xl py-16">
        <ErrorState message="We couldn't load this article." onRetry={() => refetch()} isRetrying={isRefetching} />
      </div>
    );
  }

  return (
    <article className="container-page max-w-3xl pt-12 pb-20 sm:pt-16">
      <Reveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All articles
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <Badge variant="gold">{post.category}</Badge>
          <time dateTime={post.publishedAt} className="text-muted-foreground">
            {formatDate(post.publishedAt)}
          </time>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" /> {post.readingMinutes} min read
          </span>
        </div>
        <h1 className="mt-5 text-4xl leading-tight font-semibold sm:text-5xl">{post.title}</h1>
        <p className="text-lead mt-5">{post.excerpt}</p>
        <p className="mt-4 text-sm text-muted-foreground">By {post.author}</p>
      </Reveal>

      <Reveal delay={0.1} className="border-t pt-4 text-[1.0625rem]">
        {post.body.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </Reveal>

      <p className="mt-12 border-t pt-6 text-xs leading-relaxed text-muted-foreground">
        This article is general information, not tax, legal or accounting advice for your specific situation. Please
        talk with a qualified professional before acting on it.
      </p>
    </article>
  );
}
