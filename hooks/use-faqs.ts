"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export function useFaqs() {
  return useQuery({
    queryKey: queryKeys.faqs.all,
    queryFn: api.faqs.list,
    staleTime: 60 * 60 * 1000,
  });
}
