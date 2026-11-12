import { cn } from "@/lib/utils";

/**
 * Branded loading indicator: the Sanyagold Golden Line mark with its gold
 * line sweeping through on a loop. Used by loading.tsx files.
 */
export function BrandLoader({ label = "Loading", className }: { label?: string; className?: string }) {
  return (
    <div role="status" className={cn("grid flex-1 place-items-center px-4 py-32", className)}>
      <div className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 100 100" className="h-14 w-auto" aria-hidden="true">
          <path className="sg-loader__ink" d="M0 0L100 0L89.5 10.5L0 10.5Z" />
          <path className="sg-loader__ink" d="M0 0H10.5V39.25H0Z" />
          <path className="sg-loader__gold" d="M0 44.75H100V55.25H0Z" />
          <path className="sg-loader__ink" d="M89.5 60.75H100V100H89.5Z" />
          <path className="sg-loader__ink" d="M10.5 89.5L100 89.5L100 100L0 100Z" />
        </svg>
        <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">{label}…</span>
      </div>
    </div>
  );
}
