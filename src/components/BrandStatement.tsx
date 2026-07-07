import FadeUp from "./FadeUp";

/**
 * Brand statement: one centered display-serif quote on white, framed by heavy
 * whitespace. One idea per viewport (§1).
 */
export default function BrandStatement() {
  return (
    <section className="bg-bg px-5 py-32 md:px-10 md:py-48">
      <FadeUp className="mx-auto max-w-4xl text-center">
        <p className="label mb-10 text-muted">Our making</p>
        <p className="font-display text-3xl leading-[1.25] md:text-5xl md:leading-[1.2]">
          We make bar soap the slow way. Oils pressed cold, poured by hand, and
          left to cure for sixty days on open racks. No hardeners, no colour, no
          claims. What reaches you is a bar that has taken its time.
        </p>
      </FadeUp>
    </section>
  );
}
