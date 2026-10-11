import { describe, expect, it } from "vitest";

import { parseExchangeFilters, parseResourceFilters, withParams } from "@/lib/filters";

describe("parseResourceFilters", () => {
  it("returns no filters for an empty query", () => {
    expect(parseResourceFilters({})).toEqual({ category: "All", zip: "", q: "" });
  });

  it("accepts valid values", () => {
    expect(parseResourceFilters({ category: "Housing", zip: "30303", q: " shelter " })).toEqual({
      category: "Housing",
      zip: "30303",
      q: "shelter",
    });
  });

  it("ignores values it does not recognise", () => {
    expect(parseResourceFilters({ category: "Cars", zip: "3030", q: "" })).toEqual({
      category: "All",
      zip: "",
      q: "",
    });
    expect(parseResourceFilters({ zip: "30303abc" }).zip).toBe("");
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
    expect(parseExchangeFilters({ type: "Skill" }).type).toBe("Skill");
    expect(parseExchangeFilters({ type: "skill" }).type).toBe("All");
  });
});

describe("withParams", () => {
  it("leaves out empty values and All", () => {
    expect(withParams("/resources", { category: "Food", zip: "", q: "" })).toBe(
      "/resources?category=Food",
    );
    expect(withParams("/resources", { category: "All", zip: "" })).toBe("/resources");
  });

  it("encodes values", () => {
    expect(withParams("/exchange", { q: "resume & jobs" })).toBe("/exchange?q=resume+%26+jobs");
  });
});
