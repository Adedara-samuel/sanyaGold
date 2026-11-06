import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accessibility Statement",
  description: "Sanyagold's commitment to making this website accessible to everyone, and how to request help.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      updated="[Month Day, Year]"
      intro={`${siteConfig.name} wants everyone to be able to use this website, including people with disabilities.`}
    >
      <h2>Our commitment</h2>
      <p>
        We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. We consider accessibility when
        we design, build and update this site.
      </p>

      <h2>What we&apos;ve done</h2>
      <ul>
        <li>Semantic page structure with one main heading per page and logical headings</li>
        <li>A &ldquo;Skip to main content&rdquo; link and full keyboard navigation, including menus and carousels</li>
        <li>Visible focus indicators and color contrast that meets AA guidelines in light and dark modes</li>
        <li>Text alternatives for meaningful images, and decorative images hidden from screen readers</li>
        <li>Animations that respect your device&apos;s &ldquo;reduce motion&rdquo; setting</li>
        <li>Form fields with labels and clear error messages</li>
      </ul>

      <h2>Known limitations</h2>
      <p>
        Some third-party tools, such as embedded scheduling calendars, are provided by other companies and may not be
        fully accessible. If you have trouble using them, contact us and we&apos;ll schedule with you directly.
      </p>

      <h2>Need help or have feedback?</h2>
      <p>
        If you have difficulty using any part of this site, or need information in another format, please contact us. We
        aim to respond within two business days.
      </p>
      <p>
        Phone: <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
        <br />
        Email: <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
      </p>
    </LegalPage>
  );
}
