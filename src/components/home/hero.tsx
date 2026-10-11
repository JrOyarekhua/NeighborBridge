import Link from "next/link";
import { ArrowRight, Heart, House, Users, Utensils } from "lucide-react";

import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dots-hero pt-14 pb-35 sm:pb-37 nav:pt-21">
      <span aria-hidden="true" className="absolute top-[15%] right-[8%] rotate-12 text-[2.625rem] text-sun">
        ✦
      </span>

      <div className="relative z-1 mx-auto grid w-full max-w-page items-center gap-9 px-4 nav:grid-cols-[1.14fr_0.86fr] nav:gap-18">
        <div className="max-w-190">
          <Eyebrow>
            <Heart /> Support starts with connection
          </Eyebrow>
          <h1 className="display-heading mt-4.5 mb-5.5 text-[3.25rem] leading-[0.95] text-brand sm:text-[clamp(3.25rem,7vw,5.5rem)]">
            Connecting Neighbors.
            <br />
            <em className="relative z-0 not-italic">
              Building Stronger Communities.
              {/* Yellow marker swoosh under the second line. */}
              <span
                aria-hidden="true"
                className="absolute right-[7%] bottom-0.5 left-1/3 -z-1 h-2 rotate-[-1.5deg] rounded-[50%] bg-sun sm:h-3"
              />
            </em>
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
              <Link href="/exchange">Exchange &amp; Contribute</Link>
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
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/24";
  const bubble =
    "absolute z-4 grid size-14 place-items-center rounded-full border-7 border-surface shadow-bubble sm:size-17";

  return (
    <div aria-hidden="true" className="relative mx-auto h-68 w-full max-w-118 sm:h-80 nav:h-95 nav:max-w-none">
      <div className={`${orbit} h-44 w-64 -rotate-12 sm:h-59 sm:w-83`} />
      <div className={`${orbit} h-58 w-79 rotate-21 sm:h-81 sm:w-105`} />

      {/* Slightly lopsided blob, tilted; the contents tilt back to level. */}
      <div className="absolute top-1/2 left-1/2 z-3 grid size-28 -translate-x-1/2 -translate-y-1/2 -rotate-3 place-items-center content-center gap-1 rounded-[46%_54%_48%_52%] bg-brand text-primary-foreground shadow-art sm:size-36">
        <Users size={46} className="rotate-3" />
        <span className="rotate-3 text-xs font-extrabold tracking-widest">ATL</span>
      </div>

      <div className={`${bubble} top-[28%] left-[2%] bg-mint text-brand sm:left-[3%]`}>
        <Utensils size={25} />
      </div>
      <div className={`${bubble} top-[20%] right-0 bg-mint text-brand sm:right-[3%]`}>
        <House size={25} />
      </div>
      <div className={`${bubble} right-[12%] bottom-[12%] bg-blush text-coral-strong`}>
        <Heart size={25} />
      </div>

      <div className="absolute bottom-[3%] left-[2%] -rotate-3 rounded-xl bg-surface px-4 py-3 font-marker text-sm text-brand shadow-float sm:left-[5%] sm:text-base">
        Turning Community Into a Home.
      </div>
    </div>
  );
}
