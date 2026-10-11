import type { ExchangeType, ResourceCategory } from "@/lib/data";

/** Shape of Next.js `searchParams` once awaited. */
export type SearchParams = Record<string, string | string[] | undefined>;

export type ResourceView = "list" | "map";

export type ResourceFilters = {
  category: ResourceCategory | "All";
  /** ZIP code or neighborhood name ("30303" or "Downtown"). */
  zip: string;
  q: string;
  open: boolean;
  verified: boolean;
  view: ResourceView;
};

export type ExchangeFilters = {
  type: ExchangeType | "All";
  q: string;
};

export const RESOURCE_CATEGORIES: readonly ResourceCategory[] = ["Food", "Housing", "Emergency"];
export const EXCHANGE_TYPES: readonly ExchangeType[] = [
  "Need Help",
  "Want to Help",
  "Volunteer",
  "Give Back",
];
const MAX_QUERY_LENGTH = 100;
const MAX_PLACE_LENGTH = 30;

/** First value of a query param: `?q=a&q=b` → "a". */
function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

function oneOf<T extends string>(value: string, allowed: readonly T[]): T | "All" {
  return allowed.includes(value as T) ? (value as T) : "All";
}

function cleanQuery(value: string): string {
  return value.trim().slice(0, MAX_QUERY_LENGTH);
}

/** Letters, digits, spaces and hyphens only ("30303", "West End", "South-Atlanta"). */
function cleanPlace(value: string): string {
  const place = value.trim();
  return place.length <= MAX_PLACE_LENGTH && /^[\p{L}\d\s-]*$/u.test(place) ? place : "";
}

/** URL input is untrusted: anything unexpected falls back to "no filter". */
export function parseResourceFilters(params: SearchParams): ResourceFilters {
  return {
    category: oneOf(first(params.category), RESOURCE_CATEGORIES),
    zip: cleanPlace(first(params.zip)),
    q: cleanQuery(first(params.q)),
    open: first(params.open) === "1",
    verified: first(params.verified) === "1",
    view: first(params.view) === "map" ? "map" : "list",
  };
}

export function parseExchangeFilters(params: SearchParams): ExchangeFilters {
  return {
    type: oneOf(first(params.type), EXCHANGE_TYPES),
    q: cleanQuery(first(params.q)),
  };
}

/**
 * Builds a URL, leaving out defaults (empty, "All", false, the "list" view); true becomes "1":
 * withParams("/resources", { category: "Food", zip: "", open: true }) → "/resources?category=Food&open=1".
 */
export function withParams(pathname: string, params: Record<string, string | boolean>): string {
  const entries = Object.entries(params)
    .filter(([key, value]) => value !== "" && value !== "All" && value !== false && !(key === "view" && value === "list"))
    .map(([key, value]) => [key, value === true ? "1" : String(value)]);
  const search = new URLSearchParams(entries).toString();
  return search ? `${pathname}?${search}` : pathname;
}
