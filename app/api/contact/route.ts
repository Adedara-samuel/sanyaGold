import { getFirm } from "@/content/firms";
import { services } from "@/content/services";
import { inboxAddress, sendMail } from "@/lib/email";
import { contactConfirmation, contactNotification } from "@/lib/email-templates";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema, zodIssuesToRecord } from "@/lib/validators";

// "Service — Firm", so each enquiry shows which independent firm it is for.
const serviceLabels: Record<string, string> = Object.fromEntries(
  services.map((service) => [service.slug, `${service.title} (${getFirm(service.firm).name})`]),
);

export async function POST(request: Request) {
  // Basic in-memory rate limit (see TODO in lib/rate-limit.ts).
  const limit = rateLimit(`contact:${clientIp(request)}`, { limit: 5, windowMs: 60_000 });
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

  // Honeypot: bots tend to fill every field. Pretend success so they don't retry.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return Response.json({ ok: true });
  }

  // Same zod schema the client form uses.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the highlighted fields.", issues: zodIssuesToRecord(parsed.error) },
      { status: 422 },
    );
  }

  const data = { ...parsed.data, service: serviceLabels[parsed.data.service] ?? "Not sure yet" };

  // 1) Notify the firm's inbox. Reply-To is the visitor, so "Reply" goes straight to them.
  try {
    await sendMail({ to: inboxAddress(), replyTo: data.email, ...contactNotification(data) });
  } catch (error) {
    console.error("[contact] notification failed:", error instanceof Error ? error.message : "unknown error");
    return Response.json(
      { error: "We couldn't send your message right now. Please call or email us directly." },
      { status: 502 },
    );
  }

  // 2) Courtesy confirmation to the visitor. Replies reach the firm's inbox.
  //    A failure here must not fail the request: the firm already has the message.
  try {
    await sendMail({ to: data.email, replyTo: inboxAddress(), ...contactConfirmation(data) });
  } catch (error) {
    console.warn("[contact] confirmation failed:", error instanceof Error ? error.message : "unknown error");
  }

  return Response.json({ ok: true });
}
