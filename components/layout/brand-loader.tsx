import { cn } from "@/lib/utils";

/**
 * Branded loading indicator: the Sanyagold mark gently separating and
 * re-interlocking inside a tracing gold hexagon. Used by loading.tsx files.
 */
export function BrandLoader({ label = "Loading", className }: { label?: string; className?: string }) {
  return (
    <div role="status" className={cn("grid flex-1 place-items-center px-4 py-32", className)}>
      <div className="flex flex-col items-center gap-5">
        <svg viewBox="-440 -470 880 940" className="h-16 w-auto overflow-visible" aria-hidden="true">
          <polygon
            className="sg-loader__ring"
            points="0,-455 394,-227.5 394,227.5 0,455 -394,227.5 -394,-227.5"
            pathLength={1}
          />
          <path
            className="sg-loader__hook sg-loader__hook--a"
            d="M-30 -428L-390 -220L-390 220L-185 338L200 116L200 -33L89 -33L89 50L-185 208L-277 155L-277 -155L26 -330Z"
          />
          <path
            className="sg-loader__hook sg-loader__hook--b"
            d="M30 428L390 220L390 -220L185 -338L-200 -116L-200 33L-89 33L-89 -50L185 -208L277 -155L277 155L-26 330Z"
          />
        </svg>
        <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">{label}…</span>
      </div>
    </div>
  );
}
