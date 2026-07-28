import { notFound } from "next/navigation";
import { ProjectStoryHero } from "@/components/project-story-hero";
import { RichCopy } from "@/components/rich-copy";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { SubpageControls } from "@/components/subpage-controls";
import { TagList } from "@/components/tag-list";
import { getProject, getProjects } from "@/lib/content";
import { formatProjectDate } from "@/lib/format-project-date";

export const dynamicParams = false;
export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const basePath = process.env.PAGES_BASE_PATH || "";
  return (
    <main>
      <SiteHeader />
      <SubpageControls
        backHref="/archive"
        backLabel="Back to Projects"
        showBackToTop={false}
      />
      <article className="story project-story">
        <ProjectStoryHero
          basePath={basePath}
          category={project.category}
          image={project.image}
          summary={project.summary}
          title={project.title}
        />
        <div className="project-paper">
          <div className="project-paper-meta">
            <span>Date</span>
            <time dateTime={project.date || project.year}>
              {formatProjectDate(project.date, project.year)}
            </time>
          </div>
          <TagList tags={project.tags} className="story-tags" />
          <RichCopy body={project.body} />
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
