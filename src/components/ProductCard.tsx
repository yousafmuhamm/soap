import Image from "next/image";
import Link from "next/link";
import { formatPrice, scentName, type Product } from "@/lib/products";
import { blurFor } from "@/lib/blur";

interface ProductCardProps {
  product: Product;
  /** Passed to next/image for correct responsive sizing per grid context. */
  sizes?: string;
  /** Card priority (above-the-fold grids only). */
  priority?: boolean;
}

/**
 * Product tile: image on white, name in serif, scent family in tiny caps, price
 * muted. On hover the second photo cross-fades in and the name gains a yellow
 * underline. Pure CSS hover (group-hover) — no client JS. Reused on home,
 * collection, and "you may also like".
 */
export default function ProductCard({
  product,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: ProductCardProps) {
  const [primary, secondary] = product.images;

  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-primary-2">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={blurFor(primary.src)}
          className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
        />
        {secondary && (
          <Image
            src={secondary.src}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            placeholder="blur"
            blurDataURL={blurFor(secondary.src)}
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}
      </div>

      <div className="mt-5">
        <h3 className="font-display text-2xl leading-tight">
          <span className="bg-[length:100%_1px] bg-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-primary group-hover:bg-[length:100%_2px]">
            {product.name}
          </span>
        </h3>
        <p className="label mt-2 text-muted">{scentName(product.scentFamily)}</p>
        <p className="mt-2 text-sm text-muted">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
