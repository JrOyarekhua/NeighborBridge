import { cn } from "@/lib/utils";

/** Placeholder block shown while a Suspense boundary loads. */
export function SkeletonBlock({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-xl bg-line/60", className)} />;
}

export function CardListSkeleton({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div role="status" className={cn("grid gap-4", className)}>
      <span className="sr-only">Loading…</span>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonBlock key={index} className="h-56" />
      ))}
    </div>
  );
}
