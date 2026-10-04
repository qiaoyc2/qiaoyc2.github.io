import { GraduationCap } from "lucide-react";

import { TechTag } from "@/components/ui/TechTag";
import { profile } from "@/data/profile";

const { education } = profile;

/**
 * Compact education block for the top of the Experience page.
 *
 * Deliberately one small card rather than a full section: the degree is context
 * for the roles below it, not a competing résumé header. Every value comes from
 * `profile.education`, and honours only appear when that field is filled in.
 */
export function EducationCard() {
  return (
    <div className="border-border bg-surface rounded-card border p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <GraduationCap className="text-accent size-4 shrink-0" aria-hidden />
        <h2 className="text-base font-semibold tracking-tight">Education</h2>
      </div>

      <div className="mt-4">
        <p className="font-medium">{education.school}</p>
        <p className="text-muted-foreground mt-1 text-sm">
          {education.degree} · {education.concentration} concentration
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          {education.location} · Graduated {education.graduation}
        </p>
        {education.gpa ? (
          <p className="text-muted-foreground mt-1 text-sm">
            GPA: <span className="text-foreground font-medium">{education.gpa}</span>
          </p>
        ) : null}
      </div>

      {education.honors ? (
        <div className="mt-4">
          <h3 className="sr-only">Honors</h3>
          <TechTag>{education.honors}</TechTag>
        </div>
      ) : null}
    </div>
  );
}
