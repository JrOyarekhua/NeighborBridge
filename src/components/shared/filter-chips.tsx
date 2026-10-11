import Link from "next/link";

import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string };

/**
 * One-tap filters. Each chip is a plain link to the filtered URL, so it works
 * without JavaScript and the back button undoes it.
 */
export function FilterChips<T extends string>({
  label,
  options,
  active,
  hrefFor,
}: {
  label: string;
  options: readonly Option<T>[];
  active: T;
  hrefFor: (value: T) => string;
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {options.map(({ value, label: optionLabel }) => {
          const isActive = value === active;
          return (
            <li key={value}>
              <Link
                href={hrefFor(value)}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-bold transition-colors hover:border-brand hover:bg-brand hover:text-primary-foreground",
                  isActive
                    ? "border-brand bg-brand text-primary-foreground"
                    : "border-line bg-surface text-ink-soft",
                )}
              >
                {optionLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
