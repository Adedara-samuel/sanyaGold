import { z } from "zod";
import { BOOKING_SLOTS } from "@/lib/booking";

/** Shared by the client form AND the /api/contact route handler. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+().\-\s]*$/, "Please enter a valid phone number."),
  organization: z.string().trim().max(150),
  service: z.string().max(50),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few more details (at least 10 characters).")
    .max(4000, "Please keep your message under 4,000 characters."),
  /** Honeypot: hidden from people, often filled in by bots. Must stay empty. */
  website: z.string().max(0),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactDefaults: ContactInput = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  service: "",
  message: "",
  website: "",
};

/** Consultation request from the built-in scheduler (date + time slot + details). */
export const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a day."),
  time: z.enum(BOOKING_SLOTS as unknown as [string, ...string[]], { error: "Please choose a time." }),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+().\-\s]*$/, "Please enter a valid phone number."),
  organizationType: z.enum(["nonprofit", "small-business", "professional-services", "individual", "other"], {
    error: "Please choose one.",
  }),
  topic: z.string().trim().max(1000),
  website: z.string().max(0),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const bookingDetailDefaults: Omit<BookingInput, "date" | "time"> = {
  name: "",
  email: "",
  phone: "",
  organizationType: "small-business",
  topic: "",
  website: "",
};

export const organizationTypeLabels: Record<BookingInput["organizationType"], string> = {
  "small-business": "Small business",
  nonprofit: "Nonprofit",
  "professional-services": "Professional services firm",
  individual: "Individual / business owner",
  other: "Other",
};

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

export const ALLOWED_UPLOAD_TYPES = {
  "application/pdf": ".pdf",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "text/csv": ".csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
} as const;

export const documentCategories = [
  "Tax documents",
  "Financial statements",
  "Bank & credit card",
  "Payroll",
  "Grants & contracts",
  "Other",
] as const;

export function validateUploadFile(file: { size: number; type: string }): string | null {
  if (file.size === 0) return "This file is empty.";
  if (file.size > MAX_UPLOAD_BYTES) return "Files must be 25 MB or smaller.";
  if (!(file.type in ALLOWED_UPLOAD_TYPES)) {
    return "Unsupported file type. Please upload PDF, JPG, PNG, CSV, Excel or Word files.";
  }
  return null;
}

export function zodIssuesToRecord(error: z.ZodError): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    (result[key] ??= []).push(issue.message);
  }
  return result;
}
