"use client";

import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";

export function SubpageControls({
  backHref,
  backLabel,
  showBackToTop = true,
}: {
  backHref: string;
  backLabel: string;
  showBackToTop?: boolean;
}) {
  return (
    <>
      <Link className="subpage-back" href={backHref}>
        <i aria-hidden="true" />
        {backLabel}
      </Link>
      {showBackToTop ? <BackToTop /> : null}
    </>
  );
}
