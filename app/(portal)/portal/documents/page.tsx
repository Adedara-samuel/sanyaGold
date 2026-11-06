import type { Metadata } from "next";
import { DocumentUpload } from "@/components/portal/document-upload";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata: Metadata = { title: "Documents · Client Portal" };

export default function PortalDocumentsPage() {
  return (
    <PortalShell>
      <h1 className="text-3xl font-semibold">Documents</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Upload files for your accountant. Accepted formats: PDF, JPG, PNG, CSV, Excel and Word, up to 25 MB each.
      </p>
      <DocumentUpload />
    </PortalShell>
  );
}
