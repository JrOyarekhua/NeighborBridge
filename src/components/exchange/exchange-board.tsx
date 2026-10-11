import Form from "next/form";
import { Search } from "lucide-react";

import { CommunityCard } from "@/components/exchange/community-card";
import { LISTING_TYPE_META } from "@/components/exchange/listing-type-meta";
import { EmptyState } from "@/components/shared/empty-state";
import { Eyebrow } from "@/components/shared/eyebrow";
import { FilterChips } from "@/components/shared/filter-chips";
import { IconInput } from "@/components/shared/icon-input";
import { Button } from "@/components/ui/button";
import { exchangeListings, type ExchangeType } from "@/lib/data";
import { filterListings } from "@/lib/exchange";
import { parseExchangeFilters, withParams, type SearchParams } from "@/lib/filters";

const TYPE_OPTIONS: { value: ExchangeType | "All"; label: string }[] = [
  { value: "All", label: "All" },
  ...(Object.keys(LISTING_TYPE_META) as ExchangeType[]).map((value) => ({
    value,
    label: LISTING_TYPE_META[value].plural,
  })),
];

/** Reads the URL, so it must render inside <Suspense> (see app/exchange/page.tsx). */
export async function ExchangeBoard({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseExchangeFilters(await searchParams);
  const results = filterListings(exchangeListings, filters);

  return (
    <>
      <div className="my-6 flex flex-col gap-4 nav:mb-8 nav:flex-row nav:items-center">
        <Form
          action="/exchange"
          key={JSON.stringify(filters)}
          role="search"
          className="flex flex-1 gap-2"
        >
          {filters.type !== "All" && <input type="hidden" name="type" value={filters.type} />}
          <label htmlFor="exchange-q" className="sr-only">
            Search listings
          </label>
          <div className="flex-1">
            <IconInput
              icon={Search}
              id="exchange-q"
              name="q"
              type="search"
              maxLength={100}
              defaultValue={filters.q}
              placeholder="Search listings, skills, or opportunities"
            />
          </div>
          <Button type="submit" variant="outline">
            Search
          </Button>
        </Form>
        <FilterChips
          label="Listing type"
          options={TYPE_OPTIONS}
          active={filters.type}
          hrefFor={(type) => withParams("/exchange", { ...filters, type })}
        />
      </div>

      <section aria-labelledby="listings-heading">
        <div aria-live="polite" className="mb-4">
          <Eyebrow>Explore opportunities</Eyebrow>
          <h2 id="listings-heading" className="mt-1 text-2xl font-bold tracking-tight text-brand-deep">
            {results.length} community {results.length === 1 ? "listing" : "listings"}
          </h2>
        </div>

        {results.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2">
            {results.map((listing) => (
              <li key={listing.id}>
                <CommunityCard listing={listing} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No listings found"
            description="Try another search or filter."
            actionHref="/exchange"
          />
        )}
      </section>
    </>
  );
}
