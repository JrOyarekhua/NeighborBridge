import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink as ExternalIcon } from "lucide-react";

import { CATEGORY_META } from "@/components/resources/category-meta";
import { CommunityReport } from "@/components/resources/community-report";
import { HelpfulFeedback } from "@/components/resources/helpful-feedback";
import { ProviderCard } from "@/components/resources/provider-card";
import { OpenStatusRow, VerifiedLine } from "@/components/resources/resource-card";
import { TrustBadge } from "@/components/resources/trust-badge";
import { DemoNotice } from "@/components/shared/demo-notice";
import { ExternalLink } from "@/components/shared/external-link";
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
      <article className="rounded-card border border-line bg-surface p-6 shadow-raised sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <Badge variant={badge}>
            <Icon aria-hidden="true" /> {resource.category} Assistance
          </Badge>
          <TrustBadge level={resource.trustLevel} />
        </div>
        <h1 className="mt-4 mb-2 text-3xl leading-tight font-bold tracking-tight text-brand sm:text-4xl">
          {resource.name}
        </h1>
        <p className="mb-4 text-sm font-medium text-ink-soft">
          <VerifiedLine
            resource={resource}
            verb="verified"
            source={
              <>
                Source:{" "}
                {resource.website ? (
                  <ExternalLink
                    href={resource.website}
                    className="inline-flex items-center gap-1 font-bold text-teal-link hover:underline"
                  >
                    {resource.sourceLabel} <ExternalIcon className="size-3.5" aria-hidden="true" />
                  </ExternalLink>
                ) : (
                  resource.sourceLabel
                )}
              </>
            }
          />
        </p>
        <OpenStatusRow resource={resource} className="mb-5 justify-start gap-x-4" />
        <p className="mb-8 leading-relaxed text-ink-soft">{resource.description}</p>

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

        <section className="border-t border-line py-7">
          <h2 className="mb-4 text-xl font-bold text-brand-deep">Eligibility</h2>
          <p className="leading-relaxed text-ink-soft">
            {resource.eligibility}. Assistance and availability are never guaranteed; please
            confirm directly.
          </p>
          <div className="mt-4 grid gap-1 rounded-xl border-l-4 border-aqua bg-mint p-4 text-brand">
            <strong>Next step</strong>
            <span className="text-sm leading-normal text-ink">
              Call or visit the official site to confirm hours and eligibility.
            </span>
          </div>
        </section>

        <CommunityReport neighborStatus={resource.neighborStatus} />
        <HelpfulFeedback />
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
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to Results
      </Link>
      <DemoNotice className="mb-5" />
    </>
  );
}
