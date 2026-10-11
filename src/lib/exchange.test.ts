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
    const ids = filterListings(exchangeListings, { type: "Give Back", q: "" }).map((l) => l.id);
    expect(ids).toEqual(["acfb-give-back", "open-hand-give-back"]);
  });

  it("searches title, category and description", () => {
    const ids = filterListings(exchangeListings, { type: "All", q: "hunger" }).map((l) => l.id);
    expect(ids).toEqual(["acfb-give-back"]);
  });

  it("returns nothing when type and search disagree", () => {
    expect(filterListings(exchangeListings, { type: "Want to Help", q: "pantry" })).toEqual([]);
  });
});
