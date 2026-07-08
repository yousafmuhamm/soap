import FadeUp from "./FadeUp";

/**
 * Brand statement: one centered display-serif line on white, framed by heavy
 * whitespace. One idea per viewport.
 */
export default function BrandStatement() {
  return (
    <section className="bg-bg px-5 py-32 md:px-10 md:py-48">
      <FadeUp className="mx-auto max-w-4xl text-center">
        <p className="label mb-10 text-muted">The House of Yeong Won</p>
        <p className="font-display text-3xl leading-[1.25] md:text-5xl md:leading-[1.2]">
          Yeong Won means eternal. We make one bar of soap, and we make it the
          way a treatment is made — plant stem cell culture extract, snail
          extract, niacinamide and collagen, folded into a slow, dense lather
          of oat and milk.
        </p>
      </FadeUp>
    </section>
  );
}
