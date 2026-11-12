import { BadgeCheck, Clock, HeartHandshake, MapPin, Scale, Target } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FirmsComplement } from "@/components/sections/firms-complement";
import { TeamGrid } from "@/components/sections/team";
import { JsonLd, PageHero, SectionHeading } from "@/components/shared";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Meet the team behind Sanyagold Accounting, Advisory and Consulting Services and W O Oyebamiji CPA LLC, two independent firms serving Minnesota nonprofits and small businesses.",
  path: "/about",
});

const values = [
  {
    icon: HeartHandshake,
    title: "Integrity",
    description: "Our team is committed to integrity, transparency, and the highest standards of professionalism.",
  },
  {
    icon: Target,
    title: "Transparency",
    description: "We deliver solutions that are accurate, reliable, and tailored to the specific needs of each client.",
  },
  {
    icon: Scale,
    title: "Professionalism",
    description: "We help clients grow, thrive, and stay compliant in an ever-changing business landscape.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sanyagold"
        title="Expert Financial Services Provider"
        description="At Sanyagold, we are driven by a passion for helping businesses succeed through expert financial guidance and unparalleled services."
      />

      <section
        className="container-page grid gap-12 pb-20 lg:grid-cols-2 lg:items-center"
        aria-labelledby="story-title"
      >
        <Reveal>
          <h2 id="story-title" className="text-3xl font-semibold">
            Our Firm&apos;s Story
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Founded with a vision to provide comprehensive accounting, financial and business consultancy services,
              Sanyagold has grown into a trusted partner for companies across various industries. Clients who also need
              tax, audit, review or attestation services can work with W O Oyebamiji CPA LLC, an independent CPA firm
              that complements Sanyagold&apos;s work.
            </p>
            <p>
              With years of experience and a deep understanding of the unique challenges faced by businesses, we have
              built a reputation for delivering solutions that are not only accurate and reliable but also tailored to
              the specific needs of each client. Our team is committed to integrity, transparency, and the highest
              standards of professionalism, ensuring that every decision we make helps our clients grow, thrive, and
              stay compliant in an ever-changing business landscape.
            </p>
            <p>
              At Sanyagold, we don&apos;t just view ourselves as service providers—we see ourselves as partners in your
              business journey. Whether you&apos;re a small startup or a large corporation, we are dedicated to helping
              you navigate your financial challenges and achieve long-term success.
            </p>
          </div>
        </Reveal>
        <Reveal
          delay={0.1}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-gradient-to-br from-accent-soft to-secondary"
        >
          <Image
            src="/about/teamwork.jpg"
            alt="Diverse team joining hands in unity, representing teamwork and collaboration at Sanyagold"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      <FirmsComplement className="border-t" />

      <section className="section border-y bg-secondary/40" aria-labelledby="values-title">
        <div className="container-page">
          <SectionHeading eyebrow="What we value" title={<span id="values-title">Our Team</span>} />
          <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem as="li" key={value.title} className="rounded-2xl border bg-card p-6">
                <value.icon className="size-6 text-gold-ink" aria-hidden="true" />
                <h3 className="mt-4 font-sans text-base font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our team"
            title={<span id="team-title">Our Team</span>}
            description="Dedicated professionals committed to meeting clients' needs with accuracy, integrity and timeliness."
          />
          <div className="mt-12">
            <TeamGrid detailed />
          </div>
        </div>
      </section>

      <section className="section border-y bg-secondary/40" aria-labelledby="services-title">
        <div className="container-page grid gap-6 md:grid-cols-3">
          <Reveal className="rounded-2xl border bg-card p-6">
            <BadgeCheck className="size-6 text-gold-ink" aria-hidden="true" />
            <h2 id="services-title" className="mt-4 font-sans text-base font-semibold">
              Expert Financial Services
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sanyagold provides accounting, payroll, HR and business consultancy services. Tax, audit, review and
              attestation services are provided by W O Oyebamiji CPA LLC.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border bg-card p-6">
            <MapPin className="size-6 text-gold-ink" aria-hidden="true" />
            <h2 className="mt-4 font-sans text-base font-semibold">Our Clients</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We are trusted partners for companies across various industries, from small startups to large
              corporations.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="rounded-2xl border bg-card p-6">
            <Clock className="size-6 text-gold-ink" aria-hidden="true" />
            <h2 className="mt-4 font-sans text-base font-semibold">Our Commitment</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We are dedicated to helping clients navigate financial challenges and achieve long-term success.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
