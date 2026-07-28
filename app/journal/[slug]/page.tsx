import { notFound } from "next/navigation";
import { RichCopy } from "@/components/rich-copy";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { SubpageControls } from "@/components/subpage-controls";
import { formatDate, getPost, getPosts } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <main>
      <SiteHeader />
      <SubpageControls backHref="/journal" backLabel="Back to Journal" />
      <article className="story journal-story">
        <div className="story-head">
          <p className="eyebrow">{formatDate(post.date)} · {post.readTime} read</p>
          <h1>{post.title}</h1>
          <p>{post.summary}</p>
        </div>
        <RichCopy body={post.body} />
      </article>
      <SiteFooter journal />
    </main>
  );
}
