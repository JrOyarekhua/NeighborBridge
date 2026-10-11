"use client";

import { useId, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Hidden behind a toggle below the `nav` breakpoint; always shown above it. */
export function CollapsibleOnMobile({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <Button
        type="button"
        variant="outline"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="w-full nav:hidden"
      >
        <SlidersHorizontal /> {open ? `Hide ${label.toLowerCase()}` : label}
      </Button>
      <div id={id} className={cn(open ? "block" : "hidden nav:block", className)}>
        {children}
      </div>
    </>
  );
}
