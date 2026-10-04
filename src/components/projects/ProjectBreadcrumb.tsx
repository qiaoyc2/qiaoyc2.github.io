import Link from "next/link";

/**
 * Projects → current case study. The current page is text, not a link, so
 * keyboard users are not offered a loop back to where they already are.
 */
export function ProjectBreadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <li>
          <Link
            href="/projects/"
            className="text-accent underline-offset-4 hover:underline"
          >
            Projects
          </Link>
        </li>
        <li aria-hidden className="text-border">
          /
        </li>
        <li
          className="text-foreground min-w-0 font-medium break-words"
          aria-current="page"
        >
          {name}
        </li>
      </ol>
    </nav>
  );
}
