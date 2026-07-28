"use client";

import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";

export function SubpageControls({
  backHref,
  backLabel,
}: {
  backHref: string;
  backLabel: string;
}) {
  return (
    <>
      <Link className="subpage-back" href={backHref}>
        <i aria-hidden="true" />
        {backLabel}
      </Link>
      <BackToTop />
    </>
  );
}
