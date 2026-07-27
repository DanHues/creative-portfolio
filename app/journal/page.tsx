import Link from "next/link";
import { formatDate, getPosts } from "@/lib/content";

export default function Journal() {
  const notes = getPosts();
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="/">YOUR NAME<span>®</span></Link>
        <nav><Link href="/archive">Archive</Link><Link href="/journal">Journal</Link><Link href="/#about">About</Link></nav>
        <a className="availability" href="mailto:hello@example.com"><i /> Available for select projects</a>
      </header>
      <section className="page-intro">
        <p className="eyebrow">Notes on being here</p>
        <h1>Journal</h1>
        <p>Thoughts on creativity, technology, attention, life, and whatever else keeps tapping me on the shoulder.</p>
      </section>
      <section className="journal-list">
        {notes.map((post,i) => (
          <Link href={`/journal/${post.slug}`} className="note" key={post.slug}>
            <p>Note {String(i+1).padStart(3,"0")} · {formatDate(post.date)}</p><h2>{post.title}</h2><span>{post.readTime} ↗</span>
          </Link>
        ))}
      </section>
      <footer><p>Want to keep in touch?</p><a href="mailto:hello@example.com">Say hello. ↗</a><div><span>© 2026 Your Name</span><span>Instagram · YouTube · TikTok</span></div></footer>
    </main>
  );
}
