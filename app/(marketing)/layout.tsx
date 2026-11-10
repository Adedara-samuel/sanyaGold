import { Suspense } from "react";
import { FirmsBar } from "@/components/layout/firms-bar";
import { SiteFooter } from "@/components/layout/footer";
import { HeaderWithPathname, SiteHeader } from "@/components/layout/header";
import { JsonLd } from "@/components/shared";
import { organizationJsonLd } from "@/lib/seo";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <FirmsBar />
      {/* usePathname may suspend while prerendering dynamic routes; fall back to a header without active state. */}
      <Suspense fallback={<SiteHeader pathname={null} />}>
        <HeaderWithPathname />
      </Suspense>
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <JsonLd data={[organizationJsonLd("sanyagold"), organizationJsonLd("oyebamiji-cpa")]} />
    </>
  );
}
