import Link from "next/link";
import { CalendarCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, PageHero } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { formattedAddress, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Sanyagold, a Minnesota CPA firm. Call 763-400-1411, email info@sanyagold.com or send us a message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        description="Send us a message and we'll get back to you within one business day. Or book a free consultation directly."
      />

      <section className="container-page grid gap-10 pb-24 lg:grid-cols-[1.4fr_0.9fr]">
        <Reveal className="rounded-3xl border bg-card p-6 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold">Send a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">All fields are required unless marked optional.</p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5">
          <div className="rounded-3xl bg-primary p-7 text-primary-foreground">
            <CalendarCheck className="size-6" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Prefer to pick a time?</h2>
            <p className="mt-2 text-sm opacity-85">Book a free 30-minute consultation online.</p>
            <Button asChild variant="accent" className="mt-5">
              <Link href="/book">{siteConfig.cta.primary.label}</Link>
            </Button>
          </div>

          <div className="rounded-3xl border bg-card p-7">
            <h2 className="font-sans text-base font-semibold">Contact details</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={siteConfig.contact.phoneHref} className="flex items-center gap-3 hover:text-gold-ink">
                  <Phone className="size-4 text-gold-ink" aria-hidden="true" /> {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 hover:text-gold-ink">
                  <Mail className="size-4 text-gold-ink" aria-hidden="true" /> {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-gold-ink" aria-hidden="true" />
                <address className="not-italic">{formattedAddress}</address>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 text-gold-ink" aria-hidden="true" />
                <dl className="w-full space-y-1">
                  {siteConfig.hours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{row.days}</dt>
                      <dd>{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
