/**
 * Query key factories — the only place query keys are defined.
 * Use these everywhere (hooks, prefetching, invalidation) to keep keys consistent.
 */
export const queryKeys = {
  services: {
    all: ["services"] as const,
    detail: (slug: string) => ["services", slug] as const,
  },
  testimonials: {
    all: ["testimonials"] as const,
  },
  faqs: {
    all: ["faqs"] as const,
  },
  posts: {
    all: ["posts"] as const,
    detail: (slug: string) => ["posts", slug] as const,
  },
  documents: {
    all: ["documents"] as const,
  },
} as const;
