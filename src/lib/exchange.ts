import type { ExchangeListing } from "@/lib/data";
import type { ExchangeFilters } from "@/lib/filters";

export function filterListings(
  list: readonly ExchangeListing[],
  filters: ExchangeFilters,
): ExchangeListing[] {
  const query = filters.q.toLowerCase();
  return list.filter((listing) => {
    const typeMatch = filters.type === "All" || listing.type === filters.type;
    const searchMatch =
      !query ||
      `${listing.title} ${listing.category} ${listing.description}`.toLowerCase().includes(query);
    return typeMatch && searchMatch;
  });
}
