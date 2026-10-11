import type { ExchangeType, ResourceCategory } from "@/lib/data";

/** Shape of Next.js `searchParams` once awaited. */
export type SearchParams = Record<string, string | string[] | undefined>;

export type ResourceFilters = {
  category: ResourceCategory | "All";
  zip: string;
  q: string;
};

export type ExchangeFilters = {
  type: ExchangeType | "All";
  q: string;
};

const RESOURCE_CATEGORIES: readonly ResourceCategory[] = ["Food", "Housing"];
const EXCHANGE_TYPES: readonly ExchangeType[] = ["Need", "Offer", "Skill"];
const MAX_QUERY_LENGTH = 100;

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

/** URL input is untrusted: anything unexpected falls back to "no filter". */
export function parseResourceFilters(params: SearchParams): ResourceFilters {
  const zip = first(params.zip).trim();
  return {
    category: oneOf(first(params.category), RESOURCE_CATEGORIES),
    zip: /^\d{5}$/.test(zip) ? zip : "",
    q: cleanQuery(first(params.q)),
  };
}

export function parseExchangeFilters(params: SearchParams): ExchangeFilters {
  return {
    type: oneOf(first(params.type), EXCHANGE_TYPES),
    q: cleanQuery(first(params.q)),
  };
}

/** Builds a URL, leaving out empty values and "All": withParams("/resources", { category: "Food", zip: "" }) → "/resources?category=Food". */
export function withParams(pathname: string, params: Record<string, string>): string {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== "" && value !== "All"),
  ).toString();
  return search ? `${pathname}?${search}` : pathname;
}
