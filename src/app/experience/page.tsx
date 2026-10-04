import type { Metadata } from "next";

import { EducationCard } from "@/components/experience/EducationCard";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ResumeCta } from "@/components/experience/ResumeCta";
import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";
import { getGroupedExperience } from "@/lib/experience";

const title = `Experience | ${profile.name}`;
const description = `Professional, research, teaching, and leadership experience of ${profile.name}, a Data Engineer, Backend Developer, and Applied AI builder.`;

export const metadata: Metadata = {
  // `absolute` skips the root layout's "%s · Katharina Cheng" template, which
  // would otherwise override the pipe this title is specified with.
  title: { absolute: title },
  description,
  alternates: { canonical: "/experience" },
  // Repeated rather than inherited: Next replaces a parent openGraph object
  // wholesale instead of merging into it, so siteName would be dropped.
  openGraph: {
    title,
    description,
    siteName: profile.name,
    url: `${profile.siteUrl}/experience/`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

/** Page copy, as opposed to career content — the entries all come from data. */
const INTRO =
  "My experience spans software development, data and AI research, teaching, and student leadership. Across these roles, I have built technical systems, analyzed complex datasets, supported learners, and coordinated collaborative projects.";

export default function ExperiencePage() {
  // Categories, their order, and which ones appear at all are decided by the
  // data and the canonical EXPERIENCE_CATEGORIES list, not by this page.
  const groups = getGroupedExperience();

  return (
    <>
      <Container width="wide" className="pt-12 pb-10 sm:pt-16 sm:pb-12">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Experience</h1>

        <p className="text-muted-foreground mt-4 max-w-3xl leading-relaxed">{INTRO}</p>

        <div className="mt-8">
          <EducationCard />
        </div>
      </Container>

      <Container width="wide" className="pb-12 sm:pb-14">
        <div className="space-y-12 sm:space-y-14">
          {groups.map((group) => (
            <ExperienceSection key={group.category} group={group} />
          ))}
        </div>
      </Container>

      <ResumeCta />
    </>
  );
}
