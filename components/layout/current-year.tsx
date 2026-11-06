"use client";

/**
 * Renders the current year. A Client Component so the year is computed at
 * view time (Cache Components disallows `new Date()` in the prerendered shell).
 */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
