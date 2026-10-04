import Image from "next/image";

import { cn } from "@/lib/cn";
import { publicFileExists } from "@/lib/media";
import type { ProjectImage, ProjectOutput } from "@/types/project";

import { PlaceholderMedia } from "./PlaceholderMedia";

type ProjectMediaProps = {
  /** Omit or pass a missing file and the intentional placeholder panel is used. */
  image?: ProjectImage;
  /** Label on the placeholder panel — the project name, or the output's alt. */
  label: string;
  kind?: ProjectOutput["kind"];
  className?: string;
  /**
   * Frame for the media. Hero banners use a wide crop; gallery items stay
   * closer to 16:10 so screenshots remain readable.
   */
  frame?: "hero" | "gallery" | "diagram";
};

const FRAMES = {
  hero: "h-48 w-full sm:h-56 md:h-64",
  gallery: "aspect-[16/10]",
  diagram: "aspect-[16/10]",
} as const;

/**
 * One screenshot, diagram, or recording. Real files render through next/image
 * (or a <video> tag). Anything else — unset src, missing file — is the same
 * dotted placeholder the catalog already uses, so Stage 8 is a data change
 * rather than a layout change.
 */
export function ProjectMedia({
  image,
  label,
  kind = "image",
  className,
  frame = "gallery",
}: ProjectMediaProps) {
  const src = image?.src;
  const exists = publicFileExists(src);
  const caption = image?.caption?.trim();
  const isDiagram = kind === "diagram" || frame === "diagram";
  const isVideo = kind === "video";

  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className={cn(
          "border-border bg-surface-muted rounded-card relative overflow-hidden border",
          FRAMES[frame],
        )}
      >
        {exists && src && isVideo ? (
          <video
            src={src}
            controls
            className="absolute inset-0 size-full object-contain"
            aria-label={image?.alt ?? label}
          />
        ) : exists && src ? (
          <Image
            src={src}
            alt={image?.alt ?? label}
            fill
            className={
              isDiagram
                ? "object-contain object-center p-4"
                : "object-cover object-center"
            }
            style={
              image?.objectPosition ? { objectPosition: image.objectPosition } : undefined
            }
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <PlaceholderMedia label={label} className="absolute inset-0" />
        )}
      </div>

      {caption ? (
        <figcaption className="text-muted-foreground mt-2 text-sm">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
