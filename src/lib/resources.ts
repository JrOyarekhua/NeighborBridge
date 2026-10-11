import { resources, type Resource } from "@/lib/data";
import type { ResourceFilters } from "@/lib/filters";

export function filterResources(list: readonly Resource[], filters: ResourceFilters): Resource[] {
  const query = filters.q.toLowerCase();
  return list.filter((resource) => {
    const categoryMatch = filters.category === "All" || resource.category === filters.category;
    const zipMatch = !filters.zip || resource.zip === filters.zip;
    const searchMatch =
      !query ||
      `${resource.name} ${resource.description} ${resource.services.join(" ")}`
        .toLowerCase()
        .includes(query);
    return categoryMatch && zipMatch && searchMatch;
  });
}

export function getResource(id: string): Resource | undefined {
  return resources.find((resource) => resource.id === id);
}

export function getResourceIds(): string[] {
  return resources.map((resource) => resource.id);
}
