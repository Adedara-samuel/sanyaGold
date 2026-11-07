"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { ErrorState } from "@/components/query-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonials } from "@/hooks/use-testimonials";
import { cn, initials } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export function TestimonialsCarousel() {
  const { data, isPending, isError, refetch, isRefetching } = useTestimonials();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = data?.length ?? 0;

  const go = useCallback(
    (delta: number) => {
      if (!count) return;
      setDirection(delta);
      setIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || reduce || count < 2) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, count, go]);

  if (isPending) return <Skeleton className="mx-auto h-72 max-w-3xl rounded-3xl" />;
  if (isError)
    return <ErrorState message="We couldn't load testimonials." onRetry={() => refetch()} isRetrying={isRefetching} />;
  if (!count) return null;

  const current = data[index]!;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm sm:p-12">
        <Quote aria-hidden="true" className="absolute top-6 right-6 size-16 text-accent/50" />
        <div aria-live={paused ? "polite" : "off"} className="relative min-h-[15rem]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.figure
              key={current.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              custom={direction}
              initial={{ opacity: 0, x: reduce ? 0 : direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : direction * -40 }}
              transition={{ duration: reduce ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.isPlaceholder && (
                <Badge variant="warning" className="mb-5">
                  Sample — replace with a real client review
                </Badge>
              )}
              {current.rating && (
                <div className="mb-4 flex gap-0.5" aria-label={`Rated ${current.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className={cn("size-4", i < current.rating! ? "fill-accent text-accent" : "text-border")}
                    />
                  ))}
                </div>
              )}
              <blockquote className="font-serif text-xl leading-relaxed sm:text-2xl">“{current.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Avatar className="size-12">
                  {current.avatarUrl && <AvatarImage src={current.avatarUrl} alt="" />}
                  <AvatarFallback>{initials(current.name.replace(/[[\]]/g, "")) || "C"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{current.name}</p>
                  {(current.role || current.organization) && (
                    <p className="text-sm text-muted-foreground">
                      {[current.role, current.organization].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Previous testimonial">
            <ChevronLeft />
          </Button>
          <div className="flex gap-2">
            {data.map((testimonial, i) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === index ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/40",
                )}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Next testimonial">
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
