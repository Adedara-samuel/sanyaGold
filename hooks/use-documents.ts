"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { PortalDocument } from "@/lib/types";

// TODO(portal): once authentication exists, include the user/organization id in
// the query key (e.g. queryKeys.documents.byClient(clientId)) so caches never mix.
export function useDocuments() {
  return useQuery({
    queryKey: queryKeys.documents.all,
    queryFn: api.documents.list,
    staleTime: 30 * 1000,
  });
}

interface UploadVars {
  file: File;
  category: string;
  note?: string;
}

/**
 * Placeholder upload flow with an optimistic list entry.
 * TODO(portal): replace the API route with a real storage integration
 * (e.g. presigned S3/Vercel Blob uploads behind authentication, malware scanning).
 */
export function useUploadDocumentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["documents", "upload"],
    mutationFn: ({ file, category, note }: UploadVars) => {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("category", category);
      if (note) formData.set("note", note);
      return api.documents.upload(formData);
    },
    onMutate: async ({ file, category }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.documents.all });
      const previous = queryClient.getQueryData<PortalDocument[]>(queryKeys.documents.all);
      const optimistic: PortalDocument = {
        id: `optimistic-${file.name}-${file.size}`,
        name: file.name,
        sizeBytes: file.size,
        uploadedAt: new Date().toISOString(),
        category,
        status: "received",
      };
      queryClient.setQueryData<PortalDocument[]>(queryKeys.documents.all, (old = []) => [optimistic, ...old]);
      return { previous, optimisticId: optimistic.id };
    },
    onError: (error, vars, context) => {
      if (context?.previous) queryClient.setQueryData(queryKeys.documents.all, context.previous);
      toast.error(`Upload failed: ${vars.file.name}`, { description: error.message });
    },
    onSuccess: (doc, _vars, context) => {
      queryClient.setQueryData<PortalDocument[]>(queryKeys.documents.all, (old = []) =>
        old.map((item) => (item.id === context?.optimisticId ? doc : item)),
      );
      toast.success(`Uploaded ${doc.name}`);
    },
  });
}
