import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel = "Clear filters",
}: {
  title: string;
  description: string;
  actionHref: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-surface px-8 py-16 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-mint-pale text-brand">
        <Search className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 mb-2 text-xl font-bold text-brand-deep">{title}</h3>
      <p className="mb-5 text-ink-soft">{description}</p>
      <Button asChild>
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  );
}
