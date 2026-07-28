import Link from "next/link";
import type { CreativeTag } from "@/lib/tags";

export function TagList({
  tags,
  className = "",
  linked = true,
}: {
  tags: CreativeTag[];
  className?: string;
  linked?: boolean;
}) {
  return (
    <div className={`project-tags unified-tags ${className}`.trim()}>
      {tags.map((tag) =>
        linked ? (
          <Link href={`/archive?tag=${encodeURIComponent(tag)}`} key={tag}>
            {tag}
          </Link>
        ) : (
          <span key={tag}>{tag}</span>
        ),
      )}
    </div>
  );
}
