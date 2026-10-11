import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { CATEGORY_META } from "@/components/resources/category-meta";
import { ProviderCard } from "@/components/resources/provider-card";
import { VerificationLabel } from "@/components/resources/resource-card";
import { DemoNotice } from "@/components/shared/demo-notice";
import { Badge } from "@/components/ui/badge";
import { getResource } from "@/lib/resources";

/** Reads route params, so it must render inside <Suspense> (see app/resources/[id]/page.tsx). */
export async function ResourceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resource = getResource(id);
  if (!resource) notFound();

  const { icon: Icon, badge } = CATEGORY_META[resource.category];

  return (
    <div className="grid items-start gap-6 nav:grid-cols-[1.5fr_0.8fr]">
      <article className="rounded-2xl border border-line bg-surface p-6 shadow-raised sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant={badge}>
            <Icon aria-hidden="true" /> {resource.category} Assistance
          </Badge>
          <VerificationLabel verified={resource.verifiedLink} />
        </div>
        <h1 className="mt-4 mb-3.5 text-3xl leading-tight font-bold tracking-tight text-brand-deep sm:text-4xl">
          {resource.name}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-ink-soft">{resource.description}</p>

        <section className="border-t border-line py-7">
          <h2 className="mb-4 text-xl font-bold text-brand-deep">Services offered</h2>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {resource.services.map((service) => (
              <li key={service} className="flex items-center gap-2 text-sm">
                <Check className="size-4 shrink-0 text-brand" aria-hidden="true" /> {service}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line pt-7">
          <h2 className="mb-4 text-xl font-bold text-brand-deep">Eligibility</h2>
          <p className="leading-relaxed text-ink-soft">
            {resource.eligibility}. Assistance and availability are never guaranteed; please
            confirm directly.
          </p>
        </section>
      </article>

      <ProviderCard resource={resource} />
    </div>
  );
}

/** Back link + notice: identical for every resource, so it stays outside Suspense and prerenders. */
export function ResourceDetailHeader() {
  return (
    <>
      <Link
        href="/resources"
        className="mb-5 inline-flex items-center gap-2 py-2 font-bold text-brand hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to results
      </Link>
      <DemoNotice className="mb-5" />
    </>
  );
}
