"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Resource } from "@/lib/data";
import { cn } from "@/lib/utils";

/** The slice of Atlanta the schematic map covers. */
const BOUNDS = { minLat: 33.69, maxLat: 33.84, minLng: -84.5, maxLng: -84.3 };

function position({ lat, lng }: { lat: number; lng: number }) {
  return {
    left: `${((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100}%`,
    top: `${(1 - (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100}%`,
  };
}

/** Schematic, not a real map: pins for resources with a verified location. */
export function ResourceMap({
  items,
  selectedId,
  onSelect,
}: {
  items: readonly Resource[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const mapped = items.filter((resource) => resource.coords);
  const unmapped = items.length - mapped.length;
  const selected = mapped.find((resource) => resource.id === selectedId);

  return (
    <div>
      <div
        role="group"
        aria-label="Schematic map of Atlanta resources"
        className="relative min-h-120 overflow-hidden rounded-card border border-line bg-map shadow-card sm:min-h-140"
      >
        <div
          aria-hidden="true"
          className="absolute -inset-[20%] bg-[linear-gradient(32deg,transparent_46%,rgb(255_255_255/.95)_47%_50%,transparent_51%),linear-gradient(-22deg,transparent_42%,rgb(255_255_255/.9)_43%_47%,transparent_48%),linear-gradient(90deg,transparent_64%,rgb(255_255_255/.85)_65%_68%,transparent_69%)]"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-surface/92 px-2.5 py-1 text-xs font-semibold text-ink">
          Schematic map · positions approximate
        </span>

        {mapped.map((resource) => {
          const active = resource.id === selectedId;
          return (
            <button
              key={resource.id}
              type="button"
              aria-label={`${resource.name}, map pin`}
              aria-pressed={active}
              onClick={() => onSelect(active ? null : resource.id)}
              style={position(resource.coords!)}
              className={cn(
                "absolute grid size-12 -translate-x-1/2 -translate-y-full place-items-center rounded-[14px] text-white shadow-button transition-colors hover:z-2",
                active ? "z-3 bg-coral-strong outline-3 outline-sun" : "bg-brand",
              )}
            >
              <MapPin className="size-5.5" aria-hidden="true" />
            </button>
          );
        })}

        {selected && (
          <div
            style={position(selected.coords!)}
            className="absolute z-4 grid w-55 -translate-x-1/2 translate-y-3 gap-2.5 rounded-[14px] bg-surface p-3.5 text-sm text-brand shadow-modal"
          >
            <strong>{selected.name}</strong>
            <Button asChild variant="outline" className="min-h-11 text-sm">
              <Link href={`/resources/${selected.id}`}>View Details</Link>
            </Button>
          </div>
        )}

        {mapped.length === 0 && (
          <p className="absolute inset-x-0 top-2/5 p-3.5 text-center text-sm text-ink">
            No mapped locations for these results. Use the list for all matches.
          </p>
        )}
      </div>
      {unmapped > 0 && mapped.length > 0 && (
        <p className="p-3.5 text-sm text-ink">
          {unmapped} {unmapped === 1 ? "result has" : "results have"} no verified map location and{" "}
          {unmapped === 1 ? "appears" : "appear"} in the list only.
        </p>
      )}
    </div>
  );
}
