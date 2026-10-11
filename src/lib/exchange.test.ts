import { describe, expect, it } from "vitest";

import { exchangeListings } from "@/lib/data";
import { filterListings } from "@/lib/exchange";

describe("filterListings", () => {
  it("returns everything with no filters", () => {
    expect(filterListings(exchangeListings, { type: "All", q: "" })).toHaveLength(
      exchangeListings.length,
    );
  });

  it("filters by type", () => {
    const ids = filterListings(exchangeListings, { type: "Need", q: "" }).map((l) => l.id);
    expect(ids).toEqual(["clothing", "volunteer"]);
  });

  it("searches title, category and description", () => {
    const ids = filterListings(exchangeListings, { type: "All", q: "digital" }).map((l) => l.id);
    expect(ids).toEqual(["computer"]);
  });

  it("returns nothing when type and search disagree", () => {
    expect(filterListings(exchangeListings, { type: "Offer", q: "pantry" })).toEqual([]);
  });
});
