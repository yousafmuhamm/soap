import FadeUp from "./FadeUp";
import AmbientVideo from "./AmbientVideo";
import { PRODUCT } from "@/lib/products";

const STEPS = [
  {
    n: "01",
    title: "Lather",
    body: "Work the bar between wet palms until a dense, cream-like foam forms.",
  },
  {
    n: "02",
    title: "Massage",
    body: "Sweep the lather over face and body in slow circles, letting the actives sit for a breath.",
  },
  {
    n: "03",
    title: "Rinse",
    body: "Rinse thoroughly with warm water. Morning and evening, as the first step of your ritual.",
  },
];

/**
 * The ritual: the one pale-cream band on the home page. An ambient lather
 * loop on the left, three numbered steps with hairline dividers on the right.
 */
export default function RitualBand() {
  return (
    <section className="bg-primary-2">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch md:grid-cols-2">
        <div className="relative aspect-square w-full md:aspect-auto md:min-h-[560px]">
          <AmbientVideo
            src={PRODUCT.videos.lather}
            poster={PRODUCT.images.lather.src}
            alt={PRODUCT.images.lather.alt}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="px-5 py-16 md:px-14 md:py-24">
          <FadeUp>
            <p className="label mb-10 text-muted">The Ritual</p>
          </FadeUp>
          <ol>
            {STEPS.map((step, i) => (
              <FadeUp
                key={step.n}
                as="li"
                index={i}
                className="border-t border-line py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex gap-6">
                  <span className="font-display text-2xl text-primary">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
