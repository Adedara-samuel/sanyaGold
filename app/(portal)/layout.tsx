import type { Metadata } from "next";

export const metadata: Metadata = {
  // The portal is for signed-in clients only; keep it out of search results.
  robots: { index: false, follow: false },
};

// TODO(portal): protect this route group with authentication (e.g. Auth.js,
// Clerk or Supabase Auth). Check the session in proxy.ts or here and redirect
// unauthenticated visitors to /portal/login.
export default function PortalGroupLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-secondary/30 flex flex-1 flex-col">{children}</div>;
}
