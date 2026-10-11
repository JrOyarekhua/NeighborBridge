import type { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Input with a leading icon, as used by the ZIP and search fields. */
export function IconInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<typeof Input> & { icon: LucideIcon }) {
  return (
    <div className="relative">
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-brand"
      />
      <Input
        className={cn("h-12 rounded-lg bg-surface pl-11 text-base md:text-sm", className)}
        {...props}
      />
    </div>
  );
}
