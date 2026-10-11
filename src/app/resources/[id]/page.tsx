import type { Metadata } from "next";
import { Suspense } from "react";

import { ResourceDetail, ResourceDetailHeader } from "@/components/resources/resource-detail";
import { SkeletonBlock } from "@/components/shared/skeletons";
import { getResource, getResourceIds } from "@/lib/resources";

/** Prerender a page for every known resource at build time. */
export function generateStaticParams() {
  return getResourceIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[id]">): Promise<Metadata> {
  const { id } = await params;
  const resource = getResource(id);
  return resource
    ? { title: resource.name, description: resource.description }
    : { title: "Resource not found" };
}

export default function ResourcePage({ params }: PageProps<"/resources/[id]">) {
  return (
    <main className="bg-linear-to-b from-mint-pale from-[17rem] to-canvas to-[17rem] pt-6 pb-24 sm:pt-8">
      <div className="mx-auto w-full max-w-narrow px-4">
        <ResourceDetailHeader />
        <Suspense fallback={<SkeletonBlock className="h-120" />}>
          <ResourceDetail params={params} />
        </Suspense>
      </div>
    </main>
  );
}
