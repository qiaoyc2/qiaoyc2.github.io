import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const TONES = {
  /** Technologies, skills, research methods. */
  default: "border-border bg-surface-muted text-muted-foreground",
  /** Project categories — tinted so they read as a different kind of label. */
  accent: "border-transparent bg-accent-subtle text-accent",
} as const;

type TechTagProps = {
  children: ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
};

/** Small inline label. Rows of these should always be allowed to wrap. */
export function TechTag({ children, tone = "default", className }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
