import { getDocuments } from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { documentCategories, validateUploadFile } from "@/lib/validators";
import type { PortalDocument } from "@/lib/types";
import { inboxAddress, isEmailConfigured, sendMail } from "@/lib/email";

export async function GET() {
  // TODO(portal): read the session and return only that client's documents.
  return Response.json(await getDocuments());
}

export async function POST(request: Request) {
  const limit = rateLimit(`upload:${clientIp(request)}`, { limit: 20, windowMs: 60_000 });
  if (!limit.success) {
    return Response.json({ error: "Too many uploads. Please wait a moment." }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = formData.get("file");
  const category = String(formData.get("category") ?? "Other");

  if (!(file instanceof File)) {
    return Response.json({ error: "No file received." }, { status: 400 });
  }

  const fileError = validateUploadFile(file);
  if (fileError) return Response.json({ error: fileError }, { status: 422 });

  if (!(documentCategories as readonly string[]).includes(category)) {
    return Response.json({ error: "Unknown document category." }, { status: 422 });
  }

  if (!isEmailConfigured()) {
    return Response.json({ error: "Document email is not configured. Please try again later." }, { status: 503 });
  }

  const filename = file.name.replace(/[\\/\r\n]/g, "_").slice(0, 200) || "document";
  try {
    const delivery = await sendMail({
      to: inboxAddress(),
      subject: `New document upload: ${category}`,
      text: `A document was submitted through the Sanyagold client portal.\n\nDocument type: ${category}\nFile name: ${filename}\nFile size: ${file.size} bytes.`,
      html: "<p>A document was submitted through the Sanyagold client portal. The uploaded file is attached to this email.</p>",
      attachments: [
        {
          filename,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        },
      ],
    });

    if (!delivery.delivered) {
      return Response.json({ error: "The document email could not be sent. Please try again later." }, { status: 503 });
    }
  } catch (error) {
    console.error("[documents:email] Failed to deliver uploaded document.", error);
    return Response.json({ error: "The document email could not be sent. Please try again later." }, { status: 502 });
  }

  const document: PortalDocument = {
    id: crypto.randomUUID(),
    name: filename,
    sizeBytes: file.size,
    uploadedAt: new Date().toISOString(),
    category,
    status: "received",
  };

  return Response.json(document, { status: 201 });
}
