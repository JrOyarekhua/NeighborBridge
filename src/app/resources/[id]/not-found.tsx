import { EmptyState } from "@/components/shared/empty-state";

export default function ResourceNotFound() {
  return (
    <main className="mx-auto w-full max-w-narrow px-4 py-24">
      <EmptyState
        title="Resource not found"
        description="This resource may have been removed, or the link is incorrect."
        actionHref="/resources"
        actionLabel="Back to all resources"
      />
    </main>
  );
}
