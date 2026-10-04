import { ArrowRight, FileText, GraduationCap, MapPin } from "lucide-react";
import { Fragment } from "react";

import { Container } from "@/components/layout/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { newTabProps } from "@/components/ui/ExternalLink";
import { profile } from "@/data/profile";

const { education } = profile;

const socials = [
  { label: "LinkedIn", href: profile.linkedinUrl, Icon: LinkedinIcon },
  { label: "GitHub", href: profile.githubUrl, Icon: GithubIcon },
].filter((social) => Boolean(social.href));

/**
 * Two columns on desktop — introduction on the left, a compact facts card on
 * the right — collapsing to one column on mobile. The card is the only visual
 * flourish; there is no decorative background.
 */
export function Hero() {
  return (
    <Container width="wide" className="pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-16">
      {/*
        The two-column split waits until xl. At lg the container is already
        capped at max-w-6xl, so a sidebar there would squeeze the text column
        to ~630px — just under what "Katharina (Qiao-Yun) Cheng" needs at 48px,
        leaving the name one rounding error away from wrapping. Splitting at xl
        gives the name a comfortable margin, and below xl it has the full width.
      */}
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] xl:gap-12">
        <div>
          {/*
            text-balance rather than a forced single line: the name stays on one
            line wherever it fits and splits evenly when it does not.

            Each word is nowrap so a break can only land on a space. A hyphen is
            a break opportunity too, and balancing would happily split
            "(Qiao-Yun)" across lines as "(Qiao-" / "Yun)".
          */}
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
            {profile.fullName.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 && " "}
                <span className="whitespace-nowrap">{word}</span>
              </Fragment>
            ))}
          </h1>

          <p className="text-accent mt-3 text-base font-medium sm:text-lg">
            {profile.tagline}
          </p>

          <p className="text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects/">
              View Projects
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>

            <ButtonLink
              href={profile.resumePath}
              variant="secondary"
              external
              hint="PDF, opens in a new tab"
            >
              <FileText className="size-4" aria-hidden />
              Download Resume
            </ButtonLink>

            <ul className="flex items-center gap-1">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...newTabProps}
                    aria-label={`${label} profile (opens in a new tab)`}
                    className="border-border text-muted-foreground hover:border-border-strong hover:text-foreground inline-flex size-10 items-center justify-center rounded-lg border transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside
          aria-label="At a glance"
          className="border-border bg-surface rounded-card h-fit border p-5 sm:p-6"
        >
          {/*
            Two across whenever the card spans the full width, where a single
            column would leave it looking empty. Back to one column at xl,
            where it becomes a narrow sidebar.
          */}
          <dl className="grid gap-5 text-sm sm:grid-cols-2 xl:grid-cols-1">
            <div className="flex gap-3">
              <MapPin className="text-accent mt-0.5 size-4 shrink-0" aria-hidden />
              <div>
                <dt className="text-muted-foreground text-xs">Based in</dt>
                <dd className="mt-0.5 font-medium">{profile.location}</dd>
              </div>
            </div>

            <div className="flex gap-3">
              <GraduationCap className="text-accent mt-0.5 size-4 shrink-0" aria-hidden />
              <div>
                <dt className="text-muted-foreground text-xs">Education</dt>
                <dd className="mt-0.5 font-medium">{education.degree}</dd>
                <dd className="text-muted-foreground mt-0.5">
                  {education.concentration} concentration
                </dd>
                <dd className="text-muted-foreground mt-1">
                  {education.school} · Graduated {education.graduation}
                </dd>
              </div>
            </div>
          </dl>
        </aside>
      </div>
    </Container>
  );
}
