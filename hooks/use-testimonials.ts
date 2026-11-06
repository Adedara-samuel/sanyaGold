"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials.all,
    queryFn: api.testimonials.list,
    staleTime: 30 * 60 * 1000,
  });
}
