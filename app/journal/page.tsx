import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { formatDate, getPosts } from "@/lib/content";

export default function Journal() {
  const notes = getPosts();
  const basePath = process.env.PAGES_BASE_PATH || "";

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
        </div>
      </section>
      <section className="journal-list">
        <div className="journal-author-strip">
          <Image
            src={`${basePath}/dan-about.svg`}
            alt="Daniel Hughes"
            width={220}
            height={240}
          />
          <div>
            <strong>Daniel Hughes</strong>
            <span>Personal notes on making, noticing, and being here.</span>
          </div>
          <nav aria-label="Find Daniel elsewhere">
            <a
              href="https://www.tiktok.com/@danhues"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <i className="social-mark social-mark-tiktok" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@imdanhues"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <i className="social-mark social-mark-youtube" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/imdanhues/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="social-mark social-mark-instagram social-mark-instagram-alt" aria-hidden="true" />
            </a>
          </nav>
        </div>
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
            <span>{post.readTime}</span>
          </Link>
        ))}
      </section>
      <SiteFooter journal />
    </main>
  );
}
