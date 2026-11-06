"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export function useServices() {
  return useQuery({
    queryKey: queryKeys.services.all,
    queryFn: api.services.list,
    staleTime: 60 * 60 * 1000,
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: queryKeys.services.detail(slug),
    queryFn: () => api.services.get(slug),
    staleTime: 60 * 60 * 1000,
  });
}
