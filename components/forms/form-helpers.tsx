"use client";

import type { FieldValues, Path, UseFormRegisterReturn, UseFormSetError } from "react-hook-form";

/** Visually hidden field that real visitors never see or fill in. Bots usually do. */
export function HoneypotField({ register }: { register: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  );
}

/** Maps server-side zod issues back onto react-hook-form fields. */
export function applyServerIssues<T extends FieldValues>(
  setError: UseFormSetError<T>,
  issues: Record<string, string[]>,
) {
  for (const [field, messages] of Object.entries(issues)) {
    if (field === "form" || !messages[0]) continue;
    setError(field as Path<T>, { type: "server", message: messages[0] });
  }
}
