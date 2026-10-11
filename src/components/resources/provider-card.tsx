import { Clock, ExternalLink as ExternalIcon, MapPin, Phone } from "lucide-react";

import { ExternalLink } from "@/components/shared/external-link";
import { Button } from "@/components/ui/button";
import type { Resource } from "@/lib/data";
import { directionsUrl } from "@/lib/resources";

export function ProviderCard({ resource }: { resource: Resource }) {
  const directions = directionsUrl(resource);
  const details = [
    { icon: MapPin, label: "Address or service area", value: `${resource.address}, ${resource.zip}` },
    { icon: Clock, label: "Operating hours", value: resource.hours },
    { icon: Phone, label: "Phone", value: resource.phone ?? "No verified phone provided" },
  ];

  return (
    <aside className="rounded-card border border-line bg-surface p-6 shadow-raised sm:p-7 nav:sticky nav:top-24">
      <h2 className="mb-4 text-xl font-bold text-brand-deep">Provider information</h2>
      <dl className="mb-6">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="border-b border-line py-4">
            <dt className="flex items-center gap-2 text-xs font-extrabold text-brand-deep">
              <Icon className="size-5 text-brand" aria-hidden="true" /> {label}
            </dt>
            <dd className="mt-1.5 ml-7 text-sm leading-normal text-ink-soft">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-2.5">
        {resource.phone ? (
          <Button asChild>
            <a href={`tel:${resource.phone.replace(/\D/g, "")}`}>
              <Phone /> Call Organization
            </a>
          </Button>
        ) : (
          <Button disabled>Phone unavailable</Button>
        )}
        {directions ? (
          <Button asChild variant="outline">
            <ExternalLink href={directions}>
              Get Directions <MapPin />
            </ExternalLink>
          </Button>
        ) : (
          <Button disabled variant="outline">
            Directions unavailable
          </Button>
        )}
        {resource.website ? (
          <Button asChild variant="outline">
            <ExternalLink href={resource.website}>
              Visit Website <ExternalIcon />
            </ExternalLink>
          </Button>
        ) : (
          <Button disabled variant="outline">
            Website unavailable
          </Button>
        )}
      </div>

      <p className="mt-4 text-xs leading-normal text-ink-soft">
        {resource.verifiedLink
          ? "Links lead to the provider’s official website or a mapping service."
          : "This demo record does not include verified contact information."}
      </p>
    </aside>
  );
}
