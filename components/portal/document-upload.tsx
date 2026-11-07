"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Clock, FileText, Loader2, UploadCloud } from "lucide-react";
import { ErrorState } from "@/components/query-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocuments, useUploadDocumentMutation } from "@/hooks/use-documents";
import type { PortalDocument } from "@/lib/types";
import { cn, formatBytes } from "@/lib/utils";
import { ALLOWED_UPLOAD_TYPES, documentCategories, validateUploadFile } from "@/lib/validators";

const statusMeta: Record<PortalDocument["status"], { label: string; icon: typeof Clock; className: string }> = {
  received: { label: "Received", icon: Clock, className: "text-muted-foreground" },
  "in-review": { label: "In review", icon: Loader2, className: "text-gold-ink" },
  processed: { label: "Processed", icon: CheckCircle2, className: "text-success" },
};

export function DocumentUpload() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string>(documentCategories[0]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const documents = useDocuments();
  const upload = useUploadDocumentMutation();

  function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    const problems: string[] = [];
    for (const file of Array.from(fileList)) {
      const error = validateUploadFile(file);
      if (error) {
        problems.push(`${file.name}: ${error}`);
        continue;
      }
      upload.mutate({ file, category });
    }
    setErrors(problems);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <section aria-labelledby="upload-title" className="space-y-5">
        <h2 id="upload-title" className="sr-only">
          Upload files
        </h2>

        <div className="grid gap-2">
          <Label htmlFor={`${inputId}-category`}>Document type</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id={`${inputId}-category`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {documentCategories.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label
          htmlFor={inputId}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            handleFiles(event.dataTransfer.files);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-card p-10 text-center transition-colors focus-within:ring-[3px] focus-within:ring-ring/50",
            dragging ? "border-accent bg-accent-soft" : "hover:border-accent/60",
          )}
        >
          <motion.span
            animate={dragging ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }}
            className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-gold-ink"
          >
            <UploadCloud className="size-6" aria-hidden="true" />
          </motion.span>
          <span className="font-medium">Drag files here or click to browse</span>
          <span className="text-xs text-muted-foreground">PDF, JPG, PNG, CSV, XLS(X), DOCX · max 25 MB</span>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            multiple
            accept={Object.values(ALLOWED_UPLOAD_TYPES).join(",")}
            className="sr-only"
            onChange={(event) => handleFiles(event.target.files)}
          />
        </label>

        {errors.length > 0 && (
          <ul role="alert" className="space-y-1 text-sm text-destructive">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={upload.isPending}>
          {upload.isPending ? <Loader2 className="animate-spin" /> : <UploadCloud />}
          {upload.isPending ? "Sending email…" : "Choose files"}
        </Button>
      </section>

      <section aria-labelledby="files-title" className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id="files-title" className="font-sans text-base font-semibold">
            Your documents
          </h2>
          <Badge variant="outline">Not stored</Badge>
        </div>

        {documents.isPending ? (
          <div className="mt-5 space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : documents.isError ? (
          <ErrorState
            className="mt-5"
            message="We couldn't load your documents."
            onRetry={() => documents.refetch()}
            isRetrying={documents.isRefetching}
          />
        ) : documents.data.length === 0 ? (
          <p className="mt-5 text-sm text-muted-foreground">No documents yet.</p>
        ) : (
          <ul className="mt-5 divide-y" aria-live="polite">
            <AnimatePresence initial={false}>
              {documents.data.map((doc) => {
                const status = statusMeta[doc.status];
                const optimistic = doc.id.startsWith("optimistic-");
                return (
                  <motion.li
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: optimistic ? 0.6 : 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 py-3"
                  >
                    <FileText className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.category} · {formatBytes(doc.sizeBytes)}
                      </p>
                    </div>
                    <span className={cn("inline-flex items-center gap-1 text-xs", status.className)}>
                      {optimistic ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> Uploading
                        </>
                      ) : (
                        <>
                          <status.icon className="size-3.5" aria-hidden="true" /> {status.label}
                        </>
                      )}
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </div>
  );
}
