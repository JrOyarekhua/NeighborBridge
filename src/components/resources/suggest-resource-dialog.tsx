"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

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
import { RESOURCE_CATEGORIES } from "@/lib/filters";

type Errors = Partial<Record<"name", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) {
    errors.name = "Please enter the name of the organization or program.";
  }
  return errors;
}

/**
 * "Suggest a Resource" button + form. Prototype: validates, then shows a thank-you.
 * Nothing is sent anywhere yet. `submit` is the one place to wire up a real endpoint.
 */
export function SuggestResourceDialog({
  trigger = "button",
}: {
  /** "link" for the quieter version under the empty state. */
  trigger?: "button" | "link";
}) {
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

  return (
    <Dialog onOpenChange={reset}>
      <DialogTrigger asChild>
        {trigger === "link" ? (
          <Button variant="link" className="mt-3 font-bold text-teal-link underline">
            Suggest a Resource
          </Button>
        ) : (
          <Button variant="outline">
            <Sparkles /> Suggest a Resource
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2.5rem)] overflow-y-auto rounded-3xl p-6 shadow-modal sm:max-w-140 sm:p-8">
        {done ? (
          <>
            <DialogTitle className="sr-only">Suggestion received</DialogTitle>
            <FormDone title="Thank you for helping Atlanta!">
              <p>Our team will review this resource before it appears in the directory.</p>
              <p className="text-sm">
                Prototype: nothing was sent or saved. A live version would add this to a moderation
                queue as unpublished.
              </p>
              <DialogClose asChild>
                <Button className="mt-2">Back to directory</Button>
              </DialogClose>
            </FormDone>
          </>
        ) : (
          <form noValidate onSubmit={submit}>
            <DialogHeader className="mb-5 text-left">
              <DialogTitle className="pr-10 text-2xl font-bold tracking-tight text-brand-deep">
                Suggest a Resource
              </DialogTitle>
              <DialogDescription className="text-base text-ink-soft">
                Know a food or housing resource we are missing? Tell us about it.
              </DialogDescription>
            </DialogHeader>

            <FormField id="suggest-name" label="Resource name" required error={errors.name}>
              <input
                id="suggest-name"
                name="name"
                maxLength={120}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? errorId("suggest-name") : undefined}
                className={fieldControlClass}
              />
            </FormField>
            <FormField id="suggest-category" label="Category">
              <select id="suggest-category" name="category" defaultValue="Food" className={fieldControlClass}>
                {RESOURCE_CATEGORIES.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </FormField>
            <FormField id="suggest-address" label="Resource address">
              <input id="suggest-address" name="address" autoComplete="off" className={fieldControlClass} />
            </FormField>
            <FormField id="suggest-services" label="Services offered">
              <textarea id="suggest-services" name="services" rows={2} maxLength={500} className={fieldControlClass} />
            </FormField>
            <FormField id="suggest-hours" label="Hours, if known">
              <input id="suggest-hours" name="hours" maxLength={300} className={fieldControlClass} />
            </FormField>
            <FormField id="suggest-source" label="Official website or source">
              <input id="suggest-source" name="source" type="url" inputMode="url" className={fieldControlClass} />
            </FormField>
            <FormField id="suggest-heard" label="How did you hear about this resource?">
              <input id="suggest-heard" name="heard" maxLength={200} className={fieldControlClass} />
            </FormField>

            <p className="mb-4 text-sm text-ink-soft">
              Please share information about organizations, not private individuals.
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
