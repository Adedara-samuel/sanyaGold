import "server-only";

import nodemailer, { type Transporter } from "nodemailer";
import { siteConfig } from "@/lib/site-config";

/**
 * Email delivery over SMTP (Gmail by default).
 *
 * Configure in .env.local (never commit real values):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS  → the sending account
 *   CONTACT_TO_EMAIL                             → inbox that receives enquiries
 *                                                   (defaults to the email shown on the website)
 *
 * With Gmail, SMTP_PASS must be a Google "App password" (requires 2-Step Verification).
 * Gmail always sends from the authenticated account, so the From address is SMTP_USER
 * with the display name "Sanyagold". Replies go to the right person via Reply-To.
 */

interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: {
    filename: string;
    content: Buffer;
    contentType?: string;
  }[];
}

let transporter: Transporter | null = null;

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  if (!transporter) {
    const port = Number(SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465, // implicit TLS on 465, STARTTLS on 587
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export function inboxAddress() {
  return process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
}

export function isEmailConfigured() {
  return getTransporter() !== null;
}

export async function sendMail(message: MailMessage) {
  const transport = getTransporter();
  if (!transport) {
    // Development fallback: log metadata only (never message bodies or personal details).
    console.info(`[email:dev] SMTP not configured, skipped "${message.subject}".`);
    return { delivered: false as const };
  }

  await transport.sendMail({
    from: { name: siteConfig.name, address: process.env.SMTP_USER! },
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
    attachments: message.attachments,
  });
  return { delivered: true as const };
}
