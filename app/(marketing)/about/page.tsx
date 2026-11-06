import { BadgeCheck, Clock, HeartHandshake, MapPin, Scale, Target } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaBanner } from "@/components/sections/cta-banner";
import { TeamGrid } from "@/components/sections/team";
import { JsonLd, PageHero, PlaceholderNote, SectionHeading } from "@/components/shared";
import { formattedAddress, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Meet the Sanyagold team, a Minnesota CPA firm serving nonprofits and small businesses with clear, responsive accounting and tax support.",
  path: "/about",
});

const values = [
  { icon: HeartHandshake, title: "Relationships first", description: "We get to know your organization, not just your numbers." },
  { icon: Target, title: "Clarity over jargon", description: "Every report and recommendation comes with a plain-English explanation." },
  { icon: Scale, title: "Integrity always", description: "Independent, objective advice held to professional standards." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sanyagold"
        title="A boutique CPA firm built around the people we serve"
        description="We started Sanyagold to give Minnesota nonprofits and small businesses the kind of attentive, expert support usually reserved for much larger organizations."
      />

      <section className="container-page grid gap-12 pb-20 lg:grid-cols-2 lg:items-center" aria-labelledby="story-title">
        <Reveal>
          <h2 id="story-title" className="text-3xl font-semibold">
            Our story
          </h2>
          <div className="text-muted-foreground mt-6 space-y-4 leading-relaxed">
            <p>
              [Founding story placeholder: when and why Sanyagold was founded, the founder&apos;s background, and the gap you saw
              in how small organizations were being served.]
            </p>
            <p>
              Today we help organizations across Minnesota keep accurate books, file on time and make confident decisions,
              with the responsiveness of a small team and the standards of a licensed CPA firm.
            </p>
          </div>
        </Reveal>
        {/* PHOTO SLOT: replace this panel with a real office or team photo (next/image, ~1200×900). */}
        <Reveal delay={0.1} className="from-accent-soft to-secondary relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl border bg-gradient-to-br">
          <LogoMark className="h-28 opacity-90" />
          <span className="text-muted-foreground absolute bottom-4 left-4 text-xs">Team / office photo coming soon</span>
        </Reveal>
      </section>

      <section className="section bg-secondary/40 border-y" aria-labelledby="values-title">
        <div className="container-page">
          <SectionHeading eyebrow="What we value" title={<span id="values-title">How we work</span>} />
          <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem as="li" key={value.title} className="bg-card rounded-2xl border p-6">
                <value.icon className="text-gold-ink size-6" aria-hidden="true" />
                <h3 className="mt-4 font-sans text-base font-semibold">{value.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{value.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our team"
            title={<span id="team-title">The people behind Sanyagold</span>}
            description="Licensed professionals who'll know your name and your organization."
          />
          <div className="mt-12">
            <TeamGrid detailed />
          </div>
          <PlaceholderNote className="mt-6 text-center">
            Team names, bios, photos and license numbers are placeholders. Update them in content/team.ts.
          </PlaceholderNote>
        </div>
      </section>

      <section className="section bg-secondary/40 border-y" aria-labelledby="credentials-title">
        <div className="container-page grid gap-6 md:grid-cols-3">
          <Reveal className="bg-card rounded-2xl border p-6">
            <BadgeCheck className="text-gold-ink size-6" aria-hidden="true" />
            <h2 id="credentials-title" className="mt-4 font-sans text-base font-semibold">
              Licensing
            </h2>
            <dl className="text-muted-foreground mt-3 space-y-2 text-sm">
              <div>
                <dt className="text-foreground font-medium">Firm permit</dt>
                <dd>{siteConfig.licensing.firmPermit}</dd>
              </div>
              <div>
                <dt className="text-foreground font-medium">Licensed by</dt>
                <dd>
                  <a
                    href={siteConfig.licensing.licensingBoardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    {siteConfig.licensing.licensingBoard}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-foreground font-medium">States</dt>
                <dd>{siteConfig.licensing.states.join(", ")}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.08} className="bg-card rounded-2xl border p-6">
            <MapPin className="text-gold-ink size-6" aria-hidden="true" />
            <h2 className="mt-4 font-sans text-base font-semibold">Office</h2>
            <address className="text-muted-foreground mt-3 text-sm not-italic">
              {formattedAddress}
              <br />
              <a href={siteConfig.contact.phoneHref} className="text-foreground mt-2 inline-block underline underline-offset-4">
                {siteConfig.contact.phone}
              </a>
            </address>
          </Reveal>
          <Reveal delay={0.16} className="bg-card rounded-2xl border p-6">
            <Clock className="text-gold-ink size-6" aria-hidden="true" />
            <h2 className="mt-4 font-sans text-base font-semibold">Hours</h2>
            <dl className="text-muted-foreground mt-3 space-y-2 text-sm">
              {siteConfig.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4">
                  <dt>{row.days}</dt>
                  <dd className="text-foreground">{row.time}</dd>
                </div>
              ))}
            </dl>
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
