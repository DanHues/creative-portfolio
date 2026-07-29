export function SocialIcon({
  platform,
}: {
  platform: "tiktok" | "youtube" | "instagram" | "discord";
}) {
  if (platform === "tiktok") {
    return (
      <svg className="social-mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.2 3v11.1a3.8 3.8 0 1 1-3.3-3.8" />
        <path d="M13.2 3c.5 3.1 2.4 4.8 5.3 5" />
      </svg>
    );
  }

  if (platform === "youtube") {
    return (
      <svg className="social-mark" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="m10 9 5 3-5 3Z" className="social-mark-fill" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg className="social-mark" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.9" r=".8" className="social-mark-fill" />
      </svg>
    );
  }

  return (
    <svg className="social-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 7.2A13 13 0 0 1 12 6.3a13 13 0 0 1 4.8.9c1.2 1.7 1.9 3.8 2.1 6.1a11.2 11.2 0 0 1-3.2 2.2l-.8-1.1c.6-.2 1.1-.5 1.6-.8a9.6 9.6 0 0 1-9 0c.5.3 1 .6 1.6.8l-.8 1.1a11.2 11.2 0 0 1-3.2-2.2c.2-2.3.9-4.4 2.1-6.1Z" />
      <circle cx="9.4" cy="11.3" r="1.15" className="social-mark-fill" />
      <circle cx="14.6" cy="11.3" r="1.15" className="social-mark-fill" />
    </svg>
  );
}
