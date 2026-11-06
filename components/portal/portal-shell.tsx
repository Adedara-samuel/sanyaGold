import Link from "next/link";
import { ArrowLeft, FileUp, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Badge } from "@/components/ui/badge";

const portalNav = [
  { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { label: "Documents", href: "/portal/documents", icon: FileUp },
];

/**
 * Portal chrome. Kept separate from the marketing layout so the portal can
 * grow into its own product.
 * TODO(portal): read the signed-in user here and show their name/organization.
 */
export function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo href="/portal/dashboard" markClassName="h-7" wordClassName="text-xl" />
            <Badge variant="outline" className="hidden sm:inline-flex">
              Client Portal · Preview
            </Badge>
          </div>
          <nav aria-label="Portal" className="flex items-center gap-1">
            {portalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                <item.icon className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/portal/login"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground hover:bg-secondary"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Sign out</span>
            </Link>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 focus:outline-none sm:px-6">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <Link href="/" className="inline-flex items-center gap-1.5 hover:underline">
          <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to sanyagold.com
        </Link>
      </footer>
    </div>
  );
}
