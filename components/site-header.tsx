import { BackToTop } from "@/components/back-to-top";
import { ScrollHeader } from "@/components/scroll-header";

export function SiteHeader() {
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <>
      <ScrollHeader basePath={basePath} />
      <BackToTop />
    </>
  );
}

export function SiteFooter({ journal = false }: { journal?: boolean }) {
  return (
    <footer>
      <p>{journal ? "Want to keep in touch?" : "Have a strange idea?"}</p>
      <a href="mailto:hello@example.com">
        {journal ? "Say hello." : "Let’s make it real."}
      </a>
      <div>
        <span>© 2026 DanHues</span>
        <span>Photography · Worlds · Film · Design · Code</span>
      </div>
    </footer>
  );
}
