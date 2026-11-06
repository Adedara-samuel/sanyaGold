import "server-only";

import { formattedAddress, siteConfig } from "@/lib/site-config";

/**
 * Branded, email-client-safe templates (tables + inline styles).
 * Every user-provided value is HTML-escaped before it is inserted.
 */

const colors = {
  navy: "#13213A",
  gold: "#C9A227",
  mauve: "#A4747F",
  cream: "#FBF8F3",
  muted: "#5B6475",
  border: "#E8E1D3",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so values can't inject extra headers into subjects. */
export function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

type Row = [label: string, value: string];

function rowsHtml(rows: Row[]) {
  return rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${colors.border};width:38%;vertical-align:top;color:${colors.muted};font-size:14px;">${escapeHtml(label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${colors.border};vertical-align:top;color:${colors.navy};font-size:14px;font-weight:600;">${escapeHtml(value || "—")}</td>
      </tr>`,
    )
    .join("");
}

function layout({ preheader, heading, body }: { preheader: string; heading: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(heading)}</title></head>
<body style="margin:0;padding:0;background:${colors.cream};font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.cream};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${colors.border};border-radius:16px;overflow:hidden;">
        <tr><td style="padding:24px 32px;border-bottom:3px solid ${colors.gold};">
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:${colors.mauve};">&#11042;</span>
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#7E8A88;vertical-align:2px;">&nbsp;${escapeHtml(siteConfig.name)}</span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:${colors.navy};">${escapeHtml(heading)}</h1>
          ${body}
        </td></tr>
        <tr><td style="padding:20px 32px;background:${colors.cream};color:${colors.muted};font-size:12px;line-height:1.6;">
          ${escapeHtml(siteConfig.legalName)} · ${escapeHtml(formattedAddress)}<br>
          ${escapeHtml(siteConfig.contact.phone)} · <a href="mailto:${siteConfig.contact.email}" style="color:${colors.navy};">${escapeHtml(siteConfig.contact.email)}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function paragraph(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${colors.navy};">${escapeHtml(text)}</p>`;
}

function messageBlock(text: string) {
  return `<div style="margin:20px 0 0;padding:16px;background:${colors.cream};border-radius:12px;font-size:14px;line-height:1.6;color:${colors.navy};white-space:pre-wrap;">${escapeHtml(text)}</div>`;
}

function replyButton(email: string, label: string) {
  return `<p style="margin:24px 0 0;"><a href="mailto:${encodeURIComponent(email)}" style="display:inline-block;background:${colors.navy};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600;">${escapeHtml(label)}</a></p>`;
}

const textRows = (rows: Row[]) => rows.map(([label, value]) => `${label}: ${value || "—"}`).join("\n");

/* ───────────────────── Contact form ───────────────────── */

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  message: string;
}

export function contactNotification(data: ContactEmailData) {
  const rows: Row[] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Organization", data.organization],
    ["Service of interest", data.service],
  ];
  return {
    subject: `New website enquiry from ${oneLine(data.name)}`,
    text: `New enquiry from the ${siteConfig.name} website\n\n${textRows(rows)}\n\nMessage:\n${data.message}\n\nReply directly to this email to respond to ${data.name}.`,
    html: layout({
      preheader: `New enquiry from ${data.name}`,
      heading: "New website enquiry",
      body: `${paragraph("Someone sent a message through the contact form. Reply to this email to respond to them directly.")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml(rows)}</table>
        ${messageBlock(data.message)}
        ${replyButton(data.email, `Reply to ${data.name}`)}`,
    }),
  };
}

export function contactConfirmation(data: ContactEmailData) {
  const firstName = oneLine(data.name).split(" ")[0] || "there";
  return {
    subject: `We received your message — ${siteConfig.name}`,
    text: `Hi ${firstName},\n\nThank you for contacting ${siteConfig.name}. We've received your message and a member of our team will reply within one business day.\n\nYour message:\n${data.message}\n\nIf it's urgent, call us at ${siteConfig.contact.phone}.\n\nWarm regards,\nThe ${siteConfig.name} team`,
    html: layout({
      preheader: "Thanks for reaching out. We'll reply within one business day.",
      heading: `Thank you, ${firstName}`,
      body: `${paragraph(`We've received your message and a member of our team will reply within one business day.`)}
        ${paragraph(`If it's urgent, call us at ${siteConfig.contact.phone}. You can also simply reply to this email.`)}
        <p style="margin:24px 0 8px;font-size:13px;color:${colors.muted};">A copy of your message:</p>
        ${messageBlock(data.message)}
        <p style="margin:24px 0 0;font-size:15px;color:${colors.navy};">Warm regards,<br>The ${escapeHtml(siteConfig.name)} team</p>`,
    }),
  };
}

/* ───────────────────── Consultation booking ───────────────────── */

export interface BookingEmailData {
  when: string;
  name: string;
  email: string;
  phone: string;
  organizationType: string;
  topic: string;
}

export function bookingNotification(data: BookingEmailData) {
  const rows: Row[] = [
    ["Requested time", data.when],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Organization type", data.organizationType],
  ];
  return {
    subject: `Consultation request: ${oneLine(data.when)} — ${oneLine(data.name)}`,
    text: `New consultation request from the ${siteConfig.name} website\n\n${textRows(rows)}\n\nTopic:\n${data.topic || "—"}\n\nPlease reply to this email to confirm the time with ${data.name}.`,
    html: layout({
      preheader: `${data.name} requested ${data.when}`,
      heading: "New consultation request",
      body: `${paragraph("A visitor requested a free consultation. Please confirm the time (or suggest another) by replying to this email.")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml(rows)}</table>
        ${data.topic ? messageBlock(data.topic) : ""}
        ${replyButton(data.email, `Confirm with ${data.name}`)}`,
    }),
  };
}

export function bookingConfirmation(data: BookingEmailData) {
  const firstName = oneLine(data.name).split(" ")[0] || "there";
  return {
    subject: `Your consultation request — ${siteConfig.name}`,
    text: `Hi ${firstName},\n\nThank you for requesting a free consultation with ${siteConfig.name}.\n\nRequested time: ${data.when}\n\nThis time is not confirmed yet. We'll email you within one business day to confirm it or suggest an alternative.\n\nNeed to change something? Just reply to this email or call ${siteConfig.contact.phone}.\n\nWarm regards,\nThe ${siteConfig.name} team`,
    html: layout({
      preheader: "We've received your request and will confirm by email.",
      heading: `Thanks, ${firstName}. Your request is in.`,
      body: `${paragraph(`Thank you for requesting a free consultation with ${siteConfig.name}.`)}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml([["Requested time", data.when]])}</table>
        <p style="margin:20px 0 16px;font-size:15px;line-height:1.6;color:${colors.navy};"><strong>This time isn't confirmed yet.</strong> We'll email you within one business day to confirm it or suggest an alternative.</p>
        ${paragraph(`Need to change something? Just reply to this email or call ${siteConfig.contact.phone}.`)}
        <p style="margin:24px 0 0;font-size:15px;color:${colors.navy};">Warm regards,<br>The ${escapeHtml(siteConfig.name)} team</p>`,
    }),
  };
}
