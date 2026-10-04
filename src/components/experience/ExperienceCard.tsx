import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { newTabProps } from "@/components/ui/ExternalLink";
import { TechTag } from "@/components/ui/TechTag";
import { getProjectBySlug } from "@/lib/projects";
import type { Experience } from "@/types/experience";

import { ExperienceMetadata } from "./ExperienceMetadata";

/**
 * One experience entry.
 *
 * Reads top to bottom as role, organization, dates and location, summary,
 * scale, accomplishments, then skills — the order someone skimming a career
 * history expects. Every section below the header is optional, so a deliberately
 * brief entry (the capstone, which defers to its case study) renders as cleanly
 * as a fully detailed one.
 */
export function ExperienceCard({ entry }: { entry: Experience }) {
  const tagsId = `${entry.id}-skills`;
  // The case study is about the project, not the employer — naming the
  // organization would label the research link "for University of Washington".
  const linkedProject = entry.projectSlug
    ? getProjectBySlug(entry.projectSlug)
    : undefined;

  return (
    <article className="border-border bg-surface rounded-card hover:border-border-strong border p-5 transition-colors sm:p-6">
      <header>
        <h3 className="text-lg font-semibold tracking-tight">{entry.role}</h3>
        <p className="text-accent mt-1 text-sm font-medium">{entry.organization}</p>
        <ExperienceMetadata
          startDate={entry.startDate}
          endDate={entry.endDate}
          location={entry.location}
        />
      </header>

      {/* The max-w on the prose below keeps the measure readable at desktop
          width; a full-bleed card would stretch bullets past a comfortable
          line length. Tags and metrics still use the whole card. */}
      {entry.summary ? (
        <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-relaxed">
          {entry.summary}
        </p>
      ) : null}

      {entry.metrics && entry.metrics.length > 0 ? (
        <dl className="border-border mt-4 grid gap-3 border-y py-3 sm:grid-cols-3">
          {entry.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="text-muted-foreground text-xs">{metric.label}</dt>
              <dd className="mt-0.5 font-mono text-base font-semibold">{metric.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {entry.highlights && entry.highlights.length > 0 ? (
        <ul className="mt-4 max-w-3xl space-y-2">
          {entry.highlights.map((highlight) => (
            <li
              key={highlight}
              className="text-muted-foreground relative pl-5 text-sm leading-relaxed"
            >
              {/* Bullet drawn rather than listed, so it can be accent-coloured
                  and stay aligned with wrapped lines. Decorative. */}
              <span
                className="bg-accent absolute top-2 left-0 size-1.5 rounded-full"
                aria-hidden
              />
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      {entry.technologies && entry.technologies.length > 0 ? (
        <>
          {/*
            No visible label: the tags read as skills from context. The heading
            exists for screen readers, which would otherwise hit an unexplained
            list of terms. Neutral wording, because these are research methods
            on one card and sponsorship management on another.
          */}
          <h4 id={tagsId} className="sr-only">
            Skills and methods
          </h4>
          <ul aria-labelledby={tagsId} className="mt-4 flex flex-wrap gap-1.5">
            {entry.technologies.map((item) => (
              <li key={item}>
                <TechTag>{item}</TechTag>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {entry.projectSlug || entry.externalUrl ? (
        <div className="border-border mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4">
          {entry.projectSlug ? (
            <Link
              href={`/projects/${entry.projectSlug}/`}
              className="text-accent group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              View case study
              {/* Names the target, so this link still makes sense when a screen
                  reader lists every link on the page out of context. */}
              <span className="sr-only"> for {linkedProject?.name ?? entry.role}</span>
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          ) : null}

          {/* Rendered only when a URL exists, so there is never a dead link. */}
          {entry.externalUrl ? (
            <a
              href={entry.externalUrl}
              {...newTabProps}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline"
            >
              Visit {entry.organization}
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
