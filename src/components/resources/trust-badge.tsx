import { Check, ShieldCheck, TriangleAlert, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { TrustLevel } from "@/lib/data";

const TRUST_META: Record<
  TrustLevel,
  { icon: LucideIcon; variant: "trust-verified" | "trust-partner" | "trust-recheck" }
> = {
  Verified: { icon: Check, variant: "trust-verified" },
  "Partner-verified": { icon: ShieldCheck, variant: "trust-partner" },
  "Needs re-check": { icon: TriangleAlert, variant: "trust-recheck" },
};

/** How much to trust a record: verified, partner-verified, or needs re-check. */
export function TrustBadge({ level }: { level: TrustLevel }) {
  const { icon: Icon, variant } = TRUST_META[level];
  return (
    <Badge variant={variant}>
      <Icon aria-hidden="true" /> {level}
    </Badge>
  );
}
