import { cn } from "@/lib/utils";

/** Small uppercase label above headings ("Support starts with connection"). */
export function Eyebrow({
  children,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  tone?: "brand" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase [&_svg]:size-4",
        tone === "light" ? "text-mint" : "text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}
