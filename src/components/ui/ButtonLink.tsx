import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { NewTabHint, newTabProps } from "./ExternalLink";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors";

const VARIANTS = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary: "border border-border-strong text-foreground hover:bg-surface-muted",
  ghost: "text-muted-foreground hover:text-foreground",
} as const;

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  /** Renders a plain anchor with new-tab handling instead of a router link. */
  external?: boolean;
  /** Overrides the default new-tab wording, e.g. "PDF, opens in a new tab". */
  hint?: string;
  className?: string;
};

/**
 * A link styled as a button. Buttons wrap rather than shrink on narrow screens,
 * so a row of these stays usable at 360px.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  hint,
  className,
}: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (external) {
    return (
      <a href={href} {...newTabProps} className={classes}>
        {children}
        <NewTabHint label={hint} />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
