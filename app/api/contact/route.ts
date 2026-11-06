import { sendNotificationEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema, zodIssuesToRecord } from "@/lib/validators";

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

  const { name, email, phone, organization, service, message } = parsed.data;

  try {
    await sendNotificationEmail({
      subject: `New website enquiry from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Organization: ${organization || "—"}`,
        `Service: ${service || "—"}`,
        "",
        message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact] email delivery failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "We couldn't send your message. Please call us instead." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
