"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { groupNavChildren, type NavChild } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  const base = href.split("#")[0] ?? href;
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** Reads the pathname (must sit inside <Suspense> under Cache Components). */
export function HeaderWithPathname() {
  const pathname = usePathname();
  return <SiteHeader pathname={pathname} />;
}

/** Sticky header that shrinks and gains a blurred background once the page scrolls. */
export function SiteHeader({ pathname }: { pathname: string | null }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 12));

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-border/70 bg-background/80 shadow-[0_4px_24px_-16px_rgba(15,27,45,0.25)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-4 transition-[height] duration-300",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Logo markClassName={cn("transition-[height] duration-300", scrolled ? "h-7" : "h-8")} />

        {/* Six top-level items need ~1100px; below that the mobile menu is used. */}
        <NavigationMenu className="hidden min-[1120px]:flex" aria-label="Main">
          <NavigationMenuList>
            {siteConfig.nav.map((item) =>
              "children" in item ? (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger data-active={isActive(pathname, item.href)}>
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {(() => {
                      const groups = groupNavChildren(item.children);
                      const grouped = groups.some((g) => g.group);
                      const renderLink = (child: NavChild) => (
                        <NavigationMenuLink asChild active={isActive(pathname, child.href)}>
                          <Link href={child.href}>
                            <span className="font-medium">{child.label}</span>
                            <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              {child.description}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      );
                      return (
                        <ul
                          className={cn(
                            "grid gap-1 p-1 sm:grid-cols-2",
                            grouped ? "w-[min(92vw,640px)]" : "w-[min(92vw,520px)]",
                          )}
                        >
                          <li className="sm:col-span-2">
                            <NavigationMenuLink asChild>
                              <Link href={item.href} className="bg-secondary/60">
                                <span className="font-medium">All {item.label.toLowerCase()}</span>
                                <span className="text-xs text-muted-foreground">
                                  {grouped ? "Grouped by the firm that provides each service" : "Overview"}
                                </span>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          {grouped
                            ? groups.map((g) => (
                                <li key={g.group} className="pt-1">
                                  <p className="px-3 pt-2 pb-1 text-[0.6875rem] font-semibold tracking-wider text-gold-ink uppercase">
                                    {g.group}
                                  </p>
                                  <ul>
                                    {g.items.map((child) => (
                                      <li key={child.href}>{renderLink(child)}</li>
                                    ))}
                                  </ul>
                                </li>
                              ))
                            : item.children.map((child) => <li key={child.href}>{renderLink(child)}</li>)}
                        </ul>
                      );
                    })()}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={isActive(pathname, item.href)}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={cn(navigationMenuTriggerStyle(), "data-[active=true]:bg-secondary")}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="sm" variant="accent" className="group hidden sm:inline-flex">
            <Link href="/book">
              Book a Consultation
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </motion.header>
  );
}
