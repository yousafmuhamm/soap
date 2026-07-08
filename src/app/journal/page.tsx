import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FadeUp from "@/components/FadeUp";
import { POSTS, readingTime } from "@/lib/journal";
import { blurFor } from "@/lib/blur";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on making soap slowly — curing, ingredients, and the case for the bar.",
};

/** Format an ISO date as e.g. "12 May 2026". */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** /journal — an editorial card grid of posts. */
export default function JournalPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <FadeUp>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
        <h1 className="mt-8 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
          Journal
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted">
          Notes from the workshop — on curing, ingredients, and why a bar of soap
          is worth making slowly.
        </p>
      </FadeUp>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2">
        {POSTS.map((post, i) => (
          <FadeUp key={post.slug} index={i % 2}>
            <article>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-primary-2">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={blurFor(post.image.src)}
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                  />
                </div>
                <p className="label mt-6 text-muted">
                  {formatDate(post.date)} · {readingTime(post)} min read
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight">
                  <span className="bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-primary group-hover:bg-[length:100%_2px]">
                    {post.title}
                  </span>
                </h2>
                <p className="mt-3 max-w-md text-base text-muted">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
