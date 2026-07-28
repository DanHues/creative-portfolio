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
        <p className="eyebrow">
          {journal ? "You made it to the margins" : "The next strange idea"}
        </p>
        <h2>
          Bring me the <em>half-formed idea.</em>
        </h2>
        <p>
          A world, a product, a story, or something without a name yet. Pick
          the door that feels right.
        </p>
      </div>

      <div className="contact-paths">
        <DiscordButton className="contact-path contact-path-primary" />
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
        <Link className="contact-path" href="/archive">
          <span>
            Explore before you knock
            <small>Wander through the project archive</small>
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
