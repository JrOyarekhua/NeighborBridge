import type { Metadata } from "next";
import { Suspense } from "react";
import { MapPin } from "lucide-react";

import { DirectoryLayout, ResourceDirectory } from "@/components/resources/resource-directory";
import { PageHero } from "@/components/shared/page-hero";
import { CardListSkeleton, SkeletonBlock } from "@/components/shared/skeletons";

export const metadata: Metadata = {
  title: "Find support",
  description: "Explore food and housing resources across the Atlanta area.",
};

export default function ResourcesPage({ searchParams }: PageProps<"/resources">) {
  return (
    <main>
      {/* Static: prerendered at build time. */}
      <PageHero
        eyebrow={
          <>
            <MapPin /> Atlanta-area support
          </>
        }
        title="Find support near you"
        description="Explore food and housing resources, then confirm details directly with the provider."
      />
      {/* Dynamic: depends on the URL, so it streams in after the static part. */}
      <Suspense
        fallback={
          <DirectoryLayout sidebar={<SkeletonBlock className="h-96" />}>
            <CardListSkeleton className="mt-20" />
          </DirectoryLayout>
        }
      >
        <ResourceDirectory searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
