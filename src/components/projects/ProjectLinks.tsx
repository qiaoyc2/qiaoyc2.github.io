import {
  ArrowUpRight,
  FileText,
  Play,
  Presentation,
  type LucideIcon,
} from "lucide-react";

import { GithubIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getProjectLinks, type ProjectLink } from "@/lib/project-utils";
import type { Project } from "@/types/project";

const ICONS: Record<string, LucideIcon | typeof GithubIcon> = {
  "Live site": ArrowUpRight,
  GitHub: GithubIcon,
  Demo: Play,
  Report: FileText,
  Slides: Presentation,
};

const LABELS: Record<string, string> = {
  "Live site": "Live product",
};

function LinkIcon({ label }: { label: string }) {
  const Icon = ICONS[label];
  if (!Icon) return null;
  return <Icon className="size-4" aria-hidden />;
}

function CaseStudyLink({
  link,
  primary,
  name,
}: {
  link: ProjectLink;
  primary: boolean;
  name: string;
}) {
  const label = LABELS[link.label] ?? link.label;
  const hint =
    link.label === "Report"
      ? "PDF, opens in a new tab"
      : link.label === "Slides"
        ? "slides, opens in a new tab"
        : undefined;

  return (
    <ButtonLink
      href={link.href}
      variant={primary ? "primary" : "secondary"}
      external
      hint={hint}
    >
      <LinkIcon label={link.label} />
      {label}
      <span className="sr-only"> for {name}</span>
    </ButtonLink>
  );
}

/**
 * Only the URLs the project actually has. Live product is visually primary
 * when it exists; everything else is secondary. No empty buttons.
 */
export function ProjectLinks({
  project,
  name,
}: {
  project: Pick<
    Project,
    "liveUrl" | "githubUrl" | "demoUrl" | "reportUrl" | "presentationUrl"
  >;
  name: string;
}) {
  const links = getProjectLinks(project);
  if (links.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {links.map((link, index) => (
        <CaseStudyLink key={link.label} link={link} primary={index === 0} name={name} />
      ))}
    </div>
  );
}
