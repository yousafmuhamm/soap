import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FadeUp from "@/components/FadeUp";
import { PRODUCT } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our House",
  description:
    "The story of Yeong Won — Fountain of Youth. Why we make one soap, how it is formulated, and the standards behind every 70 g bar.",
};

const PILLARS = [
  {
    title: "One product",
    body: "We do not make a range. Every hour of formulation, testing and refinement goes into a single bar — so the bar has to earn it.",
  },
  {
    title: "Treatment-grade actives",
    body: "Niacinamide, snail secretion filtrate, plant stem cell culture extract, collagen — ingredients chosen from the serum shelf, not the soap aisle.",
  },
  {
    title: "Honest claims",
    body: "The carton says helps, supports, promotes — and means it. No miracle verbs, no before-and-after theatre. The skin decides.",
  },
];

const TIMELINE = [
  {
    n: "01",
    title: "Formulate",
    body: "The active complex — stem cell culture extract, snail filtrate, niacinamide and collagen — is blended into a palm-soap base with glycerin.",
  },
  {
    n: "02",
    title: "Fold",
    body: "Oat kernel flour, milk proteins and aloe are folded through at low temperature to protect the actives.",
  },
  {
    n: "03",
    title: "Press & cure",
    body: "Each 70 g bar is pressed dense, then rested until the lather is slow and cream-like.",
  },
  {
    n: "04",
    title: "Seal",
    body: "Bars are sealed individually and boxed in coffrets of ten — a daily ritual, a month at a time.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Full-bleed image band */}
      <section className="relative h-[60svh] w-full overflow-hidden bg-primary-2 md:h-[70svh]">
        <Image
          src={PRODUCT.images.ingredients.src}
          alt={PRODUCT.images.ingredients.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/50 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto max-w-[1400px]">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Our House" }]}
            />
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-white md:text-7xl">
              Yeong Won. Eternal, by intention.
            </h1>
          </div>
        </div>
      </section>

      {/* House story — single text column */}
      <section className="mx-auto max-w-2xl px-5 py-24 md:py-32">
        <FadeUp>
          <p className="label mb-8 text-muted">The beginning</p>
          <div className="space-y-6 text-lg leading-relaxed text-ink/85">
            <p>
              Yeong Won — 영원 — is the Korean word for eternal. The house was
              founded on a simple observation: people invest in serums and
              creams, then undo the work with a cleanser that strips
              everything it touches.
            </p>
            <p>
              So we started where skincare actually starts. One bar, built
              like a treatment — plant stem cell culture extract for
              resilience, snail filtrate for repair, niacinamide for tone,
              collagen for bounce, oat and milk so the cleanse itself stays
              gentle.
            </p>
            <p>
              We make nothing else. When one product carries the name, the
              name has to be earned every batch.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* 50/50 split — portrait + pull quote */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <FadeUp className="relative aspect-[4/5] w-full overflow-hidden bg-primary-2">
            <Image
              src={PRODUCT.images.portrait.src}
              alt={PRODUCT.images.portrait.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeUp>
          <FadeUp index={1}>
            <p className="font-display text-3xl leading-snug md:text-4xl">
              &ldquo;The fountain of youth is not a place. It is a habit,
              kept morning and evening.&rdquo;
            </p>
            <p className="label mt-8 text-muted">The House of Yeong Won</p>
          </FadeUp>
        </div>
      </section>

      {/* The process — numbered vertical timeline */}
      <section className="mx-auto max-w-3xl px-5 pb-24 md:pb-32">
        <FadeUp>
          <p className="label mb-3 text-muted">The process</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            From active to bar, in four steps.
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
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl leading-none text-primary">
                  {step.n}
                </span>
                {i < TIMELINE.length - 1 && (
                  <span aria-hidden className="mt-4 w-px flex-1 bg-line" />
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

      {/* Standards — three columns in the pale band */}
      <section className="bg-primary-2 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <p className="label mb-3 text-muted">What we stand on</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Three rules, no exceptions.
            </h2>
          </FadeUp>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
            {PILLARS.map((col, i) => (
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
            href="/product"
            className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
          >
            Explore {PRODUCT.name}
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}
