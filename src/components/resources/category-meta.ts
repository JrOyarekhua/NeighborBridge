import { House, Utensils, type LucideIcon } from "lucide-react";

import type { ResourceCategory } from "@/lib/data";

/** Display details for each resource category, shared by the picker, cards and detail page. */
export const CATEGORY_META: Record<
  ResourceCategory,
  { icon: LucideIcon; badge: "food" | "housing"; description: string }
> = {
  Food: { icon: Utensils, badge: "food", description: "Pantries, meals, and food programs" },
  Housing: {
    icon: House,
    badge: "housing",
    description: "Shelter, stability, and housing navigation",
  },
};
