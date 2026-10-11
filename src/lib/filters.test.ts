import { describe, expect, it } from "vitest";

import { parseExchangeFilters, parseResourceFilters, withParams } from "@/lib/filters";

const none = { category: "All", zip: "", q: "", open: false, verified: false, view: "list" };

describe("parseResourceFilters", () => {
  it("returns no filters for an empty query", () => {
    expect(parseResourceFilters({})).toEqual(none);
  });

  it("accepts valid values", () => {
    expect(
      parseResourceFilters({
        category: "Emergency",
        zip: "30303",
        q: " shelter ",
        open: "1",
        verified: "1",
        view: "map",
      }),
    ).toEqual({
      category: "Emergency",
      zip: "30303",
      q: "shelter",
      open: true,
      verified: true,
      view: "map",
    });
  });

  it("accepts a neighborhood name in place of a ZIP code", () => {
    expect(parseResourceFilters({ zip: " West End " }).zip).toBe("West End");
  });

  it("ignores values it does not recognise", () => {
    expect(parseResourceFilters({ category: "Cars", open: "yes", view: "grid" })).toEqual(none);
    expect(parseResourceFilters({ zip: "<script>" }).zip).toBe("");
    expect(parseResourceFilters({ zip: "a".repeat(31) }).zip).toBe("");
  });

  it("uses the first value when a param is repeated", () => {
    expect(parseResourceFilters({ category: ["Food", "Housing"] }).category).toBe("Food");
  });

  it("caps the search text at 100 characters", () => {
    expect(parseResourceFilters({ q: "a".repeat(500) }).q).toHaveLength(100);
  });
});

describe("parseExchangeFilters", () => {
  it("accepts known listing types only", () => {
    expect(parseExchangeFilters({ type: "Give Back" }).type).toBe("Give Back");
    expect(parseExchangeFilters({ type: "give back" }).type).toBe("All");
    expect(parseExchangeFilters({ type: "Skill" }).type).toBe("All");
  });
});

describe("withParams", () => {
  it("leaves out defaults", () => {
    expect(withParams("/resources", { category: "Food", zip: "", q: "" })).toBe(
      "/resources?category=Food",
    );
    expect(
      withParams("/resources", { category: "All", zip: "", open: false, view: "list" }),
    ).toBe("/resources");
  });

  it("writes true as 1", () => {
    expect(withParams("/resources", { open: true, view: "map" })).toBe("/resources?open=1&view=map");
  });

  it("encodes values", () => {
    expect(withParams("/exchange", { q: "resume & jobs" })).toBe("/exchange?q=resume+%26+jobs");
    expect(withParams("/exchange", { type: "Need Help" })).toBe("/exchange?type=Need+Help");
  });
});
