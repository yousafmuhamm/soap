/**
 * Product data — single-product site (Yeong Won Stemcell Soap).
 * All claims copy mirrors the retail packaging: "helps / supports / promotes"
 * phrasing only. INCI, directions, and storage are transcribed from the sachet.
 */

export interface ProductImage {
  /** Path under /public. */
  src: string;
  alt: string;
}

export interface KeyIngredient {
  /** Display name, as printed on the carton's science panel. */
  name: string;
  /** One-sentence benefit, from the "Science Beyond Youthful Skin" panel. */
  benefit: string;
  /** Longer supporting note for the science page. */
  detail: string;
}

export const PRODUCT = {
  slug: "stemcell-soap",
  name: "Stemcell Soap",
  tagline: "Renew. Restore. Reveal your best.",
  summary:
    "A concentrated cleansing bar built around plant stem cell culture extract, snail secretion filtrate and niacinamide — the daily first step of a renewal ritual.",
  /** Front-of-pack benefit claims. */
  benefits: [
    {
      title: "Helps brighten skin",
      body: "Niacinamide + stem cell extract, for a luminous, even tone.",
    },
    {
      title: "Promotes smoother-looking skin",
      body: "Snail + collagen, to refine texture and soften fine lines.",
    },
    {
      title: "Supports healthy skin appearance",
      body: "Aloe, oat + milk, to soothe and protect.",
    },
  ],
  /** The carton's "Science Beyond Youthful Skin" panel, in printed order. */
  keyIngredients: [
    {
      name: "Snail Extract",
      benefit:
        "Helps repair skin, improve texture and reduce the appearance of fine lines.",
      detail:
        "Snail secretion filtrate is naturally rich in glycoproteins, glycolic acid and hyaluronic acid — a combination prized in Korean skincare for supporting the skin's own renewal and moisture retention.",
    },
    {
      name: "Stemcell Culture Extract",
      benefit:
        "Supports skin regeneration and helps maintain skin elasticity and firmness.",
      detail:
        "Plant stem cell culture extract is cultivated in controlled conditions to concentrate the protective compounds plants use to regenerate their own tissue, helping skin look firmer and more resilient.",
    },
    {
      name: "Niacinamide",
      benefit:
        "Helps brighten skin, even out skin tone and strengthen skin barrier.",
      detail:
        "One of the most studied ingredients in modern dermatology, vitamin B3 supports the skin barrier, moderates the look of discolouration and leaves tone visibly more uniform.",
    },
    {
      name: "Collagen",
      benefit:
        "Helps improve skin elasticity and reduce appearance of wrinkles.",
      detail:
        "Topical collagen forms a breathable, moisture-binding film that smooths the skin's surface, supporting suppleness and a plumper look.",
    },
    {
      name: "Aloe Vera",
      benefit:
        "Soothes and hydrates skin for a healthy and radiant complexion.",
      detail:
        "Aloe barbadensis leaf extract calms, cools and hydrates — balancing the cleanse so skin never feels stripped.",
    },
    {
      name: "Oatmeal & Milk",
      benefit:
        "Gently exfoliates and nourishes skin, leaving it soft, smooth and supple.",
      detail:
        "Finely milled oat kernel flour lifts away dull surface cells while milk proteins soften — a gentle polish suitable for daily use.",
    },
  ] satisfies KeyIngredient[],
  /** Full INCI, transcribed from the sachet, in descending order. */
  inci: [
    "Aqua (Water)",
    "Sodium Palmate",
    "Sodium Palm Kernelate",
    "Glycerin",
    "Niacinamide",
    "Snail Secretion Filtrate",
    "Stem Cell Culture Extract",
    "Aloe Barbadensis Leaf Extract",
    "Collagen",
    "Avena Sativa (Oat) Kernel Flour",
    "Titanium Dioxide (CI 77891)",
    "Parfum",
    "Disodium EDTA",
    "Etidronic Acid",
  ],
  directions:
    "Lather the soap with water, gently massage onto skin. Rinse thoroughly. Use morning and evening as the first step of your ritual.",
  storage:
    "Store in a cool, dry place away from direct sunlight and moisture. Avoid eye contact. For external use only. Best used within 12 months of opening.",
  netContent: {
    bar: "70 g",
    box: "70 g × 10 bars",
  },
  /** Two-paragraph story for the product page. */
  story: [
    "Yeong Won means eternal. We built this bar around a single conviction — that the first step of a skincare ritual should work as hard as the last. Plant stem cell culture extract, snail secretion filtrate, niacinamide and collagen are folded into a dense, slow-lathering base of oat and milk.",
    "The result is a cleanse that behaves like a treatment: skin feels supple rather than stripped, tone looks brighter, texture more refined. One bar, used daily, is a month of renewal.",
  ] as [string, string],
  images: {
    /** Carton three-quarter render — the signature packshot. */
    boxFront: {
      src: "/images/product/box-front.png",
      alt: "Yeong Won Stemcell Soap carton in black and gold with a golden DNA helix",
    },
    /** Dark campaign still-life: carton, bar and sachet on slate. */
    campaign: {
      src: "/images/product/campaign.png",
      alt: "Stemcell Soap carton, bar and sachet arranged on dark slate with gold silk",
    },
    /** Individual 70 g sachet beside the bare bar. */
    sachet: {
      src: "/images/product/sachet.png",
      alt: "Individual 70 g Stemcell Soap sachet beside the unwrapped cream bar",
    },
    /** Generated editorial photography. */
    barDark: {
      src: "/images/product/bar-dark.png",
      alt: "Ivory soap bar with gold flecks on dark slate beside gold silk",
    },
    barsCream: {
      src: "/images/product/bars-cream.png",
      alt: "Two cream soap bars stacked on warm linen in morning light",
    },
    ingredients: {
      src: "/images/product/ingredients.png",
      alt: "Aloe vera, oats, milk and golden botanical extract arranged on cream marble",
    },
    lather: {
      src: "/images/product/hands-lather.png",
      alt: "Hands working the soap into a rich lather over a dark stone basin",
    },
    lab: {
      src: "/images/product/lab.png",
      alt: "Glass vessels of golden botanical extracts in a skincare laboratory",
    },
    portrait: {
      src: "/images/product/portrait.png",
      alt: "A woman with luminous, healthy skin in warm golden light",
    },
    skinGlow: {
      src: "/images/product/skin-glow.png",
      alt: "Macro of luminous, dewy skin with a warm golden glow",
    },
  },
  videos: {
    lather: "/videos/lather.mp4",
    ritual: "/videos/ritual.mp4",
  },
  /** Hero reel — cinematic effect/environment clips, crossfaded in order. */
  heroReel: [
    "/videos/hero-face-wash.mp4",
    "/videos/hero-spa.mp4",
    "/videos/hero-glow.mp4",
    "/videos/hero-cream.mp4",
  ],
} as const;

/** Gallery images for the product page, in display order. */
export const GALLERY: ReadonlyArray<ProductImage> = [
  PRODUCT.images.boxFront,
  PRODUCT.images.sachet,
  PRODUCT.images.barDark,
  PRODUCT.images.campaign,
];
