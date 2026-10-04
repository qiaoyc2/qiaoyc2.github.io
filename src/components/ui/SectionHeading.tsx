import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  /** Small label above the title. */
  eyebrow?: string;
  description?: string;
  /** Optional link on the right, e.g. "View all projects". */
  action?: { label: string; href: string };
  /** Set when the heading needs its own id for an aria-labelledby reference. */
  id?: string;
  className?: string;
};

/**
 * Shared section header. Always renders an <h2>, so page-level headings stay in
 * order beneath the single <h1>.
 */
export function SectionHeading({
  title,
  eyebrow,
  description,
  action,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-accent font-mono text-xs tracking-wider uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 id={id} className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">{description}</p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="text-accent group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          {action.label}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      ) : null}
    </div>
  );
}
