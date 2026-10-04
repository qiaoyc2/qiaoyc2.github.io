"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NewTabHint, newTabProps } from "@/components/ui/ExternalLink";
import type { NavItem } from "@/data/profile";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/nav";

/**
 * A single nav item. This is the only client component in the header chrome —
 * it exists purely because active highlighting needs `usePathname()`, which the
 * server cannot know. Keeping it at the link level means the header, wordmark,
 * and footer all stay server-rendered.
 */

const STYLES = {
  desktop: {
    base: "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
    active: "text-accent",
    inactive: "text-muted-foreground hover:text-foreground",
    // Sits on top of the header's bottom border.
    indicator: "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent",
  },
  mobile: {
    base: "flex items-center rounded-md border-l-2 px-3 py-2.5 text-base font-medium transition-colors",
    active: "border-accent text-accent bg-accent-subtle",
    inactive: "border-transparent text-muted-foreground hover:text-foreground",
    indicator: "",
  },
} as const;

type NavLinkProps = {
  item: NavItem;
  variant?: keyof typeof STYLES;
  /** Lets the mobile menu close itself when a link is chosen. */
  onNavigate?: () => void;
};

export function NavLink({ item, variant = "desktop", onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, item.match);
  const styles = STYLES[variant];

  // Resume points at a static file, so it has to be a plain anchor — routing it
  // through next/link would try to resolve it as a page.
  if (item.external) {
    return (
      <a
        href={item.href}
        {...newTabProps}
        onClick={onNavigate}
        className={cn(styles.base, styles.inactive, "gap-1")}
      >
        {item.label}
        <ArrowUpRight className="inline size-3.5 align-[-1px]" aria-hidden />
        <NewTabHint label={item.hint} />
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      // Conveys the active state to assistive tech; the colour and the
      // underline convey it visually, so it never relies on colour alone.
      aria-current={active ? "page" : undefined}
      className={cn(styles.base, active ? styles.active : styles.inactive)}
    >
      {item.label}
      {active && styles.indicator ? (
        <span className={styles.indicator} aria-hidden />
      ) : null}
    </Link>
  );
}
