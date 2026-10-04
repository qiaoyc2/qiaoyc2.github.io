"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { filterByCategory, type FilterCategory } from "@/lib/project-utils";
import type { ProjectCardData, ProjectCategory } from "@/types/project";

import { ProjectFilter } from "./ProjectFilter";
import { ProjectGrid } from "./ProjectGrid";

const GRID_ID = "project-grid";

const listeners = new Set<() => void>();

function subscribeToSearch(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function getSearch() {
  return window.location.search;
}

function getServerSearch() {
  return "";
}

function parseCategory(
  value: string | null,
  used: readonly ProjectCategory[],
): FilterCategory {
  if (value && (used as readonly string[]).includes(value)) {
    return value as ProjectCategory;
  }
  return "All";
}

function writeCategory(category: FilterCategory) {
  const url = new URL(window.location.href);
  if (category === "All") {
    url.searchParams.delete("category");
  } else {
    url.searchParams.set("category", category);
  }
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  listeners.forEach((listener) => listener());
}

type ProjectsCatalogProps = {
  projects: ProjectCardData[];
  categories: ProjectCategory[];
};

/**
 * Client island for the catalog: filter buttons, a polite result count, and
 * the grid. The page around it stays a server component.
 *
 * Filtering is local state over the already-loaded card array — no request,
 * no reload. The active category is mirrored to `?category=` so a filtered
 * view can be linked; static export always ships every card in the HTML, which
 * is what no-JS visitors and search engines see.
 */
export function ProjectsCatalog({ projects, categories }: ProjectsCatalogProps) {
  const search = useSyncExternalStore(subscribeToSearch, getSearch, getServerSearch);
  const active = parseCategory(new URLSearchParams(search).get("category"), categories);

  const select = useCallback((category: FilterCategory) => {
    writeCategory(category);
  }, []);

  const visible = useMemo(() => filterByCategory(projects, active), [projects, active]);

  const count = visible.length;
  const noun = count === 1 ? "project" : "projects";
  const countLabel =
    active === "All"
      ? `Showing ${count} ${noun}`
      : `Showing ${count} ${noun} in ${active}`;

  return (
    <div className="mt-10">
      <ProjectFilter
        categories={categories}
        active={active}
        onChange={select}
        gridId={GRID_ID}
      />

      <p
        className="text-muted-foreground mt-4 font-mono text-xs"
        aria-live="polite"
        aria-atomic="true"
      >
        {countLabel}
      </p>

      <ProjectGrid id={GRID_ID} projects={visible} />
    </div>
  );
}
