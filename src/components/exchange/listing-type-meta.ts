import { Heart, Sparkles, Users, type LucideIcon } from "lucide-react";

import type { ExchangeType } from "@/lib/data";

/** Display details for each listing type, shared by the board, cards and dialog. */
export const LISTING_TYPE_META: Record<
  ExchangeType,
  { icon: LucideIcon; badge: "need" | "offer" | "skill"; plural: string }
> = {
  Need: { icon: Heart, badge: "need", plural: "Needs" },
  Offer: { icon: Users, badge: "offer", plural: "Offers" },
  Skill: { icon: Sparkles, badge: "skill", plural: "Skills" },
};
