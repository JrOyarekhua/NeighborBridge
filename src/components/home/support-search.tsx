import Form from "next/form";
import { MapPin, Search } from "lucide-react";

import { CategoryPicker } from "@/components/home/category-picker";
import { IconInput } from "@/components/shared/icon-input";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/** Submits to /resources?category=Food&zip=30303. No client state needed. */
export function SupportSearch() {
  return (
    <section
      aria-labelledby="support-search-title"
      className="relative z-2 mx-auto -mt-16 w-full max-w-narrow px-4 sm:-mt-18"
    >
      <Form
        action="/resources"
        className="rounded-2xl border border-brand/12 bg-surface px-5 py-6 shadow-panel sm:rounded-3xl sm:p-11"
      >
        <SectionHeading
          id="support-search-title"
          kicker="Find support near you"
          title="What support do you need?"
          description="Choose a category and add your ZIP code to explore nearby options."
        />

        <CategoryPicker name="category" />

        <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <Label htmlFor="zip" className="mb-2 text-sm font-bold text-brand-deep">
              ZIP code <span className="font-medium text-ink-soft">(optional)</span>
            </Label>
            <IconInput
              icon={MapPin}
              id="zip"
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              pattern="[0-9]{5}"
              maxLength={5}
              title="Enter a 5-digit ZIP code"
              placeholder="e.g. 30303"
            />
          </div>
          <Button type="submit" className="h-12 w-full sm:w-auto sm:min-w-45">
            <Search /> Find Resources
          </Button>
        </div>

        <p className="mt-3 text-xs text-ink-soft">
          No account needed. We do not store your location.
        </p>
      </Form>
    </section>
  );
}
