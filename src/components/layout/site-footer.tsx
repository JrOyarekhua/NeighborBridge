import Link from "next/link";

import { Brand } from "@/components/layout/brand";
import { NAV_ITEMS } from "@/components/layout/nav-items";

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto w-full max-w-page px-6 pt-13 pb-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-16">
          <div>
            <Brand variant="light" />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
              Connecting Atlanta neighbors with support and opportunities to contribute.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col items-start gap-3">
              {NAV_ITEMS.map(({ href, label, footerLabel }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/75 transition-colors hover:text-mint"
                  >
                    {footerLabel ?? label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-9 border-t border-white/12 pt-5 text-xs text-white/50">
          Prototype only. Resource availability is not guaranteed. If you are in immediate
          danger, call 911.
        </p>
      </div>
    </footer>
  );
}
