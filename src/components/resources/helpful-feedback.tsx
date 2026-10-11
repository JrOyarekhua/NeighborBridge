"use client";

import { useState } from "react";
import { Flag } from "lucide-react";

import { FormField, ThanksMessage, fieldControlClass } from "@/components/shared/form-field";
import { ToggleButtons } from "@/components/shared/toggle-buttons";
import { Button } from "@/components/ui/button";

/**
 * "Was This Information Helpful?" plus "Report Incorrect Information".
 * Prototype: nothing is sent. `sendFeedback` and `reportWrongInfo` are the
 * places to wire up real endpoints.
 */
export function HelpfulFeedback() {
  const [helpful, setHelpful] = useState<"Yes" | "No" | "">("");
  const [comment, setComment] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [wrongInfoReported, setWrongInfoReported] = useState(false);

  const sendFeedback = () => setFeedbackSent(true);
  const reportWrongInfo = () => setWrongInfoReported(true);

  return (
    <section aria-labelledby="feedback-heading" className="mt-7 border-t border-line pt-7">
      <h2 id="feedback-heading" className="mb-4 text-xl font-bold text-brand-deep">
        Was This Information Helpful?
      </h2>

      {feedbackSent ? (
        <ThanksMessage>
          Thanks for the feedback. Comments are reviewed before they appear publicly.
        </ThanksMessage>
      ) : (
        <>
          <ToggleButtons
            label="Was this helpful?"
            options={["Yes", "No"] as const}
            value={helpful}
            onChange={setHelpful}
            className="mb-4"
          />
          <FormField id="feedback-comment" label="Optional comment" hint="(no name or email needed)">
            <textarea
              id="feedback-comment"
              rows={2}
              maxLength={280}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              className={fieldControlClass}
            />
          </FormField>
          <Button variant="outline" disabled={!helpful} onClick={sendFeedback}>
            Send feedback
          </Button>
        </>
      )}

      <div className="mt-4">
        {wrongInfoReported ? (
          <ThanksMessage>
            Thank you. In a live version our team would review this information.
          </ThanksMessage>
        ) : (
          <Button variant="link" className="px-0 font-bold text-teal-link underline" onClick={reportWrongInfo}>
            <Flag aria-hidden="true" /> Report Incorrect Information
          </Button>
        )}
      </div>
    </section>
  );
}
