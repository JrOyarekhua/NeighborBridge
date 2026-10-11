import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Resource } from "@/lib/data";

export function ProviderCard({ resource }: { resource: Resource }) {
  const details = [
    { icon: MapPin, label: "Address or service area", value: `${resource.address}, ${resource.zip}` },
    { icon: Clock, label: "Operating hours", value: resource.hours },
    { icon: Phone, label: "Phone", value: "Demo placeholder — no verified phone provided" },
  ];

  return (
    <aside className="rounded-2xl border border-line bg-surface p-6 shadow-raised sm:p-7 nav:sticky nav:top-24">
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
        {resource.website ? (
          <Button asChild>
            <ExternalLink href={resource.website}>
              Contact Provider <ArrowRight />
            </ExternalLink>
          </Button>
        ) : (
          <Button disabled>Contact unavailable</Button>
        )}
        {resource.directions ? (
          <Button asChild variant="outline">
            <ExternalLink href={resource.directions}>
              Get Directions <MapPin />
            </ExternalLink>
          </Button>
        ) : (
          <Button disabled variant="outline">
            Directions unavailable
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

/** Opens in a new tab safely, and tells screen-reader users it will. */
function ExternalLink({ href, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
