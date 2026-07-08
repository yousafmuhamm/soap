import FadeUp from "./FadeUp";
import { PRODUCT } from "@/lib/products";

/**
 * Three front-of-pack benefits in a hairline-divided row. Numbers set in the
 * display serif, copy kept to a single calm sentence each.
 */
export default function BenefitTrio() {
  return (
    <section className="border-y border-line bg-bg px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <FadeUp className="mb-14 border-b border-line pb-5">
          <p className="label text-muted">What it does</p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {PRODUCT.benefits.map((benefit, i) => (
            <FadeUp key={benefit.title} index={i}>
              <span className="font-display text-2xl text-primary">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-3xl leading-snug">
                {benefit.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                {benefit.body}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
