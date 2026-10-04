import type { ProjectSection as ImplementationBlock } from "@/types/project";

import { ProjectMedia } from "./ProjectMedia";
import { ProjectSection } from "./ProjectSection";
import { Prose } from "./Prose";

/**
 * Named technical blocks from `implementation`. Each block is a small card
 * with optional supporting media — not a file-by-file walkthrough.
 */
export function TechnicalSection({ blocks }: { blocks: ImplementationBlock[] }) {
  if (blocks.length === 0) return null;

  return (
    <ProjectSection id="implementation" title="Technical implementation" prose={false}>
      <div className="space-y-5">
        {blocks.map((block) => (
          <article
            key={block.heading}
            className="border-border bg-surface rounded-card border p-5 sm:p-6"
          >
            <h3 className="font-semibold tracking-tight">{block.heading}</h3>
            <div className="mt-3 max-w-2xl">
              <Prose paragraphs={block.body} />
            </div>
            {block.image ? (
              <ProjectMedia
                image={block.image}
                label={block.image.alt}
                frame={block.image.caption ? "diagram" : "gallery"}
                className="mt-5"
              />
            ) : null}
          </article>
        ))}
      </div>
    </ProjectSection>
  );
}
