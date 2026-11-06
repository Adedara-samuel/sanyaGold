import { CalendarClock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Scheduling embed. Set NEXT_PUBLIC_BOOKING_URL to your Cal.com or Calendly
 * link (e.g. https://cal.com/sanyagold/consultation or
 * https://calendly.com/sanyagold/free-consultation) and it appears here.
 * Remember to allow the provider in any Content-Security-Policy you add.
 */
export function BookingEmbed() {
  const url = siteConfig.booking.url;

  if (!url) {
    return (
      <div className="bg-card/60 flex min-h-[22rem] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed p-8 text-center">
        <span className="bg-accent-soft text-gold-ink grid size-14 place-items-center rounded-2xl">
          <CalendarClock className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-medium">Online scheduling is coming soon</p>
          <p className="text-muted-foreground mt-1 max-w-sm text-sm">
            In the meantime, use the form to request a time and we&apos;ll confirm by email, or call{" "}
            <a href={siteConfig.contact.phoneHref} className="text-foreground underline underline-offset-4">
              {siteConfig.contact.phone}
            </a>
            .
          </p>
        </div>
        <p className="text-muted-foreground text-xs">[Developer note: set NEXT_PUBLIC_BOOKING_URL to enable the calendar]</p>
      </div>
    );
  }

  const embedUrl = url.includes("calendly.com")
    ? `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1`
    : `${url}${url.includes("?") ? "&" : "?"}embed=true`;

  return (
    <div className="bg-card overflow-hidden rounded-2xl border">
      <iframe
        src={embedUrl}
        title={`Book a free consultation with ${siteConfig.name}`}
        className="h-[44rem] w-full"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
