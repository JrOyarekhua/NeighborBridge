import Link from "next/link";
import { ArrowRight, Check, MapPin, Users } from "lucide-react";

import { CATEGORY_META } from "@/components/resources/category-meta";
import { TrustBadge } from "@/components/resources/trust-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Resource } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ResourceCard({ resource, selected = false }: { resource: Resource; selected?: boolean }) {
  const { icon: Icon, badge } = CATEGORY_META[resource.category];
  const facts = [
    { icon: MapPin, label: "Location", value: `${resource.address} · ${resource.zip}` },
    { icon: Check, label: "Eligibility", value: resource.eligibilityShort },
  ];

  return (
    <Card
      id={`card-${resource.id}`}
      className={cn(
        "scroll-mt-24 rounded-card shadow-card ring-line transition hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-aqua [--card-spacing:--spacing(6)]",
        selected && "ring-2 ring-coral-strong hover:ring-coral-strong",
      )}
    >
      <CardContent>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant={badge}>
            <Icon aria-hidden="true" /> {resource.category}
          </Badge>
          <TrustBadge level={resource.trustLevel} />
        </div>
        <h3 className="mt-4 mb-2 text-[1.375rem] leading-tight font-semibold tracking-tight text-brand-deep">
          {resource.name}
        </h3>
        <p className="leading-relaxed text-ink-soft">{resource.description}</p>

        <OpenStatusRow resource={resource} className="mt-4" />
        {resource.neighborStatus && (
          <p className="mt-2.5 flex items-center gap-2 rounded-lg bg-mint-pale px-3 py-2.5 text-sm font-semibold text-brand">
            <Users className="size-4 shrink-0" aria-hidden="true" />
            <span>
              {resource.neighborStatus}{" "}
              <small className="font-medium text-ink-soft">(community report, not guaranteed)</small>
            </span>
          </p>
        )}

        <dl className="my-4 grid gap-2">
          {facts.map(({ icon: FactIcon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <dt className="text-brand">
                <FactIcon className="size-5" aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </dt>
              <dd className="text-sm leading-snug text-ink-soft">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mb-4 text-sm font-medium text-ink-soft">
          <VerifiedLine resource={resource} verb="checked" />
        </p>

        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={`/resources/${resource.id}`}>
            View Details <ArrowRight />
            <span className="sr-only">for {resource.name}</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

/** "Open now · closes 4 PM" next to the neighborhood. */
export function OpenStatusRow({ resource, className }: { resource: Resource; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm", className)}>
      <span className={cn("font-bold", resource.openNow ? "text-trust-verified-foreground" : "text-gold-text")}>
        {resource.openStatus}
      </span>
      <span className="inline-flex items-center gap-1 font-semibold text-ink">
        <MapPin className="size-4" aria-hidden="true" /> {resource.neighborhood}
      </span>
    </p>
  );
}

/** "Last checked Oct 10 · Official website", or "Not yet verified · …". */
export function VerifiedLine({
  resource,
  verb,
  source,
}: {
  resource: Resource;
  verb: "checked" | "verified";
  /** Replaces the plain source label, e.g. with a link. */
  source?: React.ReactNode;
}) {
  const when =
    resource.verifiedDate === "Not yet verified"
      ? "Not yet verified"
      : `Last ${verb} ${resource.verifiedDate}`;
  return (
    <>
      {when} · {source ?? resource.sourceLabel}
    </>
  );
}
