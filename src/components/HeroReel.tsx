"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeroReelProps {
  /** MP4 playlist under /public, crossfaded in order, looping forever. */
  clips: readonly string[];
  /** Static fallback (reduced motion, video failure, first paint). */
  poster: string;
  alt: string;
}

/** Crossfade length. Clips are ~5 s, so the swap begins ~1.2 s before the end. */
const FADE_MS = 1200;
const FADE_S = FADE_MS / 1000;

interface NetworkInformation {
  effectiveType?: string;
  saveData?: boolean;
}

/**
 * Seamless ambient hero reel: two stacked <video> buffers. The hidden buffer
 * preloads the next clip; just before the visible clip ends, the hidden one
 * starts playing and fades in over it. Reduced-motion users see the poster.
 */
export default function HeroReel({ clips, poster, alt }: HeroReelProps) {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  /** Which buffer is currently visible. */
  const [front, setFront] = useState<"a" | "b">("a");
  /** Position in the playlist of the clip now in front. */
  const posRef = useRef(0);
  const swappingRef = useRef(false);
  const retireTimerRef = useRef<number | null>(null);

  // Start the reel: clip 0 plays in A, clip 1 preloads in B.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    if (
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
    ) {
      return;
    }

    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b || clips.length === 0) return;
    a.preload = "auto";
    a.src = clips[0];

    const preloadNext = () => {
      if (clips.length <= 1 || b.src) return;
      b.preload = "auto";
      b.src = clips[1 % clips.length];
      b.load();
    };

    a.addEventListener("playing", preloadNext, { once: true });
    a.play().catch(() => {});
    return () => a.removeEventListener("playing", preloadNext);
  }, [clips]);

  useEffect(
    () => () => {
      if (retireTimerRef.current !== null) {
        window.clearTimeout(retireTimerRef.current);
      }
    },
    [],
  );

  // Watch the front buffer; as it nears its end, fade the back buffer in.
  useEffect(() => {
    if (clips.length < 2) return;
    const frontEl = (front === "a" ? videoA : videoB).current;
    const backEl = (front === "a" ? videoB : videoA).current;
    if (!frontEl || !backEl) return;
    swappingRef.current = false;

    const swap = () => {
      if (swappingRef.current) return;
      swappingRef.current = true;
      backEl.currentTime = 0;
      backEl.play().catch(() => {});
      setFront(front === "a" ? "b" : "a");
      // Once the fade finishes, retire the old clip and preload the one after.
      retireTimerRef.current = window.setTimeout(() => {
        frontEl.pause();
        posRef.current = (posRef.current + 1) % clips.length;
        frontEl.preload = "auto";
        frontEl.src = clips[(posRef.current + 1) % clips.length];
        frontEl.load();
      }, FADE_MS);
    };

    const onTime = () => {
      const remaining = frontEl.duration - frontEl.currentTime;
      if (Number.isFinite(remaining) && remaining <= FADE_S) swap();
    };

    // Resume the reel if the browser paused it while the tab was hidden.
    const onVisible = () => {
      if (!document.hidden && frontEl.paused) frontEl.play().catch(() => {});
    };

    frontEl.addEventListener("timeupdate", onTime);
    frontEl.addEventListener("ended", swap);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      frontEl.removeEventListener("timeupdate", onTime);
      frontEl.removeEventListener("ended", swap);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [front, clips]);

  const videoClass = (visible: boolean) =>
    [
      "absolute inset-0 h-full w-full object-cover transition-opacity ease-linear motion-reduce:hidden",
      visible ? "opacity-100" : "opacity-0",
    ].join(" ");

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <video
        ref={videoA}
        muted
        playsInline
        preload="none"
        aria-hidden
        style={{ transitionDuration: `${FADE_MS}ms` }}
        className={videoClass(front === "a")}
      />
      <video
        ref={videoB}
        muted
        playsInline
        preload="none"
        aria-hidden
        style={{ transitionDuration: `${FADE_MS}ms` }}
        className={videoClass(front === "b")}
      />
    </div>
  );
}
