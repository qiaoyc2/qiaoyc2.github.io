import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { newTabProps } from "@/components/ui/ExternalLink";
import { profile } from "@/data/profile";

import { Container } from "./Container";

/**
 * Contact details come from `src/data/profile.ts` — change them there, not here.
 * Any entry without a URL is dropped rather than rendered as a dead link.
 */
const contactLinks = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: Mail, external: false },
  { label: "LinkedIn", href: profile.linkedinUrl, icon: LinkedinIcon, external: true },
  { label: "GitHub", href: profile.githubUrl, icon: GithubIcon, external: true },
].filter((link) => Boolean(link.href));

export function SiteFooter() {
  // Evaluated during the build. The site is rebuilt on every deploy, so the
  // year stays current without shipping a script to compute it.
  const year = new Date().getFullYear();

  return (
    <footer className="border-border mt-24 border-t">
      <Container width="wide" className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-muted-foreground mt-1 text-sm">{profile.tagline}</p>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {contactLinks.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? newTabProps : {})}
                  className="text-muted-foreground hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {label}
                  {external ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-muted-foreground mt-8 text-xs">
          © {year} {profile.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
