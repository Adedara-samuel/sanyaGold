import Link from "next/link";
import { firmHref, getFirm } from "@/content/firms";

/**
 * Slim bar above the header on every marketing page, so visitors immediately see
 * that the site presents two independent, complementary firms.
 */
export function FirmsBar() {
  const sg = getFirm("sanyagold");
  const cpa = getFirm("oyebamiji-cpa");
  const link = "font-medium underline-offset-4 hover:underline focus-visible:underline";
  return (
    <div className="bg-primary text-primary-foreground">
      <p className="container-page flex min-h-9 flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 py-2 text-center text-xs leading-snug">
        <span className="opacity-80">
          <span className="sm:hidden">Two independent firms:</span>
          <span className="hidden sm:inline">Two independent, complementary firms:</span>
        </span>
        <Link href={firmHref("sanyagold")} className={link}>
          <span className="lg:hidden">{sg.shortName}</span>
          <span className="hidden lg:inline">{sg.name}</span>
        </Link>
        <span aria-hidden="true" className="opacity-60">
          &amp;
        </span>
        <span className="sr-only">and</span>
        <Link href={firmHref("oyebamiji-cpa")} className={link}>
          {cpa.name}
        </Link>
      </p>
    </div>
  );
}
