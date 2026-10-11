"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ResourcesError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-narrow px-4 py-24">
      <div role="alert" className="rounded-card border border-dashed border-aqua bg-surface px-8 py-16 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-notice text-notice-foreground">
          <TriangleAlert className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 mb-5 text-xl font-bold text-brand-deep">
          We couldn’t load resources right now. Please try again.
        </h1>
        <Button onClick={() => retry()}>Retry</Button>
        <p className="mt-6 text-ink-soft">
          Need help right away? Call{" "}
          <a href="tel:211" className="font-bold text-teal-link">
            2-1-1
          </a>{" "}
          or visit{" "}
          <a href="https://211.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-teal-link">
            211.org<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </div>
    </main>
  );
}
