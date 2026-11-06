import Link from "next/link";
import { LogoMark } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="grid flex-1 place-items-center px-4 py-24 text-center">
      <div className="max-w-md">
        <LogoMark className="mx-auto h-16" />
        <p className="eyebrow mt-8">404</p>
        <h1 className="mt-3 text-4xl font-semibold">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-muted-foreground">The page may have moved, or the link may be out of date.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
