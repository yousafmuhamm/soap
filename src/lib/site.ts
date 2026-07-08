/**
 * Single source of truth for brand identity, navigation, and metadata defaults.
 */

export const SITE = {
  name: "Yeong Won",
  /** Sub-brand line printed under the logotype on every pack. */
  descriptor: "Fountain of Youth",
  tagline: "Renew. Restore. Reveal your best.",
  description:
    "Yeong Won Stemcell Soap — a luxury renewal bar with plant stem cell culture extract, snail extract, niacinamide and collagen. Helps brighten, smooth and support healthy-looking skin.",
  url: "https://yeongwon.example.com",
  // Post-launch: swap for the client's real address / enquiry line.
  email: "hello@yeongwon.example.com",
  wholesaleEmail: "wholesale@yeongwon.example.com",
} as const;

/** Primary navigation — one product, four destinations. */
export const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: "The Soap", href: "/product" },
  { label: "The Science", href: "/science" },
  { label: "Our House", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer link groups. */
export const FOOTER_NAV: ReadonlyArray<{
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    heading: "Product",
    links: [
      { label: "Stemcell Soap", href: "/product" },
      { label: "Key Ingredients", href: "/science" },
      { label: "How to Use", href: "/product#formulation" },
    ],
  },
  {
    heading: "House",
    links: [
      { label: "Our House", href: "/about" },
      { label: "Find a Stockist", href: "/contact" },
      { label: "Wholesale", href: "/contact?subject=wholesale" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

/** Social links shown in the footer. */
export const SOCIALS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
];
