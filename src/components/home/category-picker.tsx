"use client";

import { Check, ChevronRight } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { CATEGORY_META } from "@/components/resources/category-meta";
import type { ResourceCategory } from "@/lib/data";

/** The home page asks about the two main needs; Emergency lives in the directory filters. */
const CATEGORIES = (["Food", "Housing"] as const satisfies readonly ResourceCategory[]).map(
  (value) => ({ value, ...CATEGORY_META[value] }),
);

/**
 * Food / Housing choice styled as cards. A radio group underneath, so it has
 * arrow-key navigation and submits `category=Food|Housing` with its form.
 */
export function CategoryPicker({ name }: { name: string }) {
  return (
    <RadioGroupPrimitive.Root
      name={name}
      defaultValue="Food"
      aria-label="Support type"
      className="mt-7 mb-6 grid gap-3.5 sm:grid-cols-2"
    >
      {CATEGORIES.map(({ value, icon: Icon, description }) => (
        <RadioGroupPrimitive.Item
          key={value}
          value={value}
          className="group flex min-h-28 items-center gap-4 rounded-card border-2 border-line bg-surface p-5 text-left transition hover:-translate-y-px hover:border-aqua data-[state=checked]:border-brand data-[state=checked]:bg-mint"
        >
          <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-mint-pale text-brand">
            <Icon size={28} aria-hidden="true" />
          </span>
          <span>
            <strong className="block text-base text-brand-deep">{value} Assistance</strong>
            <small className="mt-1 block text-sm leading-snug text-ink-soft">
              {description}
            </small>
          </span>
          <span className="ml-auto text-brand" aria-hidden="true">
            <Check size={18} className="hidden group-data-[state=checked]:block" />
            <ChevronRight size={18} className="group-data-[state=checked]:hidden" />
          </span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
