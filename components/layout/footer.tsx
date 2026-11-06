import Link from "next/link";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { CurrentYear } from "@/components/layout/current-year";
import { Logo } from "@/components/layout/logo";
import { formattedAddress, siteConfig } from "@/lib/site-config";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
  { label: "Facebook", href: siteConfig.socials.facebook, Icon: FacebookIcon },
  { label: "Google Reviews", href: siteConfig.socials.googleReviews, Icon: Star },
];

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-semibold tracking-wide">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm space-y-5">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Accounting, tax and advisory for Minnesota nonprofits and small businesses.
          </p>
          <ul className="flex gap-2" aria-label="Social media">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:grid-cols-4">
          <FooterColumn title="Services" links={siteConfig.footer.services} />
          <FooterColumn title="Company" links={siteConfig.footer.company} />
          <FooterColumn title="Resources" links={siteConfig.footer.resources} />
          <div className="col-span-2 sm:col-span-3 xl:col-span-1">
            <h2 className="font-sans text-sm font-semibold tracking-wide">Contact</h2>
            <address className="mt-4 space-y-3 text-sm text-muted-foreground not-italic">
              <a href={siteConfig.contact.phoneHref} className="flex items-start gap-2 hover:text-foreground">
                <Phone className="mt-0.5 size-4 shrink-0" /> {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-start gap-2 break-all hover:text-foreground"
              >
                <Mail className="mt-0.5 size-4 shrink-0" /> {siteConfig.contact.email}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" /> {formattedAddress}
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legalName}. All rights reserved. Licensed by the{" "}
            {siteConfig.licensing.licensingBoard}. {siteConfig.licensing.firmPermit}
          </p>
          <nav aria-label="Legal">
            <ul className="flex gap-5">
              {siteConfig.footer.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline-offset-4 hover:text-foreground hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
