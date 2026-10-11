"use client";

import { useState } from "react";
import { ArrowRight, Check, ExternalLink as ExternalIcon, Flag, ShieldCheck, Sparkles } from "lucide-react";

import { LISTING_TYPE_META } from "@/components/exchange/listing-type-meta";
import { OrganizationLabel } from "@/components/exchange/organization-label";
import { ExternalLink } from "@/components/shared/external-link";
import { ThanksMessage } from "@/components/shared/form-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ExchangeListing } from "@/lib/data";

/** "View details" button + dialog. Give Back listings get the organization version. */
export function ListingDialog({ listing }: { listing: ExchangeListing }) {
  const isGiveBack = listing.type === "Give Back";
  // Bumped on close so the community dialog's steps start over next time.
  const [session, setSession] = useState(0);

  return (
    <Dialog onOpenChange={(open) => !open && setSession((n) => n + 1)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          {isGiveBack ? "View opportunity" : "View Details"} <ArrowRight />
          <span className="sr-only">for {listing.title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2.5rem)] gap-5 overflow-y-auto rounded-3xl p-6 shadow-modal sm:max-w-140 sm:p-8">
        {isGiveBack ? (
          <GiveBackDetails listing={listing} />
        ) : (
          <CommunityDetails key={session} listing={listing} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function Facts({ facts, columns = 2 }: { facts: { label: string; value?: string }[]; columns?: 1 | 2 }) {
  return (
    <dl className={columns === 2 ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
      {facts.map(({ label, value }) => (
        <div key={label} className="rounded-lg bg-canvas p-4">
          <dt className="text-xs font-bold text-ink-soft uppercase">{label}</dt>
          <dd className="mt-1 text-sm font-bold text-brand-deep">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function GiveBackDetails({ listing }: { listing: ExchangeListing }) {
  return (
    <>
      <DialogHeader className="text-left">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="give-back">Give Back</Badge>
          <OrganizationLabel />
        </div>
        <span className="text-xs font-extrabold tracking-wider text-urgent uppercase">
          Sample opportunity for demonstration
        </span>
        <p className="mt-3 text-sm font-bold text-teal-link">{listing.organization}</p>
        <DialogTitle className="pr-10 text-2xl font-bold tracking-tight text-brand-deep">
          {listing.title}
        </DialogTitle>
        <DialogDescription className="text-base leading-relaxed text-ink-soft">
          {listing.description}
        </DialogDescription>
      </DialogHeader>

      <Facts
        columns={1}
        facts={[
          { label: "Cause", value: listing.category },
          { label: "General area", value: listing.location },
          { label: "Time commitment", value: listing.timeCommitment },
          { label: "Schedule", value: listing.schedule },
        ]}
      />
      {listing.requirements && (
        <p className="text-sm leading-relaxed text-ink">
          <strong>Participation requirements:</strong> {listing.requirements}
        </p>
      )}
      {listing.sourceLabel && <p className="text-sm font-semibold text-ink-soft">{listing.sourceLabel}</p>}

      <div className="flex flex-col gap-2.5">
        {listing.signupUrl ? (
          <Button asChild>
            <ExternalLink href={listing.signupUrl}>
              Continue to official signup <ExternalIcon />
            </ExternalLink>
          </Button>
        ) : (
          <Button disabled>Official signup link not verified</Button>
        )}
        <DialogClose asChild>
          <Button variant="outline">Back to opportunities</Button>
        </DialogClose>
      </div>
      <p className="text-sm leading-normal text-ink-soft">
        Signup happens on the organization’s website. NeighborBridge ATL does not collect your
        personal information.
      </p>
      <p className="flex items-start gap-2 rounded-xl border border-notice-border bg-notice p-3 text-[0.8125rem] leading-normal text-notice-foreground">
        <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> Sample opportunity for
        demonstration. Confirm current details on the organization’s website.
      </p>
    </>
  );
}

/**
 * Need Help / Want to Help / Volunteer. Prototype: "Express Interest" and
 * "Report Listing" only show a confirmation; nothing is sent.
 */
function CommunityDetails({ listing }: { listing: ExchangeListing }) {
  const [interested, setInterested] = useState(false);
  const [reported, setReported] = useState(false);
  const { badge } = LISTING_TYPE_META[listing.type];

  return (
    <>
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

      <Facts
        facts={[
          { label: "Category", value: listing.category },
          { label: "General area", value: listing.location },
          { label: "Time commitment", value: listing.timeCommitment ?? "To be agreed" },
          { label: "Posted by", value: listing.organization ?? "Community member" },
        ]}
      />

      <div className="rounded-xl bg-canvas px-4 py-3.5 text-sm">
        <strong className="flex items-center gap-1.5 text-brand">
          <ShieldCheck className="size-4" aria-hidden="true" /> Safety guidelines
        </strong>
        <ul className="mt-2 list-disc pl-5 leading-relaxed">
          <li>Meet in public places and bring a friend when you can.</li>
          <li>Do not share your home address or financial details.</li>
          <li>Never send money to someone you have not verified.</li>
        </ul>
      </div>

      {interested ? (
        <div role="status" className="flex gap-3 rounded-xl bg-mint p-4 text-brand">
          <Check className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Demo only. No message was sent.</strong>
            <p className="mt-1 text-sm leading-normal text-ink">
              In a live version, a secure contact workflow would connect you without sharing
              personal details.
            </p>
          </div>
        </div>
      ) : (
        <Button className="w-full" onClick={() => setInterested(true)}>
          Express Interest <ArrowRight />
        </Button>
      )}

      {reported ? (
        <ThanksMessage className="text-sm">
          Thanks. Demo only: in a live version our team would review this listing.
        </ThanksMessage>
      ) : (
        <Button
          variant="link"
          className="mx-auto font-bold text-teal-link underline"
          onClick={() => setReported(true)}
        >
          <Flag aria-hidden="true" /> Report Listing
        </Button>
      )}
    </>
  );
}
