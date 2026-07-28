"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Project } from "@/lib/content";
import { formatProjectDate } from "@/lib/format-project-date";
import { CREATIVE_TAGS } from "@/lib/tags";
import { TagList } from "@/components/tag-list";

const filters = ["All", ...CREATIVE_TAGS];

export function ArchiveBrowser({
  basePath,
  projects,
}: {
  basePath: string;
  projects: Project[];
}) {
  const searchParams = useSearchParams();
  const active = searchParams.get("tag") || "All";
  const filtered = active === "All"
    ? projects
    : projects.filter((project) =>
        `${project.tags.join(" ")} ${project.category} ${project.title} ${project.summary}`
          .toLowerCase()
          .includes(active.toLowerCase()),
      );

  return (
    <section className="archive-grid">
      <div className="filters" aria-label="Filter projects">
        {filters.map((filter) =>
          filter === "All" ? (
            <a
              className={active === filter ? "active" : ""}
              href={`${basePath}/archive/`}
              key={filter}
            >
              All work
            </a>
          ) : (
            <Link
              className={active === filter ? "active" : ""}
              href={`/archive?tag=${encodeURIComponent(filter)}`}
              key={filter}
            >
              {filter}
            </Link>
          ),
        )}
      </div>
      <p className="filter-status">
        Showing <strong>{active === "All" ? "everything" : active}</strong>
      </p>
      {filtered.map((project, index) => (
        <Link className="archive-row" href={`/archive/${project.slug}`} key={project.slug}>
          <div className={`archive-thumb project-visual ${project.accent}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div className="visual-mark" />
          </div>
          <div className="archive-row-copy">
            <h2>{project.title}</h2>
            <p className="archive-row-summary">{project.summary}</p>
            <div className="archive-row-meta">
              <TagList tags={project.tags} className="archive-row-tags" linked={false} />
              <time dateTime={project.date || project.year}>
                {formatProjectDate(project.date, project.year)}
              </time>
            </div>
          </div>
        </Link>
      ))}
      {filtered.length === 0 ? (
        <div className="empty-filter">
          <p>That corner of the archive is waiting for its first story.</p>
          <Link href="/archive">See everything instead</Link>
        </div>
      ) : null}
    </section>
  );
}
