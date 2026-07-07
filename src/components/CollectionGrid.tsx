"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProductCard from "./ProductCard";
import {
  PRODUCTS,
  SCENT_FAMILIES,
  type Product,
  type ScentFamilyId,
} from "@/lib/products";

function isScentId(value: string | null): value is ScentFamilyId {
  return SCENT_FAMILIES.some((f) => f.id === value);
}

/**
 * Responsive product grid (2-col mobile / 4-col desktop) filtered by the
 * `?scent=` query param. The whole grid re-animates with a fade when the filter
 * changes — keyed on the active scent so it remounts. Reduced motion renders
 * cards immediately.
 */
export default function CollectionGrid() {
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const scent = searchParams.get("scent");
  const active: ScentFamilyId | "all" = isScentId(scent) ? scent : "all";

  const products: Product[] =
    active === "all"
      ? [...PRODUCTS]
      : PRODUCTS.filter((p) => p.scentFamily === active);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
        className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8 md:gap-y-16"
      >
        {products.map((product, i) => (
          <ProductCard
            key={product.slug}
            product={product}
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={i < 4}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
