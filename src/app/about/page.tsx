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
    bar: "before:bg-aqua",
  },
  {
    icon: Check,
    title: "Trust through transparency",
    text: "Demo and unverified information is labeled, with reminders to confirm availability.",
    bar: "before:bg-sun",
  },
  {
    icon: Users,
    title: "Community connection",
    text: "People can find help and discover low-barrier ways to support their neighbors.",
    bar: "before:bg-coral",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-dots-about pb-24">
      <section className="mx-auto max-w-4xl px-4 pt-18 pb-18 text-center sm:pt-24">
        <Eyebrow>
          <Heart /> Built for Atlanta
        </Eyebrow>
        <h1 className="display-heading mt-5 text-5xl text-brand sm:text-6xl nav:text-7xl">
          A simpler bridge to community support.
        </h1>
        <p className="mt-4.5 mb-6 font-marker text-2xl text-coral-strong">
          Find Support. Give Back. Build Community.
        </p>
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
        {VALUES.map(({ icon: Icon, title, text, bar }) => (
          <li
            key={title}
            className={`relative overflow-hidden rounded-card border border-line bg-surface p-8 shadow-card before:absolute before:inset-x-0 before:top-0 before:h-1.25 ${bar}`}
          >
            <span className="grid size-13 place-items-center rounded-lg bg-mint-pale text-brand">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 mb-2.5 text-xl font-bold text-brand-deep">{title}</h2>
            <p className="leading-relaxed text-ink-soft">{text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
