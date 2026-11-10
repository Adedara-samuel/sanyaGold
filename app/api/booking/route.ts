import { isBookable, whenLabel } from "@/lib/booking";
import { inboxAddress, sendMail } from "@/lib/email";
import { bookingConfirmation, bookingNotification } from "@/lib/email-templates";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { bookingSchema, organizationTypeLabels, zodIssuesToRecord } from "@/lib/validators";

export async function POST(request: Request) {
  const limit = rateLimit(`booking:${clientIp(request)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.success) {
    return Response.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return Response.json({ ok: true });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the highlighted fields.", issues: zodIssuesToRecord(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Re-check the slot on the server: open weekday, not in the past (Minnesota time), within range.
  if (!isBookable(data.date, data.time)) {
    return Response.json(
      {
        error: "That time is no longer available. Please choose another.",
        issues: { time: ["Please choose another time."] },
      },
      { status: 422 },
    );
  }

  const emailData = {
    when: whenLabel(data.date, data.time),
    name: data.name,
    email: data.email,
    phone: data.phone,
    organizationType: organizationTypeLabels[data.organizationType],
    firm: data.firm,
    topic: data.topic,
  };

  // TODO(portal): persist the request (and block the slot globally) once a database exists.
  try {
    await sendMail({ to: inboxAddress(), replyTo: data.email, ...bookingNotification(emailData) });
  } catch (error) {
    console.error("[booking] notification failed:", error instanceof Error ? error.message : "unknown error");
    return Response.json(
      { error: "We couldn't send your request right now. Please call or email us directly." },
      { status: 502 },
    );
  }

  try {
    await sendMail({ to: data.email, replyTo: inboxAddress(), ...bookingConfirmation(emailData) });
  } catch (error) {
    console.warn("[booking] confirmation failed:", error instanceof Error ? error.message : "unknown error");
  }

  return Response.json({ ok: true, when: emailData.when });
}
