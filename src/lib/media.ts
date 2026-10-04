import { existsSync } from "node:fs";
import path from "node:path";

import type { Project, ProjectImage } from "@/types/project";

/**
 * Whether a `public/` file actually exists. Used so Open Graph tags and
 * <Image> never point at a path that 404s — a missing screenshot falls back
 * to the intentional placeholder panel instead.
 *
 * Server-only: this reads the filesystem.
 */
export function publicFileExists(src?: string): boolean {
  if (!src || !src.startsWith("/") || src.includes("..")) return false;
  const relative = src.replace(/^\/+/, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}

/** Hero first, then the catalog thumbnail, and only if the file is on disk. */
export function getExistingProjectImage(project: Project): ProjectImage | undefined {
  if (project.heroImage && publicFileExists(project.heroImage.src)) {
    return project.heroImage;
  }
  if (project.thumbnail && publicFileExists(project.thumbnail.src)) {
    return project.thumbnail;
  }
  return undefined;
}
