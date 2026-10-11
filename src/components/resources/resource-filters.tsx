import Form from "next/form";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";

import { CollapsibleOnMobile } from "@/components/shared/collapsible-on-mobile";
import { DemoNotice } from "@/components/shared/demo-notice";
import { FilterChips, ToggleChips } from "@/components/shared/filter-chips";
import { IconInput } from "@/components/shared/icon-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ResourceCategory } from "@/lib/data";
import { RESOURCE_CATEGORIES, withParams, type ResourceFilters as Filters } from "@/lib/filters";

const CATEGORY_OPTIONS: { value: ResourceCategory | "All"; label: string }[] = [
  { value: "All", label: "All" },
  ...RESOURCE_CATEGORIES.map((value) => ({ value, label: `${value} Assistance` })),
];

export function ResourceFilters({ filters }: { filters: Filters }) {
  const href = (changes: Partial<Filters>) => withParams("/resources", { ...filters, ...changes });

  return (
    <aside
      aria-label="Resource filters"
      className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-6 nav:sticky nav:top-24"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h2 className="text-lg font-bold whitespace-nowrap text-brand-deep">Filter resources</h2>
        <Link
          href={withParams("/resources", { view: filters.view })}
          className="text-sm font-bold text-teal-link hover:underline"
        >
          Clear all filters
        </Link>
      </div>

      {/* `key` remounts the form when the URL changes (e.g. back button), so inputs show the current filters. */}
      <Form action="/resources" key={JSON.stringify(filters)} className="flex flex-col gap-4">
        {filters.category !== "All" && (
          <input type="hidden" name="category" value={filters.category} />
        )}
        {filters.open && <input type="hidden" name="open" value="1" />}
        {filters.verified && <input type="hidden" name="verified" value="1" />}
        {filters.view === "map" && <input type="hidden" name="view" value="map" />}
        <div>
          <Label htmlFor="filter-q" className="mb-2 text-sm font-bold text-brand-deep">
            Search by keyword
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
            ZIP code or neighborhood
          </Label>
          <IconInput
            icon={MapPin}
            id="filter-zip"
            name="zip"
            autoComplete="off"
            maxLength={30}
            defaultValue={filters.zip}
            placeholder="30303 or Downtown"
          />
        </div>
        <Button type="submit" variant="outline">
          Apply filters
        </Button>
      </Form>

      <div className="mt-6 flex flex-col gap-6">
        <CollapsibleOnMobile label="More filters" className="space-y-6">
          <fieldset>
            <legend className="mb-2.5 text-sm font-bold text-brand-deep">Support type</legend>
            <FilterChips
              label="Support type"
              options={CATEGORY_OPTIONS}
              active={filters.category}
              hrefFor={(category) => href({ category })}
            />
          </fieldset>
          <fieldset>
            <legend className="mb-2.5 text-sm font-bold text-brand-deep">More filters</legend>
            <ToggleChips
              label="More filters"
              options={[
                { key: "open", label: "Open now", active: filters.open, href: href({ open: !filters.open }) },
                {
                  key: "verified",
                  label: "Verified resources",
                  active: filters.verified,
                  href: href({ verified: !filters.verified }),
                },
              ]}
            />
          </fieldset>
          <DemoNotice compact />
        </CollapsibleOnMobile>
        <p className="text-sm text-ink-soft">Your searches are not stored.</p>
      </div>
    </aside>
  );
}
