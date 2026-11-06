import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading className="text-3xl leading-tight font-semibold sm:text-4xl">{title}</Heading>
      {description && <p className="text-lead mt-5">{description}</p>}
    </Reveal>
  );
}

export function CtaButtons({ className, secondary = siteConfig.cta.secondary }: { className?: string; secondary?: { label: string; href: string } | null }) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <Button asChild size="lg" variant="accent" className="group">
        <Link href={siteConfig.cta.primary.href}>
          <span
            aria-hidden="true"
            className="animate-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
          {siteConfig.cta.primary.label}
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Button>
      {secondary && (
        <Button asChild size="lg" variant="outline">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      )}
    </div>
  );
}

/** Hero for inner pages: one h1, a short lead and soft decorative background. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grain absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div
        aria-hidden="true"
        className="bg-accent/25 absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full blur-3xl dark:bg-accent/10"
      />
      <div className="container-page relative pt-14 pb-16 sm:pt-20 sm:pb-20">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children && <div className="mt-8 flex justify-center">{children}</div>}
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD guide: escape "<" so content can never break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function PlaceholderNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-muted-foreground text-xs italic", className)}>
      <span className="sr-only">Note: </span>
      {children}
    </p>
  );
}
