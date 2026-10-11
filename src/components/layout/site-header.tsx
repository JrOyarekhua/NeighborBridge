import { Suspense } from "react";

import { Brand } from "@/components/layout/brand";
import { MainNav, MainNavView } from "@/components/layout/main-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand/12 bg-surface/94 backdrop-blur-lg">
      <div className="mx-auto flex min-h-16 w-full max-w-page items-center justify-between px-4 nav:min-h-18">
        <Brand />
        <Suspense fallback={<MainNavView pathname="" />}>
          <MainNav />
        </Suspense>
      </div>
    </header>
  );
}
