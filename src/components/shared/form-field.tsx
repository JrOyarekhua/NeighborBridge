import { Check, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

/** Shared look for text inputs, selects and textareas inside forms. */
export const fieldControlClass =
  "w-full min-h-12 rounded-xl border-[1.5px] border-field bg-surface px-3.5 py-2.5 text-base text-ink outline-none focus-visible:border-aqua focus-visible:ring-3 focus-visible:ring-aqua/30 aria-invalid:border-urgent";

/**
 * Label + control + error message. Pass the control as `children` with matching
 * `id`, and `aria-describedby={errorId(id)}` when it can show an error.
 */
export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  /** Replaces "(optional)" after the label. */
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-brand">
        {label}{" "}
        {required ? (
          <span className="font-semibold text-coral-strong">(required)</span>
        ) : (
          <small className="font-medium text-ink-soft">{hint ?? "(optional)"}</small>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId(id)} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-urgent">
          <TriangleAlert className="size-4 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export const errorId = (id: string) => `${id}-error`;

/** Green "thanks" banner shown after a demo submission. */
export function ThanksMessage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      role="status"
      className={cn("flex items-center gap-2 rounded-xl bg-mint p-4 font-bold text-brand", className)}
    >
      <Check className="size-5 shrink-0" aria-hidden="true" /> <span>{children}</span>
    </p>
  );
}

/** Checkmark + heading + text, shown in place of a form once it's submitted. */
export function FormDone({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-mint text-brand">
        <Check className="size-7" aria-hidden="true" />
      </span>
      <h2 className="mt-4 mb-2 text-2xl font-bold tracking-tight text-brand-deep">{title}</h2>
      <div className="space-y-3 text-ink-soft">{children}</div>
    </div>
  );
}
