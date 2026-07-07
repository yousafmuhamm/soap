import Link from "next/link";
import FadeUp from "./FadeUp";

/**
 * Thin CTA strip: stockist message and a contact link, framed by hairline rules
 * top and bottom. The brochure-site call to action (no cart, §4.1 D3).
 */
export default function CtaStrip() {
  return (
    <section className="border-y border-line bg-bg">
      <FadeUp className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center md:px-10 md:py-20">
        <p className="font-display text-3xl md:text-4xl">Stockists worldwide.</p>
        <Link
          href="/contact"
          className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
        >
          Find a stockist
        </Link>
      </FadeUp>
    </section>
  );
}
