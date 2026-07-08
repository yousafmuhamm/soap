import Link from "next/link";
import HeroReel from "./HeroReel";
import FadeUp from "./FadeUp";
import { PRODUCT } from "@/lib/products";
import { SITE } from "@/lib/site";

/**
 * Full-bleed hero: a seamless reel of cinematic effect/environment clips —
 * ritual, glow, atmosphere — crossfaded forever. Falls back to the dark
 * packshot still under reduced motion. The only priority media on the site.
 */
export default function Hero() {
  return (
    <section className="relative h-svh w-full overflow-hidden bg-ink">
      <HeroReel
        clips={PRODUCT.heroReel}
        poster={PRODUCT.images.barDark.src}
        alt={PRODUCT.images.barDark.alt}
      />

      {/* Ink scrims: a faint full-frame veil plus a deeper bottom gradient so
          the headline stays legible on any frame of the reel. */}
      <div className="absolute inset-0 bg-ink/25" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/80 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <p className="label mb-6 text-primary">
              {SITE.name} — {SITE.descriptor}
            </p>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.05] text-white md:text-8xl">
              Renew. Restore.
              <br />
              Reveal your best.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              Stemcell Soap — a concentrated renewal bar with plant stem cell
              culture extract, snail extract, niacinamide and collagen.
            </p>
            <Link
              href="/product"
              className="label group mt-8 inline-flex w-fit items-center pb-1 text-white"
            >
              <span className="border-b-2 border-primary pb-1 transition-opacity group-hover:opacity-70">
                Discover the soap
              </span>
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
