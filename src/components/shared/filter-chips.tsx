import Link from "next/link";

import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: React.ReactNode };

function chipClass(isActive: boolean) {
  return cn(
    "inline-flex min-h-12 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors hover:border-brand hover:bg-brand hover:text-primary-foreground [&_svg]:size-4",
    isActive ? "border-brand bg-brand text-primary-foreground" : "border-line bg-surface text-ink",
  );
}

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
                className={chipClass(isActive)}
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

/** On/off filters ("Open now"). Each chip links to the URL with that filter flipped. */
export function ToggleChips({
  label,
  options,
}: {
  label: string;
  options: readonly { key: string; label: string; active: boolean; href: string }[];
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {options.map(({ key, label: optionLabel, active, href }) => (
          <li key={key}>
            <Link href={href} scroll={false} className={chipClass(active)}>
              {optionLabel}
              <span className="sr-only">{active ? " (on, select to turn off)" : " (off)"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
