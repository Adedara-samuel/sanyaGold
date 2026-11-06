"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkClass = (href: string) =>
    cn(
      "block rounded-xl px-3 py-2.5 text-base transition-colors hover:bg-secondary",
      pathname === href ? "bg-secondary font-medium" : "text-foreground/85",
    );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader className="border-b">
          <SheetTitle asChild>
            <div>
              <Logo href={null} markClassName="h-7" wordClassName="text-xl" />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="px-3">
          <ul className="space-y-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className={linkClass(item.href)}>
                  {item.label}
                </Link>
                {"children" in item && (
                  <ul className="border-border mt-1 mb-2 ml-3 space-y-0.5 border-l pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={close} className={cn(linkClass(child.href), "py-2 text-[0.9375rem]")}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter className="border-t">
          <Button asChild variant="accent" size="lg">
            <Link href={siteConfig.cta.primary.href} onClick={close}>
              {siteConfig.cta.primary.label}
            </Link>
          </Button>
          <Separator className="my-1" />
          <a href={siteConfig.contact.phoneHref} className="text-muted-foreground inline-flex items-center gap-2 text-sm">
            <Phone className="size-4" /> {siteConfig.contact.phone}
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
