import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/** Single-choice row of pill buttons ("Open and Serving", "Closed Today"…). */
export function ToggleButtons<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly T[];
  value: T | "";
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={cn(
              "inline-flex min-h-12 items-center gap-1.5 rounded-full border px-3.5 py-2.5 font-semibold transition-colors hover:border-aqua hover:bg-mint-pale",
              selected ? "border-brand bg-mint text-brand" : "border-line bg-surface text-ink",
            )}
          >
            {selected && <Check className="size-4" aria-hidden="true" />} {option}
          </button>
        );
      })}
    </div>
  );
}
