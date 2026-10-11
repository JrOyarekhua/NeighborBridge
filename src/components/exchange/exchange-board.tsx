import Form from "next/form";
import { Search } from "lucide-react";

import { CommunityCard } from "@/components/exchange/community-card";
import { PostListingDialog } from "@/components/exchange/post-listing-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Eyebrow } from "@/components/shared/eyebrow";
import { FilterChips } from "@/components/shared/filter-chips";
import { IconInput } from "@/components/shared/icon-input";
import { Button } from "@/components/ui/button";
import { exchangeListings, type ExchangeType } from "@/lib/data";
import { filterListings } from "@/lib/exchange";
import {
  EXCHANGE_TYPES,
  parseExchangeFilters,
  withParams,
  type SearchParams,
} from "@/lib/filters";

const TYPE_OPTIONS: { value: ExchangeType | "All"; label: string }[] = [
  { value: "All", label: "All" },
  ...EXCHANGE_TYPES.map((value) => ({ value, label: value })),
];

/** Reads the URL, so it must render inside <Suspense> (see app/exchange/page.tsx). */
export async function ExchangeBoard({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseExchangeFilters(await searchParams);
  const results = filterListings(exchangeListings, filters);

  return (
    <div id="exchange-board" className="scroll-mt-24">
      <div className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              placeholder="Search requests, offers, or volunteer opportunities"
            />
          </div>
          <Button type="submit" variant="outline">
            Search
          </Button>
        </Form>
        <PostListingDialog />
      </div>
      <div className="mb-8">
        <FilterChips
          label="Listing type"
          options={TYPE_OPTIONS}
          active={filters.type}
          hrefFor={(type) => withParams("/exchange", { ...filters, type })}
        />
      </div>

      <section aria-labelledby="listings-heading">
        <div aria-live="polite" className="mb-4">
          <Eyebrow>Community Exchange Board</Eyebrow>
          <h2 id="listings-heading" className="display-heading mt-1 text-4xl text-brand">
            {results.length} community {results.length === 1 ? "listing" : "listings"}
          </h2>
        </div>

        {results.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 wide:grid-cols-3">
            {results.map((listing) => (
              <li key={listing.id}>
                <CommunityCard listing={listing} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No listings match your search."
            description="Try another search or filter, or post a listing of your own."
            actionHref="/exchange"
          />
        )}
      </section>
    </div>
  );
}
