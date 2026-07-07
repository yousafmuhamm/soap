/**
 * Product catalogue — the only data store in v1 (§4.1 D2, no CMS).
 * 8 soaps across 3 scent families. Image paths point at public/images/products/*;
 * real photography is sourced and dropped in during Phase 5.
 */

export type ScentFamilyId = "citrus-herb" | "woods-amber" | "milk-oat";

export interface ScentFamily {
  id: ScentFamilyId;
  name: string;
}

export const SCENT_FAMILIES: ReadonlyArray<ScentFamily> = [
  { id: "citrus-herb", name: "Citrus & Herb" },
  { id: "woods-amber", name: "Woods & Amber" },
  { id: "milk-oat", name: "Milk & Oat" },
];

export interface ProductImage {
  /** Path under /public. Placeholder until Phase 5 sourcing. */
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  scentFamily: ScentFamilyId;
  /** Price in CAD, whole dollars. Display-only (no checkout, §4.1 D3). */
  price: number;
  /** One-line summary for cards and meta descriptions. */
  summary: string;
  /** Two-paragraph story for the detail page. */
  story: [string, string];
  /** Full INCI list, in descending order of inclusion. */
  inci: string[];
  /** How-to-use ritual copy. */
  ritual: string;
  /** Provenance & curing note. */
  provenance: string;
  /** 2–3 images: [0] is the card default, [1] the hover swap. */
  images: ProductImage[];
  /** Surfaced in the home "Featured collection" section. */
  featured?: boolean;
}

export const PRODUCTS: ReadonlyArray<Product> = [
  {
    slug: "lemon-verbena",
    name: "Lemon Verbena",
    scentFamily: "citrus-herb",
    price: 18,
    summary: "Sharp lemon, cut with green verbena leaf.",
    story: [
      "We press cold lemon peel and steep verbena leaf in olive oil for a week before the batch is made. The result is bright without being sweet — the smell of a kitchen garden in July.",
      "Each bar is cut by hand and cured on open racks for sixty days. Curing hardens the soap and mellows the scent, so what reaches you is settled rather than raw.",
    ],
    inci: [
      "Sodium Olivate",
      "Sodium Cocoate",
      "Aqua",
      "Sodium Shea Butterate",
      "Glycerin",
      "Citrus Limon Peel Oil",
      "Aloysia Citrodora Leaf Oil",
    ],
    ritual:
      "Lather between wet palms, then work over skin. A morning bar — the citrus wakes you up. Store on a draining dish between uses so it lasts.",
    provenance:
      "Made in small batches, cold-pressed, and cured sixty days before it leaves the workshop.",
    images: [
      { src: "/images/products/lemon-verbena-1.svg", alt: "Lemon Verbena soap bar on a pale stone surface" },
      { src: "/images/products/lemon-verbena-2.svg", alt: "Lemon Verbena soap bar shown from the side" },
    ],
    featured: true,
  },
  {
    slug: "bergamot-rosemary",
    name: "Bergamot & Rosemary",
    scentFamily: "citrus-herb",
    price: 18,
    summary: "Bitter bergamot over a spine of rosemary.",
    story: [
      "Bergamot gives the bar its cologne-like top note; rosemary keeps it grounded and a little medicinal. It is the most classic of our citrus bars — restrained, not cheerful.",
      "We add nothing to force the colour. What you see is the natural tone of the oils after a long cure.",
    ],
    inci: [
      "Sodium Olivate",
      "Sodium Cocoate",
      "Aqua",
      "Sodium Shea Butterate",
      "Glycerin",
      "Citrus Bergamia Peel Oil",
      "Rosmarinus Officinalis Leaf Oil",
    ],
    ritual:
      "Best in the morning shower. Rub the wet bar directly onto skin for a fuller lather, or build it in a cloth. Rinse the dish when you rinse the bar.",
    provenance:
      "Cold-pressed in small batches and cured for sixty days on open racks.",
    images: [
      { src: "/images/products/bergamot-rosemary-1.svg", alt: "Bergamot and Rosemary soap bar on stone" },
      { src: "/images/products/bergamot-rosemary-2.svg", alt: "Bergamot and Rosemary soap bar, angled view" },
    ],
    featured: true,
  },
  {
    slug: "grapefruit-mint",
    name: "Grapefruit & Mint",
    scentFamily: "citrus-herb",
    price: 18,
    summary: "Pink grapefruit lifted by cool spearmint.",
    story: [
      "Grapefruit is softer than lemon — rounder, slightly bitter. A small amount of spearmint gives the bar a cool finish without turning it into toothpaste.",
      "A summer bar. We make it in limited runs and it tends to sell through by autumn.",
    ],
    inci: [
      "Sodium Olivate",
      "Sodium Cocoate",
      "Aqua",
      "Sodium Shea Butterate",
      "Glycerin",
      "Citrus Paradisi Peel Oil",
      "Mentha Spicata Leaf Oil",
    ],
    ritual:
      "A bright bar for hot mornings. Lather in the hands and work across the body. Let it dry fully between uses to keep it firm.",
    provenance:
      "Small-batch, cold-pressed, cured sixty days before dispatch.",
    images: [
      { src: "/images/products/grapefruit-mint-1.svg", alt: "Grapefruit and Mint soap bar on a light surface" },
      { src: "/images/products/grapefruit-mint-2.svg", alt: "Grapefruit and Mint soap bar close up" },
    ],
  },
  {
    slug: "cedar-amber",
    name: "Cedar & Amber",
    scentFamily: "woods-amber",
    price: 20,
    summary: "Dry cedar wood settled into warm amber.",
    story: [
      "Cedar is the backbone here — dry, resinous, a little smoky. Amber softens the edges and gives the bar its warmth. It smells like a wardrobe of old wool coats, in the best way.",
      "This is the bar people keep coming back for. It lasts well and the scent holds through a long cure.",
    ],
    inci: [
      "Sodium Olivate",
      "Sodium Cocoate",
      "Aqua",
      "Sodium Shea Butterate",
      "Glycerin",
      "Cedrus Atlantica Wood Oil",
      "Amber Extract",
    ],
    ritual:
      "An evening bar. Work up a slow lather and take your time. The scent lingers lightly on skin after rinsing.",
    provenance:
      "Cold-pressed, hand-cut, and cured sixty days on open racks.",
    images: [
      { src: "/images/products/cedar-amber-1.svg", alt: "Cedar and Amber soap bar on dark stone" },
      { src: "/images/products/cedar-amber-2.svg", alt: "Cedar and Amber soap bar, side view" },
    ],
    featured: true,
  },
  {
    slug: "vetiver-smoke",
    name: "Vetiver Smoke",
    scentFamily: "woods-amber",
    price: 20,
    summary: "Earthy vetiver root with a thread of smoke.",
    story: [
      "Vetiver is a root, and it smells like one — damp earth, cut grass, a little smoke. It is the most divisive bar we make, and the one we are proudest of.",
      "There is no added colour and no brightener. The bar is the colour of the oils, no more.",
    ],
    inci: [
      "Sodium Olivate",
      "Sodium Cocoate",
      "Aqua",
      "Sodium Shea Butterate",
      "Glycerin",
      "Vetiveria Zizanoides Root Oil",
      "Guaiacum Officinale Wood Oil",
    ],
    ritual:
      "A grounding bar for the end of a long day. Lather slowly in a cloth for the fullest scent. Dry between uses.",
    provenance:
      "Made in small batches, cold-pressed, cured for sixty days.",
    images: [
      { src: "/images/products/vetiver-smoke-1.svg", alt: "Vetiver Smoke soap bar on stone" },
      { src: "/images/products/vetiver-smoke-2.svg", alt: "Vetiver Smoke soap bar close up" },
    ],
  },
  {
    slug: "black-fir",
    name: "Black Fir",
    scentFamily: "woods-amber",
    price: 20,
    summary: "Cold pine needle over resin and moss.",
    story: [
      "Fir needle gives this bar its cold, green, coniferous top — the smell of a forest floor in winter. Underneath sits a resinous base that keeps it from feeling like an air freshener.",
      "A cold-weather bar. We make it from October and it runs until the batch is gone.",
    ],
    inci: [
      "Sodium Olivate",
      "Sodium Cocoate",
      "Aqua",
      "Sodium Shea Butterate",
      "Glycerin",
      "Abies Balsamea Needle Oil",
      "Evernia Prunastri Extract",
    ],
    ritual:
      "Bracing in a morning shower. Rub the wet bar onto skin or build lather in a cloth. Rinse and drain fully.",
    provenance:
      "Cold-pressed, hand-cut, cured sixty days on open racks.",
    images: [
      { src: "/images/products/black-fir-1.svg", alt: "Black Fir soap bar on a dark surface" },
      { src: "/images/products/black-fir-2.svg", alt: "Black Fir soap bar, angled" },
    ],
  },
  {
    slug: "oat-milk",
    name: "Oat & Milk",
    scentFamily: "milk-oat",
    price: 19,
    summary: "Unscented, with ground oats and goat milk.",
    story: [
      "No essential oils at all. This bar is for people who want none — sensitive skin, small children, anyone tired of fragrance. Ground oats give a gentle scrub; goat milk makes the lather soft.",
      "It smells faintly of oats and nothing else. That is the point.",
    ],
    inci: [
      "Sodium Olivate",
      "Sodium Cocoate",
      "Aqua",
      "Sodium Shea Butterate",
      "Glycerin",
      "Caprae Lac",
      "Avena Sativa Kernel Meal",
    ],
    ritual:
      "A daily bar for face and body. Lather gently — the oats do the work. Suitable for sensitive skin. Keep dry between uses.",
    provenance:
      "Cold-pressed, unscented, cured sixty days before it leaves the workshop.",
    images: [
      { src: "/images/products/oat-milk-1.svg", alt: "Oat and Milk soap bar on a pale surface" },
      { src: "/images/products/oat-milk-2.svg", alt: "Oat and Milk soap bar close up showing oat flecks" },
    ],
    featured: true,
  },
  {
    slug: "honey-shea",
    name: "Honey & Shea",
    scentFamily: "milk-oat",
    price: 19,
    summary: "Raw honey and a heavy dose of shea butter.",
    story: [
      "The richest bar we make. We fold raw honey and extra shea butter into the batch, which makes for a soft, slow lather that suits dry skin in winter.",
      "The honey gives it a faint sweetness and a warm colour — natural, not dyed.",
    ],
    inci: [
      "Sodium Olivate",
      "Sodium Cocoate",
      "Aqua",
      "Sodium Shea Butterate",
      "Butyrospermum Parkii Butter",
      "Glycerin",
      "Mel",
    ],
    ritual:
      "A comforting bar for dry skin and cold months. Build a slow lather and let it sit on the skin a moment before rinsing.",
    provenance:
      "Small-batch, cold-pressed, cured sixty days on open racks.",
    images: [
      { src: "/images/products/honey-shea-1.svg", alt: "Honey and Shea soap bar on stone" },
      { src: "/images/products/honey-shea-2.svg", alt: "Honey and Shea soap bar, side view" },
    ],
  },
];

/** Look up one product by slug. */
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** All products in a scent family. */
export function getByScent(scent: ScentFamilyId): Product[] {
  return PRODUCTS.filter((p) => p.scentFamily === scent);
}

/** Resolve a scent-family id to its display name. */
export function scentName(id: ScentFamilyId): string {
  return SCENT_FAMILIES.find((f) => f.id === id)?.name ?? id;
}

/** Featured products for the home page. */
export const FEATURED: ReadonlyArray<Product> = PRODUCTS.filter((p) => p.featured);

/** Format a price for display (CAD, no cents). */
export function formatPrice(price: number): string {
  return `$${price} CAD`;
}
