import { LegalPage } from "@/components/legal-page";
import { formattedAddress, siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Sanyagold collects, uses and protects personal information shared through this website.",
  path: "/privacy-policy",
});

/*
 * TEMPLATE — have this reviewed by your attorney before launch. It reflects how
 * the site currently works (contact form, booking request, optional analytics)
 * and must be updated if those change.
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="[Month Day, Year]"
      intro={`This policy explains what information is collected through this website, which is shared by Sanyagold Accounting, Advisory and Consulting Services and W O Oyebamiji CPA LLC, how it is used and the choices you have.`}
    >
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us:</strong> your name, email, phone number, organization and message when you
          use our contact or consultation request forms.
        </li>
        <li>
          <strong>Documents you upload:</strong> files you share through the client portal once it is available, used
          only to provide the services you engage us for.
        </li>
        <li>
          <strong>Usage information:</strong> if analytics is enabled, basic, aggregated information such as pages
          visited and device type. [Update to name your analytics provider, if any.]
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your enquiries and schedule consultations</li>
        <li>To provide the services you engage either firm for</li>
        <li>To route your enquiry to the firm that provides the service you ask about</li>
        <li>To improve our website and services</li>
        <li>To meet our legal and professional obligations</li>
      </ul>

      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We share it only with service providers that help us run our business
        (for example, email delivery and scheduling tools) under appropriate confidentiality terms, or when required by
        law or professional standards.
      </p>

      <h2>Client confidentiality</h2>
      <p>
        Both firms treat client information as confidential. As a licensed CPA firm, W O Oyebamiji CPA LLC is also bound
        by professional rules on the confidentiality of client information, in addition to this policy.
      </p>

      <h2>Keeping information secure</h2>
      <p>
        We use reasonable administrative, technical and physical safeguards to protect information. No method of
        transmission over the internet is completely secure, so please don&apos;t send Social Security numbers or bank
        details through our website forms or by regular email.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete personal information you have given us, subject to our
        record-keeping obligations. Contact us using the details below.
      </p>

      <h2>Contact us</h2>
      <p>
        Sanyagold Accounting, Advisory and Consulting Services
        <br />
        W O Oyebamiji CPA LLC
        <br />
        {formattedAddress}
        <br />
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> ·{" "}
        <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
      </p>
    </LegalPage>
  );
}
