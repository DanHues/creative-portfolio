import { ContactFooter } from "@/components/contact-footer";
import { ScrollHeader } from "@/components/scroll-header";

export function SiteHeader() {
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <ScrollHeader basePath={basePath} />
  );
}

export function SiteFooter({ journal = false }: { journal?: boolean }) {
  return <ContactFooter journal={journal} />;
}
