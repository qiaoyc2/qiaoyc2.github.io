import Link from "next/link";

import { navLinks, profile } from "@/data/profile";

import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Sticky header. A server component — only the individual nav links, the theme
 * toggle, and the mobile menu ship JavaScript.
 *
 * `relative` is load-bearing: the mobile panel positions against this element
 * so it can span the full viewport width rather than the container's.
 */
export function SiteHeader() {
  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <Container width="wide" className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight"
          aria-label={`${profile.name} — home`}
        >
          {profile.name}
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </nav>

          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
