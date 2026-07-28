import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { TagList } from "@/components/tag-list";
import { formatDate, getPosts } from "@/lib/content";

export default function Journal() {
  const notes = getPosts();

  return (
    <main className="journal-home">
      <SiteHeader />
      <section className="page-intro journal-intro">
        <div className="journal-intro-card">
          <span className="journal-card-index">XVII · The inner room</span>
          <i aria-hidden="true">☾</i>
          <p className="eyebrow">Notes on being here</p>
          <h1>Journal</h1>
          <p>
            Thoughts on creativity, technology, attention, life, and whatever
            else keeps tapping me on the shoulder.
          </p>
          <span className="journal-byline">Written by Daniel Hughes</span>
        </div>
      </section>
      <section className="journal-list">
        <div className="journal-list-heading">
          <p>Latest entries</p>
          <span>A journal of my perspective</span>
        </div>
        {notes.map((post, index) => (
          <Link href={`/journal/${post.slug}`} className="note" key={post.slug}>
            <p>
              Note {String(index + 1).padStart(3, "0")} · {formatDate(post.date)}
            </p>
            <h2>{post.title}</h2>
            <p className="note-summary">{post.summary}</p>
            <TagList tags={post.tags} className="journal-list-tags" linked={false} />
            <span>{post.readTime}</span>
          </Link>
        ))}
      </section>
      <SiteFooter journal />
    </main>
  );
}
