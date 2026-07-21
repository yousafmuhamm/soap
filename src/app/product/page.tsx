import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Accordion from "@/components/Accordion";
import FadeUp from "@/components/FadeUp";
import { GALLERY, PRODUCT } from "@/lib/products";

export const metadata: Metadata = {
  title: `${PRODUCT.name}: ${PRODUCT.tagline}`,
  description: PRODUCT.summary,
  openGraph: {
    title: PRODUCT.name,
    description: PRODUCT.summary,
    images: [{ url: PRODUCT.images.boxFront.src }],
  },
};

/**
 * /product - the single product's information page: stacked gallery on the
 * left, sticky detail panel on the right, formulation accordion anchored at
 * #formulation, then the six-ingredient science index.
 */
export default function ProductPage() {
  const accordionItems = [
    {
      title: "Key Ingredients",
      content: (
        <ul className="space-y-3">
          {PRODUCT.keyIngredients.map((ingredient) => (
            <li key={ingredient.name}>
              <span className="font-medium text-ink">{ingredient.name}.</span>{" "}
              {ingredient.benefit}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Full Ingredients (INCI)",
      content: <p>{PRODUCT.inci.join(", ")}.</p>,
    },
    { title: "Directions for Use", content: <p>{PRODUCT.directions}</p> },
    { title: "Storage & Care", content: <p>{PRODUCT.storage}</p> },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: PRODUCT.name },
        ]}
      />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: stacked image column */}
        <div className="flex flex-col gap-4 md:gap-6">
          {GALLERY.map((img, i) =>
            img.width && img.height ? (
              // Rendered at its native aspect ratio - no crop.
              <div key={img.src} className="relative w-full bg-primary-2">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <div
                key={img.src}
                className="relative aspect-[4/5] w-full overflow-hidden bg-primary-2"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Wholesale spec chip on the lead packshot. */}
                {i === 0 && (
                  <div className="glass absolute bottom-5 left-5 flex flex-wrap gap-x-6 gap-y-1 px-6 py-4">
                    <span className="label text-ink">{PRODUCT.netContent.bar} bar</span>
                    <span className="label text-ink">{PRODUCT.netContent.box}</span>
                    <span className="label text-ink">
                      {PRODUCT.inci.length} ingredients
                    </span>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Right: sticky info panel */}
        <div className="md:sticky md:top-28 md:h-fit">
          <p className="label text-muted">Yeong Won, Fountain of Youth</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            {PRODUCT.name}
          </h1>
          <p className="mt-3 label text-primary-ink">{PRODUCT.tagline}</p>
          <p className="mt-6 text-base text-muted">
            {PRODUCT.netContent.bar} bar · {PRODUCT.netContent.box} per coffret
          </p>

          <div className="mt-8 text-base leading-relaxed text-ink/80">
            <p>
              Built around a single conviction: the first step of a
              skincare ritual should work as hard as the last. The result is a
              cleanse that behaves like a treatment: skin feels supple rather
              than stripped, tone brighter, texture more refined.
            </p>
          </div>

          {/* Benefit index */}
          <ul className="mt-10 border-t border-line">
            {PRODUCT.benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="border-b border-line py-3 text-sm text-ink"
              >
                {benefit.title}
              </li>
            ))}
          </ul>

          {/* CTA row - brochure site, no cart */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="label bg-ink px-8 py-4 text-white transition-colors hover:bg-primary hover:text-ink"
            >
              Find a stockist
            </Link>
            <Link
              href={`/contact?product=${PRODUCT.slug}`}
              className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
            >
              Enquire
            </Link>
          </div>

          <div id="formulation" className="mt-12 scroll-mt-28">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>

      {/* Science index */}
      <section className="mt-28 md:mt-40">
        <FadeUp className="mb-10 flex items-end justify-between border-b border-line pb-5">
          <p className="label text-muted">The Science Beyond Youthful Skin</p>
          <Link
            href="/science"
            className="label text-ink transition-opacity hover:opacity-60"
          >
            Read the science
          </Link>
        </FadeUp>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {PRODUCT.keyIngredients.map((ingredient, i) => (
            <FadeUp key={ingredient.name} index={i % 3}>
              <span className="font-display text-xl text-primary-ink">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-2xl">{ingredient.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {ingredient.benefit}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
