import Image from "next/image";
import Link from "next/link";
import FadeUp from "./FadeUp";
import { PRODUCT } from "@/lib/products";

/**
 * "The Science Beyond Youthful Skin" - a cinematic photographic band with a
 * frosted-glass panel floating over it. The panel carries only the six active
 * NAMES; the full benefit copy lives on /science, so this reads as image-first
 * rather than a wall of text.
 */
export default function ScienceGrid() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Photographic background */}
      <Image
        src={PRODUCT.images.lab.src}
        alt={PRODUCT.images.lab.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" aria-hidden />

      <div className="relative mx-auto flex min-h-[80svh] max-w-[1400px] items-center px-5 py-24 md:px-10 md:py-32">
        <FadeUp className="glass-dark w-full max-w-xl px-7 py-9 text-white md:px-11 md:py-12">
          <p className="label text-primary">
            The Science Beyond Youthful Skin
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Six actives, six jobs.
          </h2>

          <ul className="mt-9 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {PRODUCT.keyIngredients.map((ingredient, i) => (
              <li
                key={ingredient.name}
                className="flex items-baseline gap-4 border-t border-white/15 py-3.5"
              >
                <span className="font-display text-base text-primary/80">
                  0{i + 1}
                </span>
                <span className="text-sm tracking-wide text-white/90">
                  {ingredient.name}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/science"
            className="label mt-9 inline-flex w-fit items-center text-white"
          >
            <span className="border-b-2 border-primary pb-1 transition-opacity hover:opacity-70">
              Read the science
            </span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
