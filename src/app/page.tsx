import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import FeaturedCollection from "@/components/FeaturedCollection";
import CraftBand from "@/components/CraftBand";
import EditorialSplit from "@/components/EditorialSplit";
import CtaStrip from "@/components/CtaStrip";

/**
 * Home page — six sections in the master-plan §3 order:
 * Hero → Brand statement → Featured collection → Craft band → Editorial split
 * → CTA strip. Each section reveals once on scroll via FadeUp.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <FeaturedCollection />
      <CraftBand />
      <EditorialSplit />
      <CtaStrip />
    </>
  );
}
