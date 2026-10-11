import { MapPin } from "lucide-react";

import { ListingDialog } from "@/components/exchange/listing-dialog";
import { LISTING_TYPE_META } from "@/components/exchange/listing-type-meta";
import { OrganizationLabel } from "@/components/exchange/organization-label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ExchangeListing } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CommunityCard({ listing }: { listing: ExchangeListing }) {
  const { icon: Icon, badge, bar } = LISTING_TYPE_META[listing.type];
  const isGiveBack = listing.type === "Give Back";

  return (
    <Card
      className={cn(
        "relative h-full rounded-card shadow-card ring-line transition before:absolute before:inset-x-0 before:top-0 before:h-1 hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-aqua [--card-spacing:--spacing(6)]",
        bar,
      )}
    >
      <CardContent className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <Badge variant={badge}>{listing.type}</Badge>
          <span className="text-xs font-extrabold tracking-wider text-urgent uppercase">
            {isGiveBack ? "Sample content" : "Demo listing"}
          </span>
        </div>
        <span className="mt-5 grid size-12 place-items-center rounded-lg bg-mint-pale text-brand">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        {isGiveBack && <OrganizationLabel className="mt-3.5" />}
        <span className="mt-3 text-xs font-extrabold tracking-wider text-teal-link uppercase">
          {listing.category}
        </span>
        {listing.organization && (
          <strong className="mt-3 text-sm text-brand">{listing.organization}</strong>
        )}
        <h3 className="mt-1.5 mb-2 text-[1.375rem] leading-tight font-semibold tracking-tight text-brand-deep">
          {listing.title}
        </h3>
        <p className="leading-relaxed text-ink-soft">{listing.description}</p>
        {isGiveBack && (
          <dl className="mt-4.5 grid gap-2 rounded-xl bg-give-back p-3.5 text-xs">
            {[
              { label: "Time commitment", value: listing.timeCommitment },
              { label: "Registration", value: "Handled on the organization’s website" },
            ].map(({ label, value }) => (
              <div key={label} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-2.5">
                <dt className="font-bold text-give-back-foreground">{label}</dt>
                <dd className="leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-auto flex flex-col gap-2 pt-5 pb-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-1">
            <MapPin className="size-4" aria-hidden="true" /> {listing.location}
          </span>
          <span>{listing.posted}</span>
        </div>
        <ListingDialog listing={listing} />
      </CardContent>
    </Card>
  );
}
