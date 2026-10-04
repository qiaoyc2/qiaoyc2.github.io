import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The one place horizontal page width and padding are decided. Every section
 * should sit inside a Container rather than setting its own max-width, so the
 * left edge of the header, the body, and the footer all line up.
 */
const WIDTHS = {
  /** Long-form reading: case-study prose, single-column sections. */
  narrow: "max-w-2xl",
  /** Default page width. */
  default: "max-w-5xl",
  /** Project grids and the header, which need the extra room. */
  wide: "max-w-6xl",
} as const;

/**
 * Standard vertical rhythm between page sections. Kept here next to the width
 * scale so spacing stays consistent as sections are added.
 */
export const SECTION_Y = "py-12 sm:py-14 lg:py-16";

type ContainerProps = {
  children: ReactNode;
  width?: keyof typeof WIDTHS;
  /** Pick the tag that matches the landmark you need. */
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Container({
  children,
  width = "default",
  as: Tag = "div",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn(
        // w-full plus a max-width, rather than a fixed width, is what keeps
        // narrow phones from overflowing horizontally.
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        WIDTHS[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
