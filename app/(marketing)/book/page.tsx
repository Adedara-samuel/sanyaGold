import { CheckCircle2, Mail, Phone } from "lucide-react";
import { BookingScheduler } from "@/components/forms/booking-scheduler";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, PageHero } from "@/components/shared";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book a Free Consultation",
  description: "Book a free, no-obligation consultation with Sanyagold, a Minnesota CPA firm for nonprofits and small businesses.",
  path: "/book",
});

const expectations = [
  "A relaxed 30-minute conversation by video or phone",
  "Honest advice on what you need (and what you don't)",
  "A clear proposal with fixed pricing if we're a fit",
  "No obligation and no sales pressure",
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Free consultation"
        title="Pick a time. Let's talk."
        description="Choose a day and time that suits you. We'll confirm by email within one business day."
      />

      <section className="container-page pb-16" aria-label="Consultation scheduler">
        <Reveal>
          <BookingScheduler />
        </Reveal>
      </section>

      <section className="container-page grid gap-6 pb-24 md:grid-cols-2" aria-label="About your consultation">
        <Reveal className="bg-card rounded-3xl border p-7">
          <h2 className="font-sans text-base font-semibold">What to expect</h2>
          <ul className="mt-5 space-y-3">
            {expectations.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="bg-card rounded-3xl border p-7">
          <h2 className="font-sans text-base font-semibold">Prefer to talk now?</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Can&apos;t find a time that works? Get in touch and we&apos;ll find one together.
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={siteConfig.contact.phoneHref} className="hover:text-gold-ink inline-flex items-center gap-3">
                <Phone className="text-gold-ink size-4" aria-hidden="true" /> {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold-ink inline-flex items-center gap-3">
                <Mail className="text-gold-ink size-4" aria-hidden="true" /> {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </Reveal>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book a consultation", path: "/book" },
        ])}
      />
    </>
  );
}
