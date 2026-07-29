"use client";

import { useState } from "react";
import { SocialIcon } from "@/components/social-icon";

export function DiscordButton({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyHandle = async () => {
    try {
      await navigator.clipboard.writeText("danhues");
    } catch {
      const field = document.createElement("textarea");
      field.value = "danhues";
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      className={className}
      type="button"
      onClick={copyHandle}
      aria-label="Copy DanHues Discord username"
    >
      {compact && <SocialIcon platform="discord" />}
      <span>
        {copied ? "Copied!" : compact ? "Discord" : "Copy Discord"}
        <small>{copied ? "danhues is on your clipboard" : "danhues"}</small>
      </span>
    </button>
  );
}
