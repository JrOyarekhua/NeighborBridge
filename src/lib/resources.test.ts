import { describe, expect, it } from "vitest";

import { resources } from "@/lib/data";
import type { ResourceFilters } from "@/lib/filters";
import { filterResources, getResource, getResourceIds } from "@/lib/resources";

const none: ResourceFilters = { category: "All", zip: "", q: "" };
const ids = (filters: Partial<ResourceFilters>) =>
  filterResources(resources, { ...none, ...filters }).map((resource) => resource.id);

describe("filterResources", () => {
  it("returns everything with no filters", () => {
    expect(ids({})).toHaveLength(resources.length);
  });

  it("filters by category", () => {
    expect(ids({ category: "Housing" })).toEqual([
      "gateway",
      "south-atlanta-housing",
      "eastside-rent",
    ]);
  });

  it("filters by ZIP code", () => {
    expect(ids({ zip: "30344" })).toEqual(["acfb"]);
  });

  it("searches name, description and services, ignoring case", () => {
    expect(ids({ q: "COORDINATED ENTRY" })).toEqual(["gateway"]);
  });

  it("combines filters", () => {
    expect(ids({ category: "Food", zip: "30303" })).toEqual([]);
  });
});

describe("getResource", () => {
  it("finds a resource by id", () => {
    expect(getResource("acfb")?.name).toBe("Atlanta Community Food Bank");
  });

  it("returns undefined for an unknown id", () => {
    expect(getResource("nope")).toBeUndefined();
  });

  it("lists every id for static generation", () => {
    expect(getResourceIds()).toHaveLength(resources.length);
  });
});
