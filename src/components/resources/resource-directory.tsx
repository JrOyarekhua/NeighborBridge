import Link from "next/link";

import { ResourceCard } from "@/components/resources/resource-card";
import { ResourceFilters } from "@/components/resources/resource-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import { resources } from "@/lib/data";
import { parseResourceFilters, type SearchParams } from "@/lib/filters";
import { filterResources } from "@/lib/resources";

/** Reads the URL, so it must render inside <Suspense> (see app/resources/page.tsx). */
export async function ResourceDirectory({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseResourceFilters(await searchParams);
  const results = filterResources(resources, filters);
  const hasFilters = filters.category !== "All" || filters.zip !== "" || filters.q !== "";

  return (
    <DirectoryLayout sidebar={<ResourceFilters filters={filters} />}>
      <section aria-labelledby="results-heading">
        <div className="mb-4 flex min-h-16 items-end justify-between gap-5 sm:items-center">
          <div aria-live="polite">
            <Eyebrow>Resource directory</Eyebrow>
            <h2 id="results-heading" className="mt-1 text-2xl font-bold tracking-tight text-brand-deep">
              {results.length} {results.length === 1 ? "resource" : "resources"} found
            </h2>
          </div>
          {hasFilters && (
            <Button asChild variant="ghost">
              <Link href="/resources">Clear filters</Link>
            </Button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="grid gap-4">
            {results.map((resource) => (
              <li key={resource.id}>
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No matching resources"
            description="Try a different ZIP code, broaden your search, or clear your filters."
            actionHref="/resources"
          />
        )}
      </section>
    </DirectoryLayout>
  );
}

/** Sidebar + results grid. Shared with the loading skeleton so nothing jumps when results arrive. */
export function DirectoryLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid w-full max-w-page items-start gap-8 px-4 pt-6 pb-24 sm:pt-10 nav:grid-cols-[17.5rem_1fr]">
      {sidebar}
      {children}
    </div>
  );
}
