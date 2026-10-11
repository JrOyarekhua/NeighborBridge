import { HandHeart, Heart, Sparkles, Users, type LucideIcon } from "lucide-react";

import type { ExchangeType } from "@/lib/data";

/** Display details for each listing type, shared by the board, cards and dialog. */
export const LISTING_TYPE_META: Record<
  ExchangeType,
  {
    icon: LucideIcon;
    badge: "need-help" | "want-to-help" | "volunteer" | "give-back";
    /** Colored bar across the top of the card. */
    bar: string;
  }
> = {
  "Need Help": { icon: Heart, badge: "need-help", bar: "before:bg-coral" },
  "Want to Help": { icon: Users, badge: "want-to-help", bar: "before:bg-aqua" },
  Volunteer: { icon: HandHeart, badge: "volunteer", bar: "before:bg-sun" },
  "Give Back": { icon: Sparkles, badge: "give-back", bar: "before:bg-purple" },
};
