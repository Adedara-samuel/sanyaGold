import type { Metadata, Viewport } from "next";
import { EB_Garamond, Geist, Lora } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Providers } from "@/components/providers";
import { SkipLink } from "@/components/layout/skip-link";
import { SplashScreen, splashScript } from "@/components/layout/splash-screen";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Lora is the site's serif for headings.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// EB Garamond is the typeface of the approved Sanyagold wordmark.
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Accounting, Tax & Advisory for Minnesota Nonprofits & Small Businesses`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Minnesota CPA",
    "W O Oyebamiji CPA LLC",
    "Sanyagold Accounting, Advisory and Consulting Services",
    "payroll services Minnesota",
    "single audit Minnesota",
    "nonprofit accountant Minnesota",
    "small business accounting Minnesota",
    "Form 990 preparation",
    "nonprofit audit Minnesota",
    "book-keeping Hanover MN",
    "tax planning Minnesota",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1626" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${lora.variable} ${garamond.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Static inline script: decides before first paint whether this session already saw the splash. */}
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SplashScreen />
        <SkipLink />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
