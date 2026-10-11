import type { Metadata } from "next";
import { Suspense } from "react";
import { Heart, Users } from "lucide-react";

import { ExchangeBoard } from "@/components/exchange/exchange-board";
import { DemoNotice } from "@/components/shared/demo-notice";
import { PageHero } from "@/components/shared/page-hero";
import { CardListSkeleton } from "@/components/shared/skeletons";

export const metadata: Metadata = {
  title: "Community Exchange",
  description: "Share what you can and discover ways to support your Atlanta neighbors.",
};

export default function ExchangePage({ searchParams }: PageProps<"/exchange">) {
  return (
    <main>
      <PageHero
        variant="solid"
        eyebrow={
          <>
            <Users /> Neighbors helping neighbors
          </>
        }
        title="Community Exchange"
        description="Connect with neighbors, share what you can, and discover ways to support your community."
        aside={
          <div className="flex min-w-70 items-center gap-5 rounded-2xl border border-white/18 bg-white/8 p-6 text-mint">
            <Heart className="size-10" aria-hidden="true" />
            <p className="leading-relaxed font-bold text-white">
              Give what you can.
              <br />
              Find what you need.
            </p>
          </div>
        }
      />
      <div className="mx-auto w-full max-w-page px-4 pt-5 pb-24 sm:pt-8">
        <DemoNotice />
        <Suspense fallback={<CardListSkeleton count={4} className="mt-36 sm:grid-cols-2" />}>
          <ExchangeBoard searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
