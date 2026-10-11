import { Sparkles } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export function DemoNotice({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Alert variant="demo" className={cn(compact ? "p-3 text-xs" : "px-4 py-3.5", className)}>
      <Sparkles />
      <AlertDescription className={cn("leading-normal", compact && "text-xs")}>
        <p>
          <strong>Prototype demo:</strong> Confirm current hours, eligibility, and availability
          directly with each provider.
        </p>
      </AlertDescription>
    </Alert>
  );
}
