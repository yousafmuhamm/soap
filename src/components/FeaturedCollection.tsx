import Link from "next/link";
import FadeUp from "./FadeUp";
import ProductCard from "./ProductCard";
import { FEATURED } from "@/lib/products";

/**
 * Featured collection: label + hairline rule, then a 3-column grid (1 on mobile)
 * of product cards. Shows the first three featured bars; the full range lives on
 * /collection. Cards stagger up on scroll.
 */
export default function FeaturedCollection() {
  const products = FEATURED.slice(0, 3);

  return (
    <section className="bg-bg px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <FadeUp className="mb-12 flex items-end justify-between border-b border-line pb-5">
          <p className="label text-muted">The Collection</p>
          <Link
            href="/collection"
            className="label text-ink transition-opacity hover:opacity-60"
          >
            View all
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
          {products.map((product, i) => (
            <FadeUp key={product.slug} index={i}>
              <ProductCard
                product={product}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
