"use client";

import { useState } from "react";

import { ResourceCard } from "@/components/resources/resource-card";
import { ResourceMap } from "@/components/resources/resource-map";
import type { Resource } from "@/lib/data";
import type { ResourceView } from "@/lib/filters";
import { cn } from "@/lib/utils";

/**
 * Results list beside the schematic map. Wide screens show both; narrower
 * screens show the one picked by the List/Map switch (`view` in the URL).
 */
export function ResourceResults({ results, view }: { results: Resource[]; view: ResourceView }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const select = (id: string | null) => {
    setSelectedId(id);
    if (id) {
      document.getElementById(`card-${id}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  return (
    <div className="grid gap-5 wide:grid-cols-[minmax(21rem,1fr)_minmax(23.75rem,1.1fr)] wide:items-start">
      <ul
        className={cn(
          "grid gap-4 wide:block wide:max-h-[80vh] wide:space-y-4 wide:overflow-y-auto wide:p-1",
          view === "map" && "hidden",
        )}
      >
        {results.map((resource) => (
          // Clicking a card highlights its pin (pins are the keyboard path).
          <li key={resource.id} onClick={() => resource.coords && setSelectedId(resource.id)}>
            <ResourceCard resource={resource} selected={resource.id === selectedId} />
          </li>
        ))}
      </ul>
      <div className={cn("wide:sticky wide:top-24 wide:block", view === "list" && "hidden")}>
        <ResourceMap items={results} selectedId={selectedId} onSelect={select} />
      </div>
    </div>
  );
}
