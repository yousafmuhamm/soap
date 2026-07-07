/**
 * Single source of truth for brand identity, navigation, and metadata defaults.
 * Rename the brand by changing SITE.name in one place (master plan §2 / checklist).
 */

export const SITE = {
  name: "SAVON",
  tagline: "Cold-pressed bar soap, cured slowly.",
  description:
    "SAVON makes cold-pressed bar soap, cured for sixty days and hand-cut. Neutral ingredients, nothing else.",
  url: "https://savon.example.com",
  // Post-launch: swap for the client's real address / enquiry line.
  email: "hello@savon.example.com",
  wholesaleEmail: "wholesale@savon.example.com",
} as const;

/** Primary navigation — kept to four links per YSL restraint (§1). */
export const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Collection", href: "/collection" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

/** Footer link groups. */
export const FOOTER_NAV: ReadonlyArray<{
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    heading: "Shop",
    links: [
      { label: "The Collection", href: "/collection" },
      { label: "Citrus & Herb", href: "/collection?scent=citrus-herb" },
      { label: "Woods & Amber", href: "/collection?scent=woods-amber" },
      { label: "Milk & Oat", href: "/collection?scent=milk-oat" },
    ],
  },
  {
    heading: "House",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
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
