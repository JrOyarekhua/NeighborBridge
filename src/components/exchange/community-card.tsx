import { MapPin } from "lucide-react";

import { ListingDialog } from "@/components/exchange/listing-dialog";
import { LISTING_TYPE_META } from "@/components/exchange/listing-type-meta";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ExchangeListing } from "@/lib/data";

export function CommunityCard({ listing }: { listing: ExchangeListing }) {
  const { icon: Icon, badge } = LISTING_TYPE_META[listing.type];

  return (
    <Card className="h-full shadow-card ring-line [--card-spacing:--spacing(6)]">
      <CardContent className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <Badge variant={badge}>{listing.type}</Badge>
          <span className="text-xs font-extrabold tracking-wider text-urgent uppercase">
            Demo listing
          </span>
        </div>
        <span className="mt-5 grid size-12 place-items-center rounded-lg bg-mint-pale text-brand">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="mt-4 text-xs font-extrabold tracking-wider text-brand uppercase">
          {listing.category}
        </span>
        <h3 className="mt-2 mb-2 text-xl font-bold tracking-tight text-brand-deep">
          {listing.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-soft">{listing.description}</p>
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
