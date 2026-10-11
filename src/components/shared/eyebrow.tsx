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
        "inline-flex items-center gap-2 text-[0.8125rem] font-extrabold tracking-[0.12em] uppercase [&_svg]:size-4",
        tone === "light" ? "text-aqua" : "text-teal-link",
        className,
      )}
    >
      {children}
    </span>
  );
}
