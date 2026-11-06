import type {
  ApiError,
  FaqGroup,
  PortalDocument,
  Post,
  PostSummary,
  Service,
  Testimonial,
} from "@/lib/types";
import type { BookingInput, ContactInput } from "@/lib/validators";

/** Error thrown by the typed fetch helpers; carries field-level issues when present. */
export class ApiRequestError extends Error {
  status: number;
  issues?: Record<string, string[]>;

  constructor(message: string, status: number, issues?: Record<string, string[]>) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.issues = issues;
  }
}

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let body: ApiError | undefined;
    try {
      body = (await response.json()) as ApiError;
    } catch {
      // Non-JSON error body; fall through to a generic message.
    }
    throw new ApiRequestError(
      body?.error ?? `Request failed with status ${response.status}`,
      response.status,
      body?.issues,
    );
  }

  return (await response.json()) as T;
}

export const api = {
  services: {
    list: () => request<Service[]>("/api/services"),
    get: (slug: string) => request<Service>(`/api/services/${encodeURIComponent(slug)}`),
  },
  testimonials: {
    list: () => request<Testimonial[]>("/api/testimonials"),
  },
  faqs: {
    list: () => request<FaqGroup[]>("/api/faqs"),
  },
  posts: {
    list: () => request<PostSummary[]>("/api/posts"),
    get: (slug: string) => request<Post>(`/api/posts/${encodeURIComponent(slug)}`),
  },
  contact: {
    send: (data: ContactInput) =>
      request<{ ok: true }>("/api/contact", { method: "POST", body: JSON.stringify(data) }),
  },
  booking: {
    request: (data: BookingInput) =>
      request<{ ok: true; when?: string }>("/api/booking", { method: "POST", body: JSON.stringify(data) }),
  },
  documents: {
    list: () => request<PortalDocument[]>("/api/documents"),
    upload: (formData: FormData) =>
      request<PortalDocument>("/api/documents", { method: "POST", body: formData }),
  },
};
