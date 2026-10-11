import type { Metadata } from "next";
import Link from "next/link";
import { Check, Heart, Search, Users } from "lucide-react";

import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "NeighborBridge ATL is a social-good prototype helping Atlanta residents find support and give back.",
};

const VALUES = [
  {
    icon: Search,
    title: "Clear access",
    text: "Direct pathways and plain language reduce friction when someone needs support.",
  },
  {
    icon: Check,
    title: "Trust through transparency",
    text: "Demo and unverified information is labeled, with reminders to confirm availability.",
  },
  {
    icon: Users,
    title: "Community connection",
    text: "People can find help and discover low-barrier ways to support their neighbors.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-linear-135 from-hero-from to-canvas to-50% pb-24">
      <section className="mx-auto max-w-4xl px-4 pt-18 pb-18 text-center sm:pt-24">
        <Eyebrow>
          <Heart /> Built for Atlanta
        </Eyebrow>
        <h1 className="mt-5 mb-6 text-4xl leading-tight font-bold tracking-tighter text-brand-deep sm:text-5xl nav:text-6xl">
          A simpler bridge to community support.
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft">
          NeighborBridge ATL is a social-good prototype designed to help residents discover
          essential resources and find meaningful ways to contribute.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/resources">Find Support</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/exchange">Explore Exchange</Link>
          </Button>
        </div>
      </section>

      <ul className="mx-auto grid w-full max-w-narrow gap-5 px-4 sm:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-xl border border-line bg-surface p-8">
            <span className="grid size-13 place-items-center rounded-lg bg-mint-pale text-brand">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 mb-2.5 text-xl font-bold text-brand-deep">{title}</h2>
            <p className="text-sm leading-relaxed text-ink-soft">{text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
