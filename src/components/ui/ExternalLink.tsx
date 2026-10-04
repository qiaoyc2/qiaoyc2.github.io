import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * `noopener` stops the opened page from reaching back through window.opener;
 * `noreferrer` is belt and braces for older browsers.
 */
export const newTabProps = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Warns screen-reader users that a link changes context. Sighted users get the
 * same warning from the arrow icon, so nothing is conveyed by one channel alone.
 */
export function NewTabHint({ label = "opens in a new tab" }: { label?: string }) {
  return <span className="sr-only"> ({label})</span>;
}

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Overrides the default "opens in a new tab" wording. */
  hint?: string;
};

/** A text link to somewhere off-site, opened safely in a new tab. */
export function ExternalLink({ href, children, className, hint }: ExternalLinkProps) {
  return (
    <a
      href={href}
      {...newTabProps}
      className={cn(
        "hover:text-accent underline-offset-4 transition-colors hover:underline",
        className,
      )}
    >
      {children}
      <NewTabHint label={hint} />
    </a>
  );
}
