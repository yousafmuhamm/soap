import Image from "next/image";
import Link from "next/link";
import FadeUp from "./FadeUp";
import { blurFor } from "@/lib/blur";

/**
 * Full-bleed hero: a single still-life image filling the viewport, headline
 * overlaid bottom-left. Slow Ken Burns zoom on the image (motion-safe only, via
 * the Tailwind `kenburns` animation). The only priority image on the site.
 */
export default function Hero() {
  return (
    <section className="relative h-svh w-full overflow-hidden bg-primary-2">
      <div className="absolute inset-0 motion-safe:animate-kenburns">
        <Image
          src="/images/hero.jpg"
          alt="Handmade soap bars wrapped in twine, resting on wood beside dried lavender"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurFor("/images/hero.jpg")}
          className="object-cover"
        />
      </div>

      {/* Ink scrim from the bottom so the headline stays legible on any photo. */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/40 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <p className="label mb-6 text-white">Cold-pressed bar soap</p>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-8xl">
              Cured slowly, for skin.
            </h1>
            <Link
              href="/collection"
              className="label group mt-8 inline-flex w-fit items-center pb-1 text-white"
            >
              <span className="border-b-2 border-primary pb-1 transition-opacity group-hover:opacity-70">
                Discover the collection
              </span>
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
