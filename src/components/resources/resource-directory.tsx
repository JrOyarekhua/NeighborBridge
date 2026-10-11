import { List, Map as MapIcon } from "lucide-react";

import { ResourceFilters } from "@/components/resources/resource-filters";
import { ResourceResults } from "@/components/resources/resource-results";
import { SuggestResourceDialog } from "@/components/resources/suggest-resource-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Eyebrow } from "@/components/shared/eyebrow";
import { FilterChips } from "@/components/shared/filter-chips";
import { OfflineNotice } from "@/components/shared/offline-notice";
import { resources } from "@/lib/data";
import {
  parseResourceFilters,
  withParams,
  type ResourceView,
  type SearchParams,
} from "@/lib/filters";
import { filterResources } from "@/lib/resources";

const VIEW_OPTIONS: { value: ResourceView; label: React.ReactNode }[] = [
  { value: "list", label: (<><List aria-hidden="true" /> List View</>) },
  { value: "map", label: (<><MapIcon aria-hidden="true" /> Map View</>) },
];

/** Reads the URL, so it must render inside <Suspense> (see app/resources/page.tsx). */
export async function ResourceDirectory({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseResourceFilters(await searchParams);
  const results = filterResources(resources, filters);

  return (
    <DirectoryLayout sidebar={<ResourceFilters filters={filters} />}>
      <section aria-labelledby="results-heading" className="min-w-0">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div aria-live="polite">
            <Eyebrow>Resource directory</Eyebrow>
            <h2 id="results-heading" className="display-heading mt-1 text-4xl text-brand">
              {results.length} {results.length === 1 ? "resource" : "resources"} found
            </h2>
          </div>
          <SuggestResourceDialog />
        </div>

        {/* Wide screens show list and map together, so the switch is only for narrower ones. */}
        <div className="mb-4 wide:hidden">
          <FilterChips
            label="Results view"
            options={VIEW_OPTIONS}
            active={filters.view}
            hrefFor={(view) => withParams("/resources", { ...filters, view })}
          />
        </div>

        <OfflineNotice />

        {results.length > 0 ? (
          <ResourceResults results={results} view={filters.view} />
        ) : (
          <EmptyState
            title="No resources match your search."
            description="Try a different ZIP code, broaden your search, or clear your filters."
            actionHref={withParams("/resources", { view: filters.view })}
          >
            <SuggestResourceDialog trigger="link" />
          </EmptyState>
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
    <div className="bg-canvas">
      <div className="mx-auto grid w-full max-w-wide items-start gap-8 px-4 pt-6 pb-24 sm:pt-10 nav:grid-cols-[17rem_minmax(0,1fr)]">
        {sidebar}
        {children}
      </div>
    </div>
  );
}
