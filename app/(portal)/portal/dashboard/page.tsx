import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, FileUp, MessageCircle } from "lucide-react";
import { PortalShell } from "@/components/portal/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Dashboard · Client Portal" };

const cards = [
  {
    icon: FileUp,
    title: "Upload documents",
    description: "Send statements, receipts and tax forms to your accountant.",
    href: "/portal/documents",
    cta: "Go to documents",
  },
  {
    icon: CalendarCheck,
    title: "Book a meeting",
    description: "Schedule a check-in with your Sanyagold team.",
    href: "/book",
    cta: "Find a time",
  },
  {
    icon: MessageCircle,
    title: "Ask a question",
    description: "Send us a message and we'll reply within one business day.",
    href: "/contact",
    cta: "Send a message",
  },
];

// TODO(portal): replace with real data: open requests, deadlines, invoices,
// e-signature tasks and messages, all scoped to the signed-in client.
export default function PortalDashboardPage() {
  return (
    <PortalShell>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <Badge variant="warning">Demo data</Badge>
      </div>
      <p className="mt-2 text-muted-foreground">Here&apos;s what you can do in your client portal.</p>

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <li key={card.title} className="flex flex-col rounded-2xl border bg-card p-6">
            <card.icon className="size-6 text-gold-ink" aria-hidden="true" />
            <h2 className="mt-4 font-sans text-base font-semibold">{card.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{card.description}</p>
            <Button asChild variant="outline" size="sm" className="mt-5 w-fit">
              <Link href={card.href}>{card.cta}</Link>
            </Button>
          </li>
        ))}
      </ul>

      <section className="mt-10 rounded-2xl border bg-card p-6" aria-labelledby="coming-title">
        <h2 id="coming-title" className="font-sans text-base font-semibold">
          Coming soon to your portal
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li>• Deadlines and filing status</li>
          <li>• Secure messaging with your accountant</li>
          <li>• Invoices and online payments</li>
          <li>• E-signature for engagement letters and returns</li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Questions? Call {siteConfig.contact.phone} or email {siteConfig.contact.email}.
        </p>
      </section>
    </PortalShell>
  );
}
