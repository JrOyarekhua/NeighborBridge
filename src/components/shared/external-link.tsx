/** Opens in a new tab safely, and tells screen-reader users it will. */
export function ExternalLink({ href, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
