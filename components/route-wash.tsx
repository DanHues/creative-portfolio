"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteWash() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    const frame = requestAnimationFrame(() => setActive(true));
    const timer = window.setTimeout(() => setActive(false), 950);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div className={`route-wash${active ? " active" : ""}`} aria-hidden="true">
      <span />
      <span />
    </div>
  );
}
