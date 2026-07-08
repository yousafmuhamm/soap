import Link from "next/link";
import FadeUp from "./FadeUp";

/**
 * Thin CTA strip: enquiry message and a contact link, framed by hairline rules
 * top and bottom. The brochure-site call to action (no cart).
 */
export default function CtaStrip() {
  return (
    <section className="border-y border-line bg-bg">
      <FadeUp className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center md:px-10 md:py-20">
        <p className="font-display text-3xl md:text-4xl">
          Reveal your best.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="label bg-ink px-8 py-4 text-white transition-colors hover:bg-primary hover:text-ink"
          >
            Find a stockist
          </Link>
          <Link
            href="/contact?subject=wholesale"
            className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
          >
            Wholesale enquiries
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
