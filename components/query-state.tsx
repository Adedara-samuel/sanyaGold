"use client";

import { AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ErrorState({
  message = "We couldn't load this right now.",
  onRetry,
  isRetrying,
  className,
}: {
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn("bg-card flex flex-col items-center gap-4 rounded-2xl border border-dashed p-8 text-center", className)}
    >
      <AlertCircle className="text-destructive size-6" aria-hidden="true" />
      <p className="text-muted-foreground text-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isRetrying}>
          <RotateCw className={cn(isRetrying && "animate-spin")} />
          {isRetrying ? "Retrying…" : "Try again"}
        </Button>
      )}
    </div>
  );
}
