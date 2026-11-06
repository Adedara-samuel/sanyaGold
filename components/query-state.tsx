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
      className={cn(
        "flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-card p-8 text-center",
        className,
      )}
    >
      <AlertCircle className="size-6 text-destructive" aria-hidden="true" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isRetrying}>
          <RotateCw className={cn(isRetrying && "animate-spin")} />
          {isRetrying ? "Retrying…" : "Try again"}
        </Button>
      )}
    </div>
  );
}
