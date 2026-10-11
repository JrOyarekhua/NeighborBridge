import { Eyebrow } from "@/components/shared/eyebrow";
import { cn } from "@/lib/utils";

/** Dark band at the top of inner pages (resources, exchange). */
export function PageHero({
  eyebrow,
  title,
  description,
  aside,
  variant = "gradient",
}: {
  eyebrow: React.ReactNode;
  title: string;
  description: string;
  aside?: React.ReactNode;
  variant?: "gradient" | "solid";
}) {
  return (
    <section
      className={cn(
        "text-white",
        variant === "gradient" ? "bg-linear-115 from-brand-deep to-brand" : "bg-brand-deep",
      )}
    >
      <div className="mx-auto flex w-full max-w-page items-center justify-between gap-12 px-4 py-11 sm:py-14">
        <div className="max-w-180">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="mt-4 mb-3 text-4xl leading-tight font-bold tracking-tighter sm:text-5xl">
            {title}
          </h1>
          <p className="text-base leading-relaxed text-white/80 sm:text-lg">{description}</p>
        </div>
        {aside && <div className="hidden nav:block">{aside}</div>}
      </div>
    </section>
  );
}
