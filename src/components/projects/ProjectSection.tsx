import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type ProjectSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  /**
   * Narrow reading measure for long-form text. Grids (contributions, metrics,
   * galleries) pass false so they can use the full container width.
   */
  prose?: boolean;
};

/**
 * One case-study block. The page only mounts this when the section has content,
 * so a missing field never produces an empty heading.
 */
export function ProjectSection({
  id,
  title,
  children,
  prose = true,
}: ProjectSectionProps) {
  return (
    <Container
      width="wide"
      as="section"
      aria-labelledby={id}
      className="border-border border-t py-10 sm:py-12"
    >
      <SectionHeading id={id} title={title} />
      <div className={cn("mt-6", prose && "max-w-2xl")}>{children}</div>
    </Container>
  );
}
