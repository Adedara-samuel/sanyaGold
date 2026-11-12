import { Phone } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { CtaButtons } from "@/components/shared";
import { siteConfig } from "@/lib/site-config";

export function CtaBanner({
  title = "Let's make your finances feel simple",
  description = "Book a free, no-pressure consultation. We'll listen, answer your questions and tell you honestly how we can help.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="container-page section" aria-labelledby="cta-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground sm:px-14 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute -top-28 -left-20 size-80 animate-gradient rounded-full bg-accent/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -bottom-28 size-80 rounded-full bg-sg-gold/25 blur-3xl"
          />
          <LogoMark tone="mono" className="pointer-events-none absolute -right-6 -bottom-10 h-56 text-primary-foreground/10" />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-semibold sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg opacity-85">{description}</p>
            <CtaButtons
              className="mt-9 justify-center [&_a[data-slot=button]:last-child]:border-white/30 [&_a[data-slot=button]:last-child]:bg-transparent [&_a[data-slot=button]:last-child]:text-current"
              secondary={{ label: "Contact us", href: "/contact" }}
            />
            <p className="mt-6 text-sm opacity-80">
              Prefer to talk?{" "}
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-1 font-medium underline underline-offset-4"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
