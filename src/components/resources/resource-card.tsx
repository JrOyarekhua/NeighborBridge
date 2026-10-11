import Link from "next/link";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";

import { CATEGORY_META } from "@/components/resources/category-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Resource } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ResourceCard({ resource }: { resource: Resource }) {
  const { icon: Icon, badge } = CATEGORY_META[resource.category];
  const facts = [
    { icon: MapPin, label: "Location", value: `${resource.address} · ${resource.zip}` },
    { icon: Clock, label: "Hours", value: resource.hours },
    { icon: Check, label: "Eligibility", value: resource.eligibility },
  ];

  return (
    <Card className="shadow-card ring-line transition hover:-translate-y-0.5 hover:shadow-card-hover [--card-spacing:--spacing(6)]">
      <CardContent>
        <div className="flex items-center justify-between gap-3">
          <Badge variant={badge}>
            <Icon aria-hidden="true" /> {resource.category}
          </Badge>
          <VerificationLabel verified={resource.verifiedLink} />
        </div>
        <h3 className="mt-4 mb-2 text-xl font-bold tracking-tight text-brand-deep">
          {resource.name}
        </h3>
        <p className="text-sm leading-relaxed text-ink-soft">{resource.description}</p>
        <dl className="my-5 grid gap-2">
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

export function VerificationLabel({ verified }: { verified: boolean }) {
  return (
    <span
      className={cn(
        "text-xs font-extrabold tracking-wider uppercase",
        verified ? "text-brand" : "text-urgent",
      )}
    >
      {verified ? "Official link available" : "Demo data"}
    </span>
  );
}
