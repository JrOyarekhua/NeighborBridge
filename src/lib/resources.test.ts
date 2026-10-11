import { describe, expect, it } from "vitest";

import { resources } from "@/lib/data";
import type { ResourceFilters } from "@/lib/filters";
import { directionsUrl, filterResources, getResource, getResourceIds } from "@/lib/resources";

const none: ResourceFilters = {
  category: "All",
  zip: "",
  q: "",
  open: false,
  verified: false,
  view: "list",
};
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
    expect(ids({ category: "Emergency" })).toEqual(["georgia-211"]);
  });

  it("filters by ZIP code, including a partial ZIP", () => {
    expect(ids({ zip: "30344" })).toEqual(["acfb"]);
    expect(ids({ zip: "3031" })).toEqual(["westside-meals", "south-atlanta-housing", "eastside-rent"]);
  });

  it("filters by neighborhood, ignoring case", () => {
    expect(ids({ zip: "downtown" })).toEqual(["gateway"]);
  });

  it("filters to resources open now", () => {
    expect(ids({ open: true })).toEqual(["acfb", "westside-meals", "gateway"]);
  });

  it("filters to verified and partner-verified resources", () => {
    expect(ids({ verified: true })).toEqual(["acfb", "gateway"]);
  });

  it("searches name, description and services, ignoring case", () => {
    expect(ids({ q: "COORDINATED ENTRY" })).toEqual(["gateway"]);
  });

  it("combines filters", () => {
    expect(ids({ category: "Food", zip: "30303" })).toEqual([]);
    expect(ids({ category: "Food", open: true, verified: true })).toEqual(["acfb"]);
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

describe("directionsUrl", () => {
  it("prefers the explicit directions link", () => {
    expect(directionsUrl(getResource("gateway")!)).toContain("Gateway+Center");
  });

  it("has no directions for phone-only or unverified resources", () => {
    expect(directionsUrl(getResource("georgia-211")!)).toBeUndefined();
    expect(directionsUrl(getResource("intown-pantry")!)).toBeUndefined();
  });
});
