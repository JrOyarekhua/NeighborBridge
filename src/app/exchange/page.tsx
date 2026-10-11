import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Heart, Users } from "lucide-react";

import { ExchangeBoard } from "@/components/exchange/exchange-board";
import { DemoNotice } from "@/components/shared/demo-notice";
import { PageHero } from "@/components/shared/page-hero";
import { CardListSkeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import { withParams } from "@/lib/filters";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Exchange & Contribute",
  description:
    "Request help, offer support, or find a way to give back to your Atlanta neighbors.",
};

/** Jump to the board, filtered to what each visitor is looking for. */
const ENTRY_POINTS = [
  {
    title: "I Need Help",
    text: "Find community members and organizations offering support.",
    action: "Find Community Help",
    href: `${withParams("/exchange", { type: "Want to Help" })}#exchange-board`,
    border: "border-coral",
  },
  {
    title: "I Want to Help",
    text: "Discover opportunities to volunteer, contribute resources, or support your neighbors.",
    action: "Explore Ways to Help",
    href: `${withParams("/exchange", { type: "Need Help" })}#exchange-board`,
    border: "border-aqua",
  },
];

export default function ExchangePage({ searchParams }: PageProps<"/exchange">) {
  return (
    <main className="bg-canvas">
      <PageHero
        glyph="✦★"
        eyebrow={
          <>
            <Users /> Neighbors helping neighbors
          </>
        }
        title="Exchange & Contribute"
        description="Request help, offer support, or find a way to give back. Essential resources never require anything in return. Demo listings are clearly labeled."
        aside={
          <div className="flex min-w-70 items-center gap-5 rounded-2xl border border-aqua/35 bg-white/8 p-6 text-sun">
            <Heart className="size-10" aria-hidden="true" />
            <p className="leading-relaxed font-bold text-white">
              Give what you can.
              <br />
              Find what you need.
            </p>
          </div>
        }
      />
      <div className="mx-auto w-full max-w-page px-4 pt-8 pb-24">
        <div className="mb-7 grid gap-5 sm:grid-cols-2">
          {ENTRY_POINTS.map(({ title, text, action, href, border }) => (
            <article key={title} className={cn("rounded-[1.375rem] border-2 bg-surface p-7", border)}>
              <h2 className="mb-2 text-[1.75rem] font-bold tracking-tight text-brand">{title}</h2>
              <p className="mb-4.5 leading-relaxed text-ink">{text}</p>
              <Button asChild>
                <Link href={href}>
                  {action} <ArrowRight />
                </Link>
              </Button>
            </article>
          ))}
        </div>
        <DemoNotice />
        <Suspense fallback={<CardListSkeleton count={4} className="mt-36 sm:grid-cols-2" />}>
          <ExchangeBoard searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
