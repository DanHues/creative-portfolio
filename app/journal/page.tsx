import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { formatDate, getPosts } from "@/lib/content";

export default function Journal() {
  const notes = getPosts();

  return (
    <main>
      <SiteHeader />
      <section className="page-intro journal-intro">
        <p className="eyebrow">Notes on being here</p>
        <h1>Journal</h1>
        <p>
          Thoughts on creativity, technology, attention, life, and whatever
          else keeps tapping me on the shoulder.
        </p>
      </section>
      <section className="journal-list">
        {notes.map((post, index) => (
          <Link href={`/journal/${post.slug}`} className="note" key={post.slug}>
            <p>
              Note {String(index + 1).padStart(3, "0")} · {formatDate(post.date)}
            </p>
            <h2>{post.title}</h2>
            <span>{post.readTime}</span>
          </Link>
        ))}
      </section>
      <SiteFooter journal />
    </main>
  );
}
