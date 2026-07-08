/**
 * Journal posts — a local array, same no-CMS approach as products (§4.1 D2).
 * Body is an array of paragraphs so the post template can render clean prose
 * without a Markdown pipeline. Images reuse the curated Phase 5 photography.
 */

export interface JournalPost {
  slug: string;
  title: string;
  /** One-line standfirst for the index card and meta description. */
  excerpt: string;
  /** ISO date. */
  date: string;
  image: { src: string; alt: string };
  /** Body paragraphs, in order. */
  body: string[];
}

/** Rough reading time from word count (~200 wpm), min 1. */
export function readingTime(post: JournalPost): number {
  const words = post.body.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPost(slug: string): JournalPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export const POSTS: ReadonlyArray<JournalPost> = [
  {
    slug: "why-we-cure-for-sixty-days",
    title: "Why we cure for sixty days",
    excerpt:
      "Curing is mostly waiting. Here is what the waiting actually does to a bar of soap.",
    date: "2026-05-12",
    image: {
      src: "/images/craft.jpg",
      alt: "Ground botanicals and salt in ceramic bowls on marble",
    },
    body: [
      "A bar of soap is finished making itself long after we stop working on it. When a fresh batch comes out of the mould it is soft, a little damp, and technically usable — but using it then would be a waste. It would dissolve in a week and lather thinly. So we wait.",
      "Curing is the name for that wait. It is not a chemical step in the way saponification is; the reaction that turns oil into soap is mostly done within a day or two. Curing is slower and quieter. Over the weeks that follow, water evaporates out of the bar. As it leaves, the soap tightens and hardens, and the crystalline structure of the soap settles into something more even.",
      "The practical result is a bar that lasts. A well-cured bar is denser, so it dissolves more slowly in the shower and gives a fuller, creamier lather. The difference between a two-week cure and a two-month cure is not subtle — you can feel it in the hand and see it in how long the bar survives.",
      "Sixty days is our number. Some makers cure for four weeks, some for six. We land on sixty because it is the point at which our particular recipe — heavy on olive oil, which is slow to harden — stops changing. Past that, more time makes little difference. Before it, the bar is not yet itself.",
      "There is a scent argument too. Essential oils are volatile; fresh from the mould they can smell sharp and raw. A long cure lets the top notes mellow and the whole fragrance knit together, so what reaches you is settled rather than loud.",
      "None of this is efficient. A sixty-day cure means holding two months of stock on open racks, taking up space, earning nothing until it ships. We keep doing it because there is no shortcut that produces the same bar. Patience is the only ingredient we cannot buy.",
    ],
  },
  {
    slug: "reading-an-inci-list",
    title: "Reading an INCI list",
    excerpt:
      "The Latin on the back of the box is not there to confuse you. It is there to tell you the truth.",
    date: "2026-06-03",
    image: {
      src: "/images/editorial.jpg",
      alt: "Two handmade soap bars tied with twine on stone",
    },
    body: [
      "Turn over almost any soap and you will find a list of ingredients written in a language that looks like botany crossed with chemistry. That is INCI — the International Nomenclature of Cosmetic Ingredients — and it is one of the more useful things printed on any product you own.",
      "The rules are simple once you know them. Ingredients are listed in descending order of how much is in the product, from most to least. So the first two or three items make up the bulk of the bar; anything near the end is present in small amounts.",
      "Plant oils appear under their Latin names once they have been turned into soap. Olive oil becomes Sodium Olivate; coconut oil becomes Sodium Cocoate; shea butter becomes Sodium Shea Butterate. The prefix tells you it has been saponified — reacted into soap. This is not a trick of language. It is the accurate name for what the ingredient has become.",
      "You will often see Aqua, which is water, and Glycerin, which is a humectant produced naturally during saponification. Many industrial soaps remove the glycerin to sell separately; we leave it in, which is part of why a handmade bar can feel less drying.",
      "Essential oils keep their botanical names too: Citrus Limon Peel Oil is lemon; Cedrus Atlantica Wood Oil is cedar. When you see a plant name followed by the part used and the word oil, you are looking at a real botanical, not a synthetic fragrance.",
      "What should give you pause is a long list you cannot parse, especially one that ends in a vague catch-all like Parfum or Fragrance. That single word can stand in for dozens of undisclosed synthetic compounds. It is legal, and common, and it is the opposite of what an INCI list is for.",
      "Our lists are short on purpose. Oils, water, glycerin, a botanical or two. If you can read the whole thing out loud and recognise most of it, that is the point. The Latin is not there to impress you. It is there so you can check.",
    ],
  },
  {
    slug: "the-case-for-the-bar",
    title: "The case for the bar",
    excerpt:
      "Liquid soap won the bathroom. We think the humble bar deserves a second look.",
    date: "2026-06-24",
    image: {
      src: "/images/hero.jpg",
      alt: "Handmade soap bars with dried lavender on wood",
    },
    body: [
      "For most of the last century, a bar of soap sat on every sink. Then, sometime in the nineties, the pump bottle arrived and quietly took over. Today the bar can feel old-fashioned — a thing your grandparents used. We would like to make the case for it again.",
      "Start with what is in the bottle. Liquid soap is mostly water; a typical bottle is somewhere between seventy and ninety percent of it. You are paying to ship water to your bathroom, and paying again to throw away the plastic it came in. A bar is soap almost all the way through.",
      "Then there is the packaging. A bar needs a paper band and a box, both of which compost or recycle. A bottle needs a moulded plastic body and a pump — and the pump, with its spring and mixed materials, is one of the hardest things in your house to recycle. Most end up in landfill.",
      "A bar lasts, too. Ounce for ounce, a bar of soap outlasts the equivalent volume of liquid, because you use less per wash and none of it is water. A single cured bar can replace two or three bottles.",
      "The usual objection is hygiene — the idea that a shared bar harbours germs. Study after study has found this fear to be effectively unfounded; whatever transfers to the bar rinses away with use. A bar on a draining dish, allowed to dry between washes, is perfectly clean.",
      "None of this is an argument against convenience. A pump is easy, and easy matters. But a bar asks very little of you: wet it, use it, set it down to dry. In exchange it gives you less plastic, less water, less waste, and a longer life on the shelf.",
      "We are, admittedly, biased. But we think the bar was never really beaten on merit — only on marketing. Set the two side by side and the older idea holds up remarkably well.",
    ],
  },
];
