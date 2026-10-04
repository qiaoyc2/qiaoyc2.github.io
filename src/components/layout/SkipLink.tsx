/**
 * Hidden until focused, then pinned to the top-left. Targets #main, which the
 * root layout puts on the <main> element of every route.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="bg-accent text-accent-foreground sr-only rounded-lg px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}
