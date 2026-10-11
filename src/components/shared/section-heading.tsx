import { Eyebrow } from "@/components/shared/eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  description,
  id,
  centered = false,
}: {
  kicker: string;
  title: string;
  description?: string;
  id?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn(centered && "mx-auto max-w-170 text-center")}>
      <Eyebrow>{kicker}</Eyebrow>
      <h2
        id={id}
        className="my-2 text-2xl font-bold tracking-tight text-brand-deep sm:text-3xl"
      >
        {title}
      </h2>
      {description && <p className="leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
