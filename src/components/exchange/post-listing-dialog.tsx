"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { FormDone, FormField, errorId, fieldControlClass } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ExchangeType } from "@/lib/data";

/** Give Back listings come from organizations, so neighbors can't post them. */
const POSTABLE_TYPES: readonly ExchangeType[] = ["Need Help", "Want to Help", "Volunteer"];

type Errors = Partial<Record<"title" | "description", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("title") ?? "").trim()) errors.title = "Please add a short title.";
  if (!String(data.get("description") ?? "").trim()) {
    errors.description = "Please describe the request or offer.";
  }
  return errors;
}

/**
 * "Post a Listing" button + form. Prototype: validates, then shows "pending review".
 * Nothing is sent anywhere yet. `submit` is the one place to wire up a real endpoint.
 */
export function PostListingDialog() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(new FormData(event.currentTarget));
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  };

  const reset = (open: boolean) => {
    if (!open) {
      setErrors({});
      setDone(false);
    }
  };

  const describedBy = (field: keyof Errors) =>
    errors[field] ? errorId(`listing-${field}`) : undefined;

  return (
    <Dialog onOpenChange={reset}>
      <DialogTrigger asChild>
        <Button>
          <Heart /> Post a Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2.5rem)] overflow-y-auto rounded-3xl p-6 shadow-modal sm:max-w-140 sm:p-8">
        {done ? (
          <>
            <DialogTitle className="sr-only">Listing received</DialogTitle>
            <FormDone title="Thanks! Your listing is pending review.">
              <p>Listings are checked by our team before they appear publicly.</p>
              <p className="text-sm">
                Prototype: nothing was sent or saved. In a live version, this would enter a
                moderation queue.
              </p>
              <DialogClose asChild>
                <Button className="mt-2">Back to the board</Button>
              </DialogClose>
            </FormDone>
          </>
        ) : (
          <form noValidate onSubmit={submit}>
            <DialogHeader className="mb-5 text-left">
              <DialogTitle className="pr-10 text-2xl font-bold tracking-tight text-brand-deep">
                Post a Listing
              </DialogTitle>
              <DialogDescription className="text-base text-ink-soft">
                Share a request or an offer. No skill trading or bartering is needed, and essential
                help is never conditional.
              </DialogDescription>
            </DialogHeader>

            <FormField id="listing-type" label="Listing type">
              <select id="listing-type" name="type" defaultValue="Need Help" className={fieldControlClass}>
                {POSTABLE_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </FormField>
            <FormField id="listing-category" label="Category">
              <input
                id="listing-category"
                name="category"
                maxLength={60}
                placeholder="e.g. Clothing, Transportation"
                className={fieldControlClass}
              />
            </FormField>
            <FormField id="listing-title" label="Title" required error={errors.title}>
              <input
                id="listing-title"
                name="title"
                maxLength={120}
                aria-invalid={!!errors.title}
                aria-describedby={describedBy("title")}
                className={fieldControlClass}
              />
            </FormField>
            <FormField id="listing-description" label="Description" required error={errors.description}>
              <textarea
                id="listing-description"
                name="description"
                rows={3}
                maxLength={1000}
                aria-invalid={!!errors.description}
                aria-describedby={describedBy("description")}
                className={fieldControlClass}
              />
            </FormField>
            <FormField id="listing-area" label="General neighborhood">
              <input id="listing-area" name="area" maxLength={80} placeholder="e.g. West End" className={fieldControlClass} />
            </FormField>
            <FormField id="listing-availability" label="Availability">
              <input id="listing-availability" name="availability" maxLength={120} className={fieldControlClass} />
            </FormField>

            <p className="mb-4 text-sm text-ink-soft">
              Do not include phone numbers, emails, home addresses, or sensitive personal details.
              All listings are moderated before they are published.
            </p>
            <Button type="submit" className="w-full">
              Submit for review
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
