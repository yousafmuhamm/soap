import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FadeUp from "@/components/FadeUp";
import { PRODUCT } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Science",
  description:
    "The science beyond youthful skin — how plant stem cell culture extract, snail extract, niacinamide, collagen, aloe vera and oatmeal & milk work together in Stemcell Soap.",
};

/**
 * /science — the carton's "Science Beyond Youthful Skin" panel, expanded into
 * a long-form editorial page: lab imagery, six ingredient chapters, and the
 * full INCI declaration.
 */
export default function SciencePage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Full-bleed lab image band */}
      <section className="relative h-[60svh] w-full overflow-hidden bg-primary-2 md:h-[70svh]">
        <Image
          src={PRODUCT.images.lab.src}
          alt={PRODUCT.images.lab.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/50 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto max-w-[1400px]">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "The Science" }]}
            />
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-white md:text-7xl">
              The science beyond youthful skin.
            </h1>
          </div>
        </div>
      </section>

      {/* Intro column */}
      <section className="mx-auto max-w-2xl px-5 py-24 md:py-32">
        <FadeUp>
          <p className="label mb-8 text-muted">The formulation</p>
          <div className="space-y-6 text-lg leading-relaxed text-ink/85">
            <p>
              Most cleansing bars are built to wash. Ours is built to treat.
              Every active in Stemcell Soap was chosen for one reason — a
              documented role in how skin renews, holds moisture, and keeps
              its tone even.
            </p>
            <p>
              Six actives, one bar. Each is listed on the carton the way we
              list it here: plainly, with the job it does. Nothing in the
              formula is decorative.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Six ingredient chapters */}
      <section className="mx-auto max-w-3xl px-5 pb-24 md:pb-32">
        <FadeUp>
          <p className="label mb-3 text-muted">Key actives</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            Six ingredients, six jobs.
          </h2>
        </FadeUp>

        <ol className="mt-14">
          {PRODUCT.keyIngredients.map((ingredient, i) => (
            <FadeUp
              key={ingredient.name}
              as="li"
              index={i}
              className="relative flex gap-8 pb-12 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl leading-none text-primary">
                  0{i + 1}
                </span>
                {i < PRODUCT.keyIngredients.length - 1 && (
                  <span aria-hidden className="mt-4 w-px flex-1 bg-line" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="font-display text-2xl">{ingredient.name}</h3>
                <p className="mt-2 max-w-md text-base font-medium text-ink/80">
                  {ingredient.benefit}
                </p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                  {ingredient.detail}
                </p>
              </div>
            </FadeUp>
          ))}
        </ol>
      </section>

      {/* Full INCI — pale band */}
      <section className="bg-primary-2 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <p className="label mb-3 text-muted">Full declaration</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Every ingredient, in order.
            </h2>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink/80">
              {PRODUCT.inci.join(", ")}.
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              {PRODUCT.storage} Net content {PRODUCT.netContent.bar} per bar,
              {" "}
              {PRODUCT.netContent.box} per coffret.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-line">
        <FadeUp className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center md:px-10 md:py-20">
          <p className="font-display text-3xl md:text-4xl">
            See the soap itself.
          </p>
          <Link
            href="/product"
            className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
          >
            Explore Stemcell Soap
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}
