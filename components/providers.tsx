"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { getQueryClient } from "@/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  // Browser: one QueryClient for the whole session. Server: a fresh one per request.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {/* "user" honours prefers-reduced-motion for every motion component. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
