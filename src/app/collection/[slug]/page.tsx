import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import Accordion from "@/components/Accordion";
import ProductCard from "@/components/ProductCard";
import FadeUp from "@/components/FadeUp";
import {
  PRODUCTS,
  formatPrice,
  getByScent,
  getProduct,
  scentName,
} from "@/lib/products";

type Params = { slug: string };

/** Statically generate a page for every product slug (§3, SSG everything). */
export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = product.name;
  const description = `${product.summary} ${scentName(product.scentFamily)}. Cold-pressed and cured sixty days.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getByScent(product.scentFamily)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const accordionItems = [
    {
      title: "Ingredients",
      content: (
        <ul className="space-y-1">
          {product.inci.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ),
    },
    { title: "The Ritual", content: <p>{product.ritual}</p> },
    { title: "Provenance & Curing", content: <p>{product.provenance}</p> },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collection", href: "/collection" },
          { label: product.name },
        ]}
      />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: stacked image column */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Right: sticky info panel */}
        <div className="md:sticky md:top-28 md:h-fit">
          <p className="label text-muted">{scentName(product.scentFamily)}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base text-muted">
            {formatPrice(product.price)}
          </p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-ink/80">
            <p>{product.story[0]}</p>
            <p>{product.story[1]}</p>
          </div>

          {/* CTA row — brochure site, no cart (§4.1 D3) */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="label bg-ink px-8 py-4 text-white transition-colors hover:bg-primary hover:text-ink"
            >
              Find a stockist
            </Link>
            <Link
              href={`/contact?product=${product.slug}`}
              className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
            >
              Enquire
            </Link>
          </div>

          <div className="mt-12">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="mt-28 md:mt-40">
          <FadeUp className="mb-10 border-b border-line pb-5">
            <p className="label text-muted">You may also like</p>
          </FadeUp>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8">
            {related.map((p, i) => (
              <FadeUp key={p.slug} index={i}>
                <ProductCard
                  product={p}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </FadeUp>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
