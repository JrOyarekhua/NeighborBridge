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
        className="display-heading my-2 text-4xl text-brand sm:text-5xl"
      >
        {title}
      </h2>
      {description && <p className="leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
