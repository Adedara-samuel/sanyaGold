"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, ApiRequestError } from "@/lib/api";
import type { BookingInput } from "@/lib/validators";

interface Options {
  onSuccess?: () => void;
  onFieldErrors?: (issues: Record<string, string[]>) => void;
}

export function useBookingRequestMutation({ onSuccess, onFieldErrors }: Options = {}) {
  return useMutation({
    mutationKey: ["booking-request"],
    mutationFn: (data: BookingInput) => api.booking.request(data),
    onMutate: () => ({ toastId: toast.loading("Sending your request…") }),
    onSuccess: (_data, _vars, context) => {
      toast.success("Request received!", {
        id: context?.toastId,
        description: "We'll email you to confirm a time.",
      });
      onSuccess?.();
    },
    onError: (error, _vars, context) => {
      if (error instanceof ApiRequestError && error.issues) onFieldErrors?.(error.issues);
      toast.error("We couldn't send your request.", {
        id: context?.toastId,
        description:
          error instanceof ApiRequestError && error.status === 429
            ? "Too many attempts. Please wait a minute and try again."
            : "Please try again, or call us directly.",
      });
    },
  });
}
