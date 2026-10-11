import { resources, type Resource } from "@/lib/data";
import type { ResourceFilters } from "@/lib/filters";

export function filterResources(list: readonly Resource[], filters: ResourceFilters): Resource[] {
  const query = filters.q.toLowerCase();
  const place = filters.zip.toLowerCase();
  return list.filter((resource) => {
    const categoryMatch = filters.category === "All" || resource.category === filters.category;
    const placeMatch =
      !place || resource.zip.startsWith(place) || resource.neighborhood.toLowerCase().includes(place);
    const openMatch = !filters.open || resource.openNow;
    const verifiedMatch = !filters.verified || resource.trustLevel !== "Needs re-check";
    const searchMatch =
      !query ||
      `${resource.name} ${resource.description} ${resource.services.join(" ")}`
        .toLowerCase()
        .includes(query);
    return categoryMatch && placeMatch && openMatch && verifiedMatch && searchMatch;
  });
}

export function getResource(id: string): Resource | undefined {
  return resources.find((resource) => resource.id === id);
}

export function getResourceIds(): string[] {
  return resources.map((resource) => resource.id);
}

/** Google Maps search link, for verified resources that have no explicit directions URL. */
export function directionsUrl(resource: Resource): string | undefined {
  if (resource.directions) return resource.directions;
  if (!resource.verifiedLink || !resource.coords) return undefined;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${resource.name} Atlanta`)}`;
}
