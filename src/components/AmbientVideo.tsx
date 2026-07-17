import Image from "next/image";

interface AmbientVideoProps {
  /** MP4 under /public. */
  src: string;
  /** Poster / reduced-motion fallback image under /public. */
  poster: string;
  alt: string;
  className?: string;
  /** Give the fallback Image priority (hero only). */
  priority?: boolean;
  /** next/image sizes hint for the poster fallback. */
  sizes?: string;
}

/**
 * Decorative background video: autoplaying, muted, looped, with a static
 * image fallback. The video is hidden for prefers-reduced-motion users, who
 * see the still instead - no JS needed, both layers are absolutely filled.
 */
export default function AmbientVideo({
  src,
  poster,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
}: AmbientVideoProps) {
  return (
    <div className={["absolute inset-0 overflow-hidden", className].join(" ")}>
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
