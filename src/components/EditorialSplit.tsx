import Image from "next/image";
import Link from "next/link";
import FadeUp from "./FadeUp";
import { PRODUCT } from "@/lib/products";

/**
 * Editorial split: a 50/50 image and text block that carries the reader toward
 * the about page. Image left, text right on desktop; stacked on mobile.
 */
export default function EditorialSplit() {
  return (
    <section className="bg-bg px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <FadeUp className="relative aspect-[4/5] w-full overflow-hidden bg-primary-2">
          <Image
            src={PRODUCT.images.portrait.src}
            alt={PRODUCT.images.portrait.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </FadeUp>

        <FadeUp index={1} className="max-w-md">
          <p className="label mb-8 text-muted">Fountain of Youth</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            Skin that looks the way it feels — rested.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            We believe renewal is not a promise on a jar, it is a habit. A bar
            that treats while it cleanses turns the least glamorous step of
            skincare into the one your skin waits for.
          </p>
          <Link
            href="/about"
            className="label mt-8 inline-block border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
          >
            The story of Yeong Won
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
