import Image from "next/image";
import FadeUp from "./FadeUp";
import { PRODUCT } from "@/lib/products";

/**
 * "What it does" — the three front-of-pack benefits, laid over a cinematic
 * skin-glow photograph as individual frosted-glass cards. Distinct from the
 * science band (single left panel) so the glass language stays cohesive
 * without repeating itself.
 */
export default function BenefitTrio() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Photographic background — luminous skin, the "effect" of the bar. */}
      <Image
        src={PRODUCT.images.skinGlow.src}
        alt={PRODUCT.images.skinGlow.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/45" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <FadeUp className="mb-12">
          <p className="label text-primary">What it does</p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRODUCT.benefits.map((benefit, i) => (
            <FadeUp key={benefit.title} index={i}>
              <div className="glass-dark h-full px-7 py-9 text-white">
                <span className="font-display text-2xl text-primary">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-snug md:text-3xl">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {benefit.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
