import Link from "next/link";
import HeroReel from "./HeroReel";
import FadeUp from "./FadeUp";
import { PRODUCT } from "@/lib/products";

/**
 * Full-bleed hero: a seamless reel of cinematic effect/environment clips
 * crossfaded forever, with a left-aligned, vertically-centred headline block.
 * A left-to-right ink gradient keeps the copy legible while the video subject
 * stays visible on the right. Falls back to the dark packshot still under
 * reduced motion. The only priority media on the site.
 */
export default function Hero() {
  return (
    <section className="relative h-svh w-full overflow-hidden bg-ink">
      <HeroReel
        clips={PRODUCT.heroReel}
        poster={PRODUCT.images.barDark.src}
        alt={PRODUCT.images.barDark.alt}
      />

      {/* Legibility scrims: a faint full veil plus a stronger left gradient
          under the copy column. */}
      <div className="absolute inset-0 bg-ink/25" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent"
        aria-hidden
      />

      {/* Vertically-centred, left-aligned content column. */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
          <FadeUp className="max-w-xl">
            <h1 className="font-display text-5xl leading-[1.05] text-white md:text-7xl">
              Renew. Restore.
              <br />
              Reveal your best.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              Stemcell Soap — a renewal bar, made like a treatment.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/product"
                className="label inline-flex items-center gap-2 rounded-[100px] bg-white px-8 py-4 text-ink transition-colors hover:bg-primary"
              >
                Discover the soap
                <span aria-hidden>›</span>
              </Link>
              <Link
                href="/science"
                className="label inline-flex items-center rounded-[100px] border border-white/50 px-8 py-4 text-white transition-colors hover:bg-white/10"
              >
                The science
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
