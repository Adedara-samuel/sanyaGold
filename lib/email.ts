import "server-only";

interface EmailPayload {
  subject: string;
  replyTo: string;
  text: string;
}

/**
 * Email integration point.
 *
 * TODO: connect Resend (https://resend.com):
 *   1. `pnpm add resend`
 *   2. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (a verified domain sender).
 *   3. Replace the body below with:
 *        const resend = new Resend(process.env.RESEND_API_KEY);
 *        await resend.emails.send({ from, to, replyTo, subject, text });
 *
 * Until then, messages are logged on the server (without the message body) and the request succeeds,
 * so the form can be tested end to end.
 */
export async function sendNotificationEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[email:dev] Would send "${payload.subject}" (reply-to ${payload.replyTo}). Set RESEND_API_KEY to deliver.`);
    return { delivered: false as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sanyagold Website <website@sanyagold.com>",
      to: [process.env.CONTACT_TO_EMAIL ?? "info@sanyagold.com"],
      reply_to: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider responded with ${response.status}`);
  }
  return { delivered: true as const };
}
