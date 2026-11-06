import { getDocuments } from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { documentCategories, validateUploadFile } from "@/lib/validators";
import type { PortalDocument } from "@/lib/types";

/**
 * PLACEHOLDER portal document API.
 *
 * TODO(portal): before accepting real client documents this route MUST:
 *   - require an authenticated session and scope every read/write to that client
 *   - store files in private, access-controlled storage (e.g. S3 or Vercel Blob with signed URLs)
 *   - scan uploads for malware and keep an audit log
 * Today it returns sample data and DISCARDS uploaded file contents.
 */

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

  // TODO(portal): stream `file` to secure storage here. Nothing is persisted yet.
  const document: PortalDocument = {
    id: crypto.randomUUID(),
    name: file.name.slice(0, 200),
    sizeBytes: file.size,
    uploadedAt: new Date().toISOString(),
    category,
    status: "received",
  };

  return Response.json(document, { status: 201 });
}
