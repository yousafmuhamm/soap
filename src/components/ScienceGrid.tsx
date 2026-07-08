import Link from "next/link";
import FadeUp from "./FadeUp";
import { PRODUCT } from "@/lib/products";

/**
 * "The Science Beyond Youthful Skin" — the carton's six-ingredient panel as a
 * dark editorial band: 3×2 grid of ingredient entries on ink, gold numerals.
 */
export default function ScienceGrid() {
  return (
    <section className="bg-ink px-5 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <FadeUp className="mb-14 flex flex-col justify-between gap-4 border-b border-white/15 pb-5 md:flex-row md:items-end">
          <div>
            <p className="label text-primary">
              The Science Beyond Youthful Skin
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Six ingredients, chosen to work.
            </h2>
          </div>
          <Link
            href="/science"
            className="label w-fit border-b-2 border-primary pb-1 text-white transition-opacity hover:opacity-60"
          >
            Read the science
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
          {PRODUCT.keyIngredients.map((ingredient, i) => (
            <FadeUp key={ingredient.name} index={i % 3}>
              <span className="font-display text-xl text-primary/70">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-2xl">{ingredient.name}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                {ingredient.benefit}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
