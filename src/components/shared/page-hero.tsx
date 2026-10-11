import { Eyebrow } from "@/components/shared/eyebrow";

/** Deep-teal band at the top of inner pages (resources, exchange). */
export function PageHero({
  eyebrow,
  title,
  description,
  aside,
  glyph = "♛",
}: {
  eyebrow: React.ReactNode;
  title: string;
  description: string;
  aside?: React.ReactNode;
  /** Decorative sun-yellow mark in the top corner. */
  glyph?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <span
        aria-hidden="true"
        className="absolute top-6 right-[10%] hidden rotate-10 text-[2.75rem] tracking-[1.125rem] text-sun sm:block"
      >
        {glyph}
      </span>
      <div className="relative mx-auto flex w-full max-w-page items-center justify-between gap-12 px-4 py-11 sm:py-14">
        <div className="max-w-180">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="display-heading mt-4 mb-3 text-5xl sm:text-[4rem]">{title}</h1>
          <p className="text-base leading-relaxed text-mint sm:text-lg">{description}</p>
        </div>
        {aside && <div className="hidden nav:block">{aside}</div>}
      </div>
    </section>
  );
}
