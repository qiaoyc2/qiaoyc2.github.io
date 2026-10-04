import { FileText, Mail } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { profile } from "@/data/profile";

/**
 * Closing prompt on the Experience page. The copy here is interface text rather
 * than career content, so it lives with the component; the destinations come
 * from `profile` so the résumé path and contact anchor stay defined in one place.
 */
export function ResumeCta() {
  return (
    <Container width="wide" className="pt-4 pb-2">
      <section
        aria-labelledby="resume-cta-heading"
        className="border-border bg-surface-muted rounded-card border p-6 sm:p-8"
      >
        <h2
          id="resume-cta-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Want the one-page version?
        </h2>

        <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
          The résumé covers this same history in a single page. If anything here overlaps
          with what your team is working on, I would be glad to talk it through.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={profile.resumePath} external hint="PDF, opens in a new tab">
            <FileText className="size-4" aria-hidden />
            View Resume
          </ButtonLink>

          <ButtonLink href={profile.contactHref} variant="secondary">
            <Mail className="size-4" aria-hidden />
            Contact Me
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
