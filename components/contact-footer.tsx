import Link from "next/link";
import { DiscordButton } from "@/components/discord-button";

export function ContactFooter({ journal = false }: { journal?: boolean }) {
  return (
    <footer className="contact-footer">
      <div className="contact-orbit" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="contact-intro">
        <p className="contact-kicker">Have an idea?</p>
        <h2>Let&apos;s make it a reality.</h2>
        <p>
          {journal
            ? "If something here sparked a thought, I’d love to hear it. Choose the easiest way to reach me."
            : "For collaborations, commissions, ambitious builds, or a simple hello—choose the easiest way to reach me."}
        </p>
      </div>

      <div className="contact-paths">
        <a
          className="contact-path contact-path-primary"
          href="mailto:danielhughesps@gmail.com?subject=Let%27s%20make%20something"
        >
          <span>
            Email me
            <small>For projects, collaborations, and commissions</small>
          </span>
        </a>
        <DiscordButton className="contact-path" />
        <a
          className="contact-path"
          href="https://www.instagram.com/imdanhues/"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            Send an Instagram DM
            <small>For quick hellos and visual ideas</small>
          </span>
        </a>
        <Link className="contact-path contact-project" href="/archive">
          <span>
            Explore projects
            <small>See the worlds, products, images, and ideas I’ve made real</small>
          </span>
        </Link>
      </div>

      <div className="contact-footnote">
        <span>© 2026 DanHues</span>
        <span>Photography · Worlds · Film · Design · Code</span>
      </div>
    </footer>
  );
}
