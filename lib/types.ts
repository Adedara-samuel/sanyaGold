import type { LucideIcon } from "lucide-react";

export type ServiceSlug = "tax" | "accounting" | "audit-assurance" | "consulting" | "payroll" | "hr-management";

/** The two independent firms presented on this website. */
export type FirmId = "sanyagold" | "oyebamiji-cpa";

export interface Firm {
  id: FirmId;
  /** Full business name, used wherever the firm is formally identified. */
  name: string;
  /** Short name for tight spaces (badges, nav groups). */
  shortName: string;
  /** Two-letter monogram used until an official logo is supplied. */
  monogram: string;
  /** One-line positioning shown under the name. */
  focus: string;
  summary: string;
  description: string;
  /** What clients typically engage this firm for. */
  highlights: string[];
  /** CPA licensing details, only for the licensed CPA firm. */
  licensing?: {
    firmPermit: string;
    licensingBoard: string;
    licensingBoardUrl: string;
  };
}

/** Icon names are strings so data stays serialisable across the API boundary. */
export type IconName =
  | "receipt"
  | "book"
  | "shield"
  | "compass"
  | "heart"
  | "store"
  | "briefcase"
  | "building"
  | "home"
  | "graduation"
  | "stethoscope"
  | "church"
  | "users"
  | "clock"
  | "sparkles"
  | "map"
  | "message"
  | "wallet"
  | "people";

export interface Service {
  slug: ServiceSlug;
  /** The firm that provides (and contracts for) this service. */
  firm: FirmId;
  title: string;
  shortTitle: string;
  icon: IconName;
  summary: string;
  description: string;
  idealFor: string[];
  offerings: { title: string; description: string }[];
  process: { step: string; description: string }[];
  faqs: Faq[];
}

export interface Industry {
  slug: string;
  name: string;
  icon: IconName;
  featured: boolean;
  headline?: string;
  description?: string;
  points?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  avatarUrl?: string;
  isPlaceholder: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  credentials: string;
  licenseNumber: string;
  bio: string;
  photoUrl?: string;
  linkedin?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface FaqGroup {
  category: string;
  items: Faq[];
}

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  author: string;
  body: PostBlock[];
}

export type PostSummary = Omit<Post, "body">;

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  placeholder: boolean;
}

export interface PortalDocument {
  id: string;
  name: string;
  sizeBytes: number;
  uploadedAt: string;
  category: string;
  status: "received" | "in-review" | "processed";
}

export type IconMap = Record<IconName, LucideIcon>;

export interface ApiError {
  error: string;
  issues?: Record<string, string[]>;
}
