"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type DraggableMarqueeProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  trackClassName: string;
};

export function DraggableMarquee({
  children,
  className = "",
  speed = 42,
  trackClassName,
}: DraggableMarqueeProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(1);
  const lastTimeRef = useRef<number | null>(null);
  const dragRef = useRef({
    active: false,
    baseOffset: 0,
    moved: false,
    pointerId: -1,
    startX: 0,
  });
  const hoveredRef = useRef(false);
  const visibleRef = useRef(false);
  const documentVisibleRef = useRef(true);
  const suppressClickRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);

  const wrapOffset = (value: number) => {
    const width = halfWidthRef.current;
    if (width <= 1) return value;
    return ((value % width) + width) % width - width;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const minimumFrameTime = navigator.userAgent.includes("Firefox")
      ? 1000 / 30
      : 0;
    const measure = () => {
      halfWidthRef.current = Math.max(track.scrollWidth / 2, 1);
      offsetRef.current = wrapOffset(offsetRef.current);
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    measure();
    setReady(true);

    const animate = (time: number) => {
      if (!visibleRef.current || !documentVisibleRef.current) {
        frameRef.current = null;
        lastTimeRef.current = null;
        return;
      }

      if (
        lastTimeRef.current !== null &&
        time - lastTimeRef.current < minimumFrameTime
      ) {
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      const previous = lastTimeRef.current ?? time;
      const elapsed = Math.min((time - previous) / 1000, 0.05);
      lastTimeRef.current = time;

      if (
        !dragRef.current.active &&
        !hoveredRef.current &&
        !reducedMotion.matches
      ) {
        offsetRef.current = wrapOffset(offsetRef.current - speed * elapsed);
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (
        visibleRef.current &&
        documentVisibleRef.current &&
        frameRef.current === null
      ) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting && frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
          lastTimeRef.current = null;
          return;
        }
        startAnimation();
      },
      { rootMargin: "120px 0px" },
    );

    const handleVisibility = () => {
      documentVisibleRef.current = !document.hidden;
      if (!documentVisibleRef.current && frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        lastTimeRef.current = null;
        return;
      }
      startAnimation();
    };

    observer.observe(track);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [speed]);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragRef.current = {
      active: true,
      baseOffset: offsetRef.current,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
    };
    suppressClickRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      !dragRef.current.active ||
      dragRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const movement = event.clientX - dragRef.current.startX;
    if (Math.abs(movement) > 5) dragRef.current.moved = true;
    offsetRef.current = wrapOffset(
      dragRef.current.baseOffset + movement,
    );
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      !dragRef.current.active ||
      dragRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    suppressClickRef.current = dragRef.current.moved;
    dragRef.current.active = false;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className={`drag-marquee ${ready ? "is-drag-ready" : ""} ${dragging ? "is-dragging" : ""} ${className}`.trim()}
      onClickCapture={(event) => {
        if (!suppressClickRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClickRef.current = false;
      }}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      onPointerCancel={endDrag}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      ref={shellRef}
    >
      <div className={trackClassName} ref={trackRef}>
        {children}
      </div>
    </div>
  );
}
