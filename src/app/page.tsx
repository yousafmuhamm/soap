import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import BenefitTrio from "@/components/BenefitTrio";
import ProductShowcase from "@/components/ProductShowcase";
import ScienceGrid from "@/components/ScienceGrid";
import RitualBand from "@/components/RitualBand";
import EditorialSplit from "@/components/EditorialSplit";
import CtaStrip from "@/components/CtaStrip";

/**
 * Home page — the single-product narrative, top to bottom:
 * Hero (ambient video) → Brand statement → Benefits → Product showcase →
 * Science grid → Ritual band → Editorial split → CTA strip.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <BenefitTrio />
      <ProductShowcase />
      <ScienceGrid />
      <RitualBand />
      <EditorialSplit />
      <CtaStrip />
    </>
  );
}
