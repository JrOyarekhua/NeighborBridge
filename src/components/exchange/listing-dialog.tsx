"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { LISTING_TYPE_META } from "@/components/exchange/listing-type-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ExchangeListing } from "@/lib/data";

/** The only client component on /exchange: it holds the open state and the "interested" step. */
export function ListingDialog({ listing }: { listing: ExchangeListing }) {
  const [interested, setInterested] = useState(false);
  const { badge } = LISTING_TYPE_META[listing.type];

  return (
    <Dialog onOpenChange={(open) => !open && setInterested(false)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          View Details <ArrowRight />
          <span className="sr-only">for {listing.title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-6 rounded-2xl p-6 sm:max-w-140 sm:p-8">
        <DialogHeader className="text-left">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={badge}>{listing.type}</Badge>
            <span className="text-xs font-extrabold tracking-wider text-urgent uppercase">
              Demo listing — not a live request
            </span>
          </div>
          <DialogTitle className="mt-3 pr-10 text-2xl font-bold tracking-tight text-brand-deep">
            {listing.title}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-ink-soft">
            {listing.description}
          </DialogDescription>
        </DialogHeader>

        <dl className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Category", value: listing.category },
            { label: "General area", value: listing.location },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg bg-canvas p-4">
              <dt className="text-xs font-bold text-ink-soft uppercase">{label}</dt>
              <dd className="mt-1 text-sm font-bold text-brand-deep">{value}</dd>
            </div>
          ))}
        </dl>

        {interested ? (
          <div role="status" className="flex gap-3 rounded-lg bg-mint-pale p-4 text-brand-deep">
            <Check className="size-5 shrink-0 text-brand" aria-hidden="true" />
            <div>
              <strong>This is only a prototype.</strong>
              <p className="mt-1 text-sm leading-normal text-ink-soft">
                No information was submitted. In a future version, this step could connect you
                with the listing organizer.
              </p>
            </div>
          </div>
        ) : (
          <Button className="w-full" onClick={() => setInterested(true)}>
            I’m Interested <ArrowRight />
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
