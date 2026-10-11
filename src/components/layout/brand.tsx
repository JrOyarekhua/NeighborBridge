import Link from "next/link";
import { Users } from "lucide-react";

import { cn } from "@/lib/utils";

export function Brand({ variant = "default" }: { variant?: "default" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="NeighborBridge ATL home"
      className={cn(
        "inline-flex items-center gap-2.5 text-base font-bold tracking-tight sm:text-lg",
        variant === "light" ? "text-white" : "text-brand-deep",
      )}
    >
      <span className="grid size-9 place-items-center rounded-md bg-brand text-primary-foreground shadow-logo sm:size-10 sm:rounded-lg">
        <Users size={22} aria-hidden="true" />
      </span>
      <span>
        NeighborBridge{" "}
        <strong className={cn("font-extrabold", variant === "light" ? "text-aqua" : "text-teal-link")}>
          ATL
        </strong>
      </span>
    </Link>
  );
}
