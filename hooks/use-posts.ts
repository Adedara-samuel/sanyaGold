"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts.all,
    queryFn: api.posts.list,
    staleTime: 15 * 60 * 1000,
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: queryKeys.posts.detail(slug),
    queryFn: () => api.posts.get(slug),
    staleTime: 15 * 60 * 1000,
  });
}
