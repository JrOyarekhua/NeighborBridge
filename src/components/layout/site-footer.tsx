import Link from "next/link";

import { Brand } from "@/components/layout/brand";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { ExternalLink } from "@/components/shared/external-link";

export function SiteFooter() {
  return (
    <footer className="relative bg-footer text-white">
      {/* Four-color stripe across the top. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.25 bg-[linear-gradient(90deg,var(--color-coral)_0_25%,var(--color-sun)_25%_50%,var(--color-aqua)_50%_75%,var(--color-purple)_75%)]"
      />
      <div className="mx-auto w-full max-w-page px-6 pt-13 pb-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-16">
          <div>
            <Brand variant="light" />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-footer-text">
              Connecting Atlanta neighbors with support and opportunities to contribute.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col items-start">
              {NAV_ITEMS.map(({ href, label, footerLabel }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex min-h-12 items-center text-sm text-footer-text transition-colors hover:text-white"
                  >
                    {footerLabel ?? label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-sm font-semibold">
          Need more help? Call{" "}
          <a href="tel:211" className="underline-offset-2 hover:underline">
            211
          </a>{" "}
          or visit{" "}
          <ExternalLink href="https://211.org/" className="underline-offset-2 hover:underline">
            211.org
          </ExternalLink>
          .
        </p>
        <p className="mt-3 border-t border-white/12 pt-5 text-sm text-footer-text">
          Prototype only. Resource availability is not guaranteed. If you are in immediate
          danger, call 911.
        </p>
      </div>
    </footer>
  );
}
