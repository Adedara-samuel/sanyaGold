import { inboxAddress, sendMail } from "@/lib/email";
import { newsletterNotification, newsletterWelcome } from "@/lib/email-templates";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";
import { newsletterSchema, zodIssuesToRecord } from "@/lib/validators";

/**
 * Newsletter signup from the site footer.
 * Each signup is emailed to the firm's inbox so it can be added to the mailing list,
 * and the subscriber gets a welcome email. (Swap for a mailing-list service such as
 * Mailchimp later: only this handler needs to change.)
 */
export async function POST(request: Request) {
  const limit = rateLimit(`newsletter:${clientIp(request)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.success) {
    return Response.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return Response.json({ ok: true });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the highlighted fields.", issues: zodIssuesToRecord(parsed.error) },
      { status: 422 },
    );
  }

  const { email } = parsed.data;
  const when = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: siteConfig.booking.timeZone,
  }).format(new Date());

  // 1) Tell the firm's inbox (Reply-To is the subscriber).
  try {
    await sendMail({ to: inboxAddress(), replyTo: email, ...newsletterNotification(email, when) });
  } catch (error) {
    console.error("[newsletter] notification failed:", error instanceof Error ? error.message : "unknown error");
    return Response.json({ error: "We couldn't subscribe you right now. Please try again later." }, { status: 502 });
  }

  // 2) Welcome email. A failure here must not fail the signup.
  try {
    await sendMail({ to: email, replyTo: inboxAddress(), ...newsletterWelcome() });
  } catch (error) {
    console.warn("[newsletter] welcome email failed:", error instanceof Error ? error.message : "unknown error");
  }

  return Response.json({ ok: true });
}
