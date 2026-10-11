import Form from "next/form";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";

import { DemoNotice } from "@/components/shared/demo-notice";
import { FilterChips } from "@/components/shared/filter-chips";
import { IconInput } from "@/components/shared/icon-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ResourceCategory } from "@/lib/data";
import { withParams, type ResourceFilters as Filters } from "@/lib/filters";

const CATEGORY_OPTIONS: { value: ResourceCategory | "All"; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Food", label: "Food" },
  { value: "Housing", label: "Housing" },
];

export function ResourceFilters({ filters }: { filters: Filters }) {
  return (
    <aside
      aria-label="Resource filters"
      className="rounded-xl border border-line bg-surface p-5 sm:p-6 nav:sticky nav:top-24"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-deep">Filter resources</h2>
        <Link href="/resources" className="text-xs font-bold text-brand hover:underline">
          Clear all
        </Link>
      </div>

      {/* `key` remounts the form when the URL changes (e.g. back button), so inputs show the current filters. */}
      <Form action="/resources" key={JSON.stringify(filters)} className="flex flex-col gap-5">
        {filters.category !== "All" && (
          <input type="hidden" name="category" value={filters.category} />
        )}
        <div>
          <Label htmlFor="filter-q" className="mb-2 text-sm font-bold text-brand-deep">
            Search
          </Label>
          <IconInput
            icon={Search}
            id="filter-q"
            name="q"
            type="search"
            maxLength={100}
            defaultValue={filters.q}
            placeholder="Program or service"
          />
        </div>
        <div>
          <Label htmlFor="filter-zip" className="mb-2 text-sm font-bold text-brand-deep">
            ZIP code
          </Label>
          <IconInput
            icon={MapPin}
            id="filter-zip"
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            pattern="[0-9]{5}"
            maxLength={5}
            title="Enter a 5-digit ZIP code"
            defaultValue={filters.zip}
            placeholder="30303"
          />
        </div>
        <Button type="submit" variant="outline">
          Apply filters
        </Button>
      </Form>

      <div className="mt-6">
        <p className="mb-2.5 text-sm font-bold text-brand-deep">Support type</p>
        <FilterChips
          label="Support type"
          options={CATEGORY_OPTIONS}
          active={filters.category}
          hrefFor={(category) => withParams("/resources", { ...filters, category })}
        />
      </div>

      <DemoNotice compact className="mt-6" />
    </aside>
  );
}
