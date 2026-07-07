import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ScentFilter from "@/components/ScentFilter";
import CollectionGrid from "@/components/CollectionGrid";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Eight cold-pressed bar soaps across three scent families — citrus and herb, woods and amber, milk and oat. All cured sixty days.",
};

/**
 * /collection — page header, scent-family filter, and the full product grid.
 * Filter + grid read the ?scent query param and are wrapped in Suspense as
 * Next requires for useSearchParams during static rendering.
 */
export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <FadeUp>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Collection" }]} />
        <h1 className="mt-8 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
          The collection
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted">
          Eight bars, three scent families, one method. Everything here is
          cold-pressed and cured for sixty days.
        </p>
      </FadeUp>

      <div className="mt-14 border-b border-line pb-5 md:mt-20">
        <Suspense fallback={<div className="label text-muted">Loading filter…</div>}>
          <ScentFilter />
        </Suspense>
      </div>

      <div className="mt-12 md:mt-16">
        <Suspense fallback={null}>
          <CollectionGrid />
        </Suspense>
      </div>
    </div>
  );
}
