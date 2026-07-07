import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms under which this SAVON website is provided.",
};

/**
 * Placeholder terms of use. Replace with the client's reviewed legal copy
 * before launch (delivery checklist).
 */
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[65ch] px-5 pb-24 pt-28 md:pb-32 md:pt-36">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="mt-8 font-display text-5xl leading-tight md:text-6xl">
        Terms
      </h1>
      <p className="label mt-6 text-muted">Placeholder — to be reviewed</p>

      <div className="mt-12 space-y-6 text-base leading-relaxed text-ink/85">
        <p>
          These terms cover your use of this website. They are placeholder text
          and will be replaced with reviewed terms before launch.
        </p>
        <h2 className="pt-4 font-display text-2xl text-ink">This site</h2>
        <p>
          This is a brochure website. It shows our range and tells you where to
          find it; it does not sell directly. Prices shown are a guide and may
          differ between stockists.
        </p>
        <h2 className="pt-4 font-display text-2xl text-ink">
          Content &amp; imagery
        </h2>
        <p>
          The words and images here belong to us or are used with permission.
          Please do not reproduce them without asking first.
        </p>
        <h2 className="pt-4 font-display text-2xl text-ink">Changes</h2>
        <p>
          We may update these terms from time to time. The version published
          here is the one that applies.
        </p>
      </div>
    </div>
  );
}
