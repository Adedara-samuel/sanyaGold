"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, ApiRequestError } from "@/lib/api";
import type { ContactInput } from "@/lib/validators";

interface Options {
  onSuccess?: () => void;
  onFieldErrors?: (issues: Record<string, string[]>) => void;
}

/**
 * Sends the contact form. The UI flips to a "sending" state immediately
 * (optimistic pending state), then shows a toast and resets the form on success.
 */
export function useContactMutation({ onSuccess, onFieldErrors }: Options = {}) {
  return useMutation({
    mutationKey: ["contact"],
    mutationFn: (data: ContactInput) => api.contact.send(data),
    onMutate: () => {
      const toastId = toast.loading("Sending your message…");
      return { toastId };
    },
    onSuccess: (_data, _vars, context) => {
      toast.success("Thanks! Your message is on its way.", {
        id: context?.toastId,
        description: "We usually reply within one business day.",
      });
      onSuccess?.();
    },
    onError: (error, _vars, context) => {
      if (error instanceof ApiRequestError && error.issues) onFieldErrors?.(error.issues);
      toast.error("We couldn't send your message.", {
        id: context?.toastId,
        description:
          error instanceof ApiRequestError && error.status === 429
            ? "Too many attempts. Please wait a minute and try again."
            : "Please try again, or call us directly.",
      });
    },
  });
}
