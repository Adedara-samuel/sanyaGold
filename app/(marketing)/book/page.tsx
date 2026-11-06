import { CheckCircle2 } from "lucide-react";
import { BookingForm } from "@/components/forms/booking-form";
import { Reveal } from "@/components/motion/reveal";
import { BookingEmbed } from "@/components/sections/booking-embed";
import { JsonLd, PageHero } from "@/components/shared";
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
        title="Book a free consultation"
        description="Pick a time that suits you. We'll talk about your organization, your goals and how we can help."
      />

      <section className="container-page grid gap-10 pb-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-2xl font-semibold">What to expect</h2>
          <ul className="mt-6 space-y-4">
            {expectations.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="text-success mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-8 text-sm">
            Have last year&apos;s financial statements or tax return handy if you can. It helps us give better advice, but it&apos;s
            not required.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <BookingEmbed />
        </Reveal>
      </section>

      <section className="container-page pb-24" aria-labelledby="request-title">
        <Reveal className="bg-card mx-auto max-w-3xl rounded-3xl border p-6 shadow-sm sm:p-10">
          <h2 id="request-title" className="text-2xl font-semibold">
            Or request a time
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Tell us when works for you and we&apos;ll confirm by email within one business day.
          </p>
          <div className="mt-8">
            <BookingForm />
          </div>
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
