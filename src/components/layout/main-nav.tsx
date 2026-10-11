"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import { NAV_ITEMS, isActive } from "@/components/layout/nav-items";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Reads the current path. Suspends on request-time paths, so render it inside <Suspense>. */
export function MainNav() {
  return <MainNavView pathname={usePathname()} />;
}

/** Pass pathname="" for a version with no active link (the Suspense fallback). */
export function MainNavView({ pathname }: { pathname: string }) {
  return (
    <>
      <nav aria-label="Main navigation" className="hidden items-center gap-8 nav:flex">
        {NAV_ITEMS.map(({ href, label }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "border-b-2 py-6 text-sm font-semibold transition-colors hover:border-aqua hover:text-brand",
                active ? "border-aqua text-brand" : "border-transparent text-ink-soft",
              )}
            >
              {label}
            </Link>
          );
        })}
        <Button asChild>
          <Link href="/resources">Find help now</Link>
        </Button>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-lg" className="nav:hidden" aria-label="Open navigation">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="sr-only">Main navigation</SheetTitle>
            <Brand />
          </SheetHeader>
          <nav aria-label="Main navigation" className="flex flex-col gap-1 px-4">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 text-sm font-semibold transition-colors hover:bg-mint-pale hover:text-brand",
                      active ? "bg-mint-pale text-brand" : "text-ink-soft",
                    )}
                  >
                    {label}
                  </Link>
                </SheetClose>
              );
            })}
            <SheetClose asChild>
              <Button asChild className="mt-3">
                <Link href="/resources">Find help now</Link>
              </Button>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
