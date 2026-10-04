import { Mail } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <Container width="wide" className="pt-12 pb-2 sm:pt-14 lg:pt-16">
      {/*
        scroll-mt clears the 4rem sticky header when the nav's /#contact link
        jumps here, so the heading is not hidden underneath it.
      */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-border bg-surface rounded-card scroll-mt-24 border p-6 sm:p-10"
      >
        <h2
          id="contact-heading"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Let&rsquo;s talk
        </h2>

        <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
          {profile.contactIntro}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${profile.email}`}>
            <Mail className="size-4" aria-hidden />
            Email me
          </ButtonLink>

          <ButtonLink href={profile.linkedinUrl} variant="secondary" external>
            <LinkedinIcon className="size-4" />
            LinkedIn
          </ButtonLink>

          <ButtonLink href={profile.githubUrl} variant="secondary" external>
            <GithubIcon className="size-4" />
            GitHub
          </ButtonLink>
        </div>

        <p className="text-muted-foreground mt-6 text-sm">
          The fastest way to reach me is email —{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-accent underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </p>
      </section>
    </Container>
  );
}
