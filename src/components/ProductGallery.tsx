import Image from "next/image";
import type { ProductImage } from "@/lib/products";
import { blurFor } from "@/lib/blur";

/**
 * Product image column: 2–3 images stacked vertically. On desktop the reader
 * scrolls through this column while the info panel beside it stays in view
 * (the info panel owns the sticky behaviour on the detail page).
 */
export default function ProductGallery({
  images,
  name,
}: {
  images: ProductImage[];
  name: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="relative aspect-[4/5] w-full overflow-hidden bg-primary-2"
        >
          <Image
            src={img.src}
            alt={i === 0 ? `${name} soap bar` : img.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={blurFor(img.src)}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
