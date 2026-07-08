import Image from "next/image";
import FadeUp from "./FadeUp";
import { blurFor } from "@/lib/blur";

const STEPS = [
  {
    n: "01",
    title: "Cold-pressed",
    body: "Oils are pressed cold and poured at low heat, so nothing in them is spoiled by warmth.",
  },
  {
    n: "02",
    title: "Cured sixty days",
    body: "Each batch rests on open racks for two months. Curing hardens the bar and settles the scent.",
  },
  {
    n: "03",
    title: "Hand-cut",
    body: "We cut and stamp every bar by hand. No two are exactly alike, and that is the point.",
  },
];

/**
 * Craft band: the one pale-yellow section on the page. Two columns — a macro
 * process image and three numbered steps with hairline dividers.
 */
export default function CraftBand() {
  return (
    <section className="bg-primary-2">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full md:aspect-auto md:min-h-[560px]">
          <Image
            src="/images/craft.jpg"
            alt="Ground botanicals and salt in ceramic bowls on a marble surface"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={blurFor("/images/craft.jpg")}
            className="object-cover"
          />
        </div>

        <div className="px-5 py-16 md:px-14 md:py-24">
          <FadeUp>
            <p className="label mb-10 text-muted">How it is made</p>
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
                  <span className="font-display text-2xl text-ink/40">
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
