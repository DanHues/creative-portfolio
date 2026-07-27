import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">YOUR NAME<span>®</span></Link>
      <nav aria-label="Main navigation">
        <Link href="/archive">Archive</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/#about">About</Link>
      </nav>
      <a className="availability" href="mailto:hello@example.com"><i /> Available for select projects</a>
    </header>
  );
}

export function SiteFooter({ journal = false }: { journal?: boolean }) {
  return (
    <footer>
      <p>{journal ? "Want to keep in touch?" : "Have a strange idea?"}</p>
      <a href="mailto:hello@example.com">{journal ? "Say hello." : "Let’s make it real."} ↗</a>
      <div><span>© 2026 Your Name</span><span>Instagram · YouTube · TikTok</span></div>
    </footer>
  );
}
