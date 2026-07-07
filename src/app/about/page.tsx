import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "About",
  description:
    "How SAVON came to be, how the soap is made — saponification and a sixty-day cure — and the choices behind it: palm-free, plastic-free, cold process.",
};

const TIMELINE = [
  {
    n: "01",
    title: "Mix",
    body: "Oils and a lye solution are combined at low heat. This is saponification — the reaction that turns oil into soap.",
  },
  {
    n: "02",
    title: "Pour & set",
    body: "The batch is poured into wooden moulds and left overnight to set into a solid block.",
  },
  {
    n: "03",
    title: "Cut & stamp",
    body: "The block is cut into bars by hand and stamped. Each bar is weighed so the range stays consistent.",
  },
  {
    n: "04",
    title: "Cure sixty days",
    body: "Bars rest on open racks for two months. Water leaves, the bar hardens, and the scent settles.",
  },
];

const SUSTAINABILITY = [
  {
    title: "Palm-free",
    body: "We use olive, coconut, and shea in place of palm oil. No exceptions, no certified-sustainable caveats — simply none.",
  },
  {
    title: "Plastic-free",
    body: "Bars ship in a paper band and a recycled box. There is no film, no bottle, and nothing to throw away that will outlast you.",
  },
  {
    title: "Cold process",
    body: "Making soap cold rather than hot uses less energy and keeps the oils intact. It is slower. We think it is worth it.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Full-bleed image band */}
      <section className="relative h-[60svh] w-full overflow-hidden bg-primary-2 md:h-[70svh]">
        <Image
          src="/images/about-hero.svg"
          alt="The workshop where the soap is made, lit by morning light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/40 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto max-w-[1400px]">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "About" }]}
            />
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-white md:text-7xl">
              A small workshop, one recipe at a time.
            </h1>
          </div>
        </div>
      </section>

      {/* Founder story — single text column */}
      <section className="mx-auto max-w-2xl px-5 py-24 md:py-32">
        <FadeUp>
          <p className="label mb-8 text-muted">The beginning</p>
          <div className="space-y-6 text-lg leading-relaxed text-ink/85">
            <p>
              SAVON began on a stovetop, with a single pot and a recipe copied
              from a library book. The first bars were uneven and smelled of
              almost nothing. We kept the ones that worked and gave the rest
              away.
            </p>
            <p>
              A decade on, the workshop is larger and the range has grown, but
              the method has not changed. We still press oils cold, still pour by
              hand, and still wait the full sixty days. Patience is the only
              ingredient we cannot buy.
            </p>
            <p>
              We make soap for people who read labels — who would rather have a
              short list of things they recognise than a long one they do not.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* 50/50 split — portrait + pull quote */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <FadeUp className="relative aspect-[4/5] w-full overflow-hidden bg-primary-2">
            <Image
              src="/images/about-portrait.svg"
              alt="The founder at the workbench, cutting a block of cured soap"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>
          <FadeUp index={1}>
            <p className="font-display text-3xl leading-snug md:text-4xl">
              &ldquo;A good bar of soap should ask nothing of you but to use it,
              and last longer than you expect.&rdquo;
            </p>
            <p className="label mt-8 text-muted">The founder</p>
          </FadeUp>
        </div>
      </section>

      {/* The process — numbered vertical timeline with hairline connectors */}
      <section className="mx-auto max-w-3xl px-5 pb-24 md:pb-32">
        <FadeUp>
          <p className="label mb-3 text-muted">The process</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            From oil to bar, in four steps.
          </h2>
        </FadeUp>

        <ol className="mt-14">
          {TIMELINE.map((step, i) => (
            <FadeUp
              key={step.n}
              as="li"
              index={i}
              className="relative flex gap-8 pb-12 last:pb-0"
            >
              {/* Hairline connector down the left edge, drawn between markers */}
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl leading-none text-ink">
                  {step.n}
                </span>
                {i < TIMELINE.length - 1 && (
                  <span
                    aria-hidden
                    className="mt-4 w-px flex-1 bg-line"
                  />
                )}
              </div>
              <div className="pb-2">
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-md text-base text-muted">{step.body}</p>
              </div>
            </FadeUp>
          ))}
        </ol>
      </section>

      {/* Sustainability — three columns, in the single pale-yellow band */}
      <section className="bg-primary-2 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <p className="label mb-3 text-muted">What we leave out</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Restraint, as a rule.
            </h2>
          </FadeUp>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
            {SUSTAINABILITY.map((col, i) => (
              <FadeUp
                key={col.title}
                index={i}
                className="border-t border-line pt-6"
              >
                <h3 className="font-display text-2xl">{col.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/80">
                  {col.body}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-line">
        <FadeUp className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center md:px-10 md:py-20">
          <p className="font-display text-3xl md:text-4xl">
            See what we make.
          </p>
          <Link
            href="/collection"
            className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
          >
            View the collection
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}
