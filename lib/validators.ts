import { z } from "zod";

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

/** Fallback booking request when the scheduling embed is not configured or not wanted. */
export const bookingSchema = z.object({
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
  preferredTime: z.string().trim().min(2, "Let us know a few days or times that work.").max(200),
  topic: z.string().trim().max(1000),
  website: z.string().max(0),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const bookingDefaults: BookingInput = {
  name: "",
  email: "",
  phone: "",
  organizationType: "small-business",
  preferredTime: "",
  topic: "",
  website: "",
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
