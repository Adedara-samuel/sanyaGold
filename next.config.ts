import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Old sanyagold.com (Wix) URLs, so existing links and search results still land on the right page.
  async redirects() {
    return [
      { source: "/post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/client-resources", destination: "/resources", permanent: true },
      { source: "/industry-focus", destination: "/industries", permanent: true },
      { source: "/assurance-services", destination: "/services/audit-assurance", permanent: true },
      { source: "/expert-accounting-services", destination: "/services/accounting", permanent: true },
      { source: "/english-privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/accessibility-statement", destination: "/accessibility", permanent: true },
      { source: "/testimonials", destination: "/#testimonials-title", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
