import { notFound } from "next/navigation";
import { RichCopy } from "@/components/rich-copy";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getProject, getProjects } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main>
      <SiteHeader />
      <article className="story">
        <div className="story-head">
          <p className="eyebrow">{project.category} · {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <div className={`story-visual project-visual ${project.accent}`}><div className="visual-mark" /></div>
        <RichCopy body={project.body} />
      </article>
      <SiteFooter />
    </main>
  );
}
