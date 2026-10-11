import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Uppercase pill used by the prototype's category and listing-type badges.
const pill = "h-auto px-2.5 py-1.5 text-xs font-extrabold tracking-wider uppercase"
const trust = "h-auto gap-1.5 px-2.5 py-1.5 text-xs font-bold"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        food: `${pill} bg-food text-food-foreground`,
        housing: `${pill} bg-housing text-housing-foreground`,
        emergency: `${pill} bg-emergency text-emergency-foreground`,
        "need-help": `${pill} bg-need-help text-need-help-foreground`,
        "want-to-help": `${pill} bg-want-to-help text-want-to-help-foreground`,
        volunteer: `${pill} bg-volunteer text-volunteer-foreground`,
        "give-back": `${pill} bg-give-back text-give-back-foreground`,
        // Trust levels: sentence case, not the uppercase pill.
        "trust-verified": `${trust} bg-trust-verified text-trust-verified-foreground`,
        "trust-partner": `${trust} bg-trust-partner text-trust-partner-foreground`,
        "trust-recheck": `${trust} bg-trust-recheck text-trust-recheck-foreground`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
