import { sendNotificationEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { bookingSchema, zodIssuesToRecord } from "@/lib/validators";

const orgLabels: Record<string, string> = {
  nonprofit: "Nonprofit",
  "small-business": "Small business",
  "professional-services": "Professional services",
  individual: "Individual",
  other: "Other",
};

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
  try {
    await sendNotificationEmail({
      subject: `Consultation request from ${data.name}`,
      replyTo: data.email,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Organization type: ${orgLabels[data.organizationType] ?? data.organizationType}`,
        `Preferred times: ${data.preferredTime}`,
        "",
        data.topic || "(no topic provided)",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[booking] email delivery failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "We couldn't send your request. Please call us instead." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
