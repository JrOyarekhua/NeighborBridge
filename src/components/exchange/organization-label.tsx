import { cn } from "@/lib/utils";

/** Marks Give Back listings, which come from an organization rather than a neighbor. */
export function OrganizationLabel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "w-max text-xs font-bold tracking-wider text-purple-strong uppercase",
        className,
      )}
    >
      Organization opportunity
    </span>
  );
}
