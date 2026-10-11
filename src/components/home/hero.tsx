import Link from "next/link";
import { ArrowRight, Heart, House, Users, Utensils } from "lucide-react";

import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-135 from-hero-from via-canvas via-52% to-hero-to pt-11 pb-29 sm:pt-14 sm:pb-35 nav:pt-20">
      <div className="absolute inset-x-0 bottom-0 h-25 bg-linear-to-t from-surface/55 to-transparent" />
      <div className="absolute -top-20 -right-25 size-60 rounded-full bg-mint opacity-55 blur-xs" />
      <div className="absolute bottom-8 -left-11 size-30 rounded-full bg-hero-glow opacity-55 blur-xs" />

      <div className="relative z-1 mx-auto grid w-full max-w-page items-center gap-9 px-4 nav:grid-cols-[1.14fr_0.86fr] nav:gap-18">
        <div className="max-w-170">
          <Eyebrow>
            <Heart /> Support starts with connection
          </Eyebrow>
          <h1 className="mt-5 mb-6 text-4xl leading-none font-bold tracking-tighter text-brand-deep sm:text-5xl nav:text-6xl">
            Connecting Neighbors.
            <br />
            <span className="text-brand">Building Stronger Communities.</span>
          </h1>
          <p className="max-w-155 text-base leading-relaxed text-ink-soft sm:text-lg">
            Find food, housing assistance, and community support near you. Everyone deserves
            access to help when they need it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild>
              <Link href="/resources">
                Find Support <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/exchange">Explore Community Exchange</Link>
            </Button>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  );
}

/** Decorative illustration: hidden from screen readers. */
function HeroArt() {
  const orbit =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/35";
  const bubble =
    "absolute z-4 grid size-14 place-items-center rounded-full border-7 border-surface shadow-bubble sm:size-17";

  return (
    <div aria-hidden="true" className="relative mx-auto h-68 w-full max-w-118 sm:h-80 nav:h-95 nav:max-w-none">
      <div className={`${orbit} h-44 w-64 -rotate-12 sm:h-59 sm:w-83`} />
      <div className={`${orbit} h-58 w-79 rotate-21 sm:h-81 sm:w-105`} />

      <div className="absolute top-1/2 left-1/2 z-3 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center content-center gap-1 rounded-[34px] bg-brand text-primary-foreground shadow-art sm:size-36 sm:rounded-[42px]">
        <Users size={46} />
        <span className="text-xs font-extrabold tracking-widest">ATL</span>
      </div>

      <div className={`${bubble} top-[28%] left-[2%] bg-mint text-brand-deep sm:left-[3%]`}>
        <Utensils size={25} />
      </div>
      <div className={`${bubble} top-[20%] right-0 bg-mint text-brand-deep sm:right-[3%]`}>
        <House size={25} />
      </div>
      <div className={`${bubble} right-[12%] bottom-[12%] bg-blush text-urgent`}>
        <Heart size={25} />
      </div>

      <div className="absolute bottom-[3%] left-[2%] rounded-xl bg-surface px-4 py-3 text-xs font-bold text-brand-deep shadow-float sm:left-[5%] sm:text-sm">
        Neighbors helping neighbors
      </div>
    </div>
  );
}
