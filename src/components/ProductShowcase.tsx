import Image from "next/image";
import Link from "next/link";
import FadeUp from "./FadeUp";
import { PRODUCT } from "@/lib/products";

/**
 * The packshot moment: carton render left, story and key-ingredient index
 * right. Carries the reader toward the full product page.
 */
export default function ProductShowcase() {
  return (
    <section className="bg-bg px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <FadeUp className="relative aspect-square w-full overflow-hidden bg-primary-2">
          <Image
            src={PRODUCT.images.boxFront.src}
            alt={PRODUCT.images.boxFront.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </FadeUp>

        <FadeUp index={1} className="max-w-lg">
          <p className="label mb-8 text-muted">The Soap</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            One bar. A month of renewal.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            {PRODUCT.summary}
          </p>

          <ul className="mt-10 border-t border-line">
            {PRODUCT.keyIngredients.map((ingredient) => (
              <li
                key={ingredient.name}
                className="flex items-baseline justify-between gap-6 border-b border-line py-3"
              >
                <span className="label text-ink">{ingredient.name}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/product"
              className="label bg-ink px-8 py-4 text-white transition-colors hover:bg-primary hover:text-ink"
            >
              Explore the soap
            </Link>
            <span className="label text-muted">
              {PRODUCT.netContent.box}
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
