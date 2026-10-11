"use client";

import { useState } from "react";
import { Users } from "lucide-react";

import { ThanksMessage } from "@/components/shared/form-field";
import { ToggleButtons } from "@/components/shared/toggle-buttons";
import { Button } from "@/components/ui/button";

const REPORT_OPTIONS = [
  "Open and Serving",
  "Closed Today",
  "Running Low",
  "Long Wait",
  "Information Is Wrong",
] as const;
type ReportOption = (typeof REPORT_OPTIONS)[number];

/**
 * "Were You Here Today?" Prototype: nothing is sent. `submit` is the one place
 * to wire up a real endpoint.
 */
export function CommunityReport({ neighborStatus }: { neighborStatus?: string }) {
  const [report, setReport] = useState<ReportOption | "">("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => setSubmitted(true);

  return (
    <section aria-labelledby="report-heading" className="border-t border-line pt-7">
      <h2 id="report-heading" className="text-xl font-bold text-brand-deep">
        Were You Here Today?
      </h2>
      <p className="mt-1 mb-5 text-ink-soft">
        Help your neighbors by sharing an update about this resource.
      </p>

      {submitted ? (
        <ThanksMessage>Thank you! Your update helps neighbors find reliable support.</ThanksMessage>
      ) : (
        <>
          <ToggleButtons
            label="Choose an update"
            options={REPORT_OPTIONS}
            value={report}
            onChange={setReport}
            className="mb-4"
          />
          <Button disabled={!report} onClick={submit}>
            Submit update
          </Button>
        </>
      )}

      <p className="mt-5 text-sm text-ink-soft">
        Reports are community hints and are held for moderation. A single unverified report does
        not change official information. Nothing is saved in this prototype.
      </p>

      <h3 className="mt-5 mb-2 font-bold text-brand-deep">Recent community reports</h3>
      {neighborStatus ? (
        <ul className="text-sm">
          <li className="flex items-center gap-2">
            <Users className="size-4 shrink-0 text-brand" aria-hidden="true" /> {neighborStatus}{" "}
            <small className="text-ink-soft">(demo data)</small>
          </li>
        </ul>
      ) : (
        <p className="text-sm text-ink-soft">No community reports yet.</p>
      )}
    </section>
  );
}
