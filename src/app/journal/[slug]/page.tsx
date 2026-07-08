import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { POSTS, getPost, readingTime } from "@/lib/journal";
import { blurFor } from "@/lib/blur";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image.src }],
      publishedTime: post.date,
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE.url}${post.image.src}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.svg` },
    },
    mainEntityOfPage: `${SITE.url}/journal/${post.slug}`,
  };

  return (
    <article className="pt-16 md:pt-20">
      <JsonLd data={articleLd} />

      {/* Header block */}
      <div className="mx-auto max-w-[65ch] px-5 pt-14 md:pt-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/journal" },
            { label: post.title },
          ]}
        />
        <h1 className="mt-8 font-display text-5xl leading-[1.1] md:text-6xl">
          {post.title}
        </h1>
        <p className="label mt-6 text-muted">
          {formatDate(post.date)} · {readingTime(post)} min read
        </p>
      </div>

      {/* Full-bleed image band */}
      <div className="relative mt-12 aspect-[3/2] w-full overflow-hidden bg-primary-2 md:mt-16 md:aspect-[21/9]">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurFor(post.image.src)}
          className="object-cover"
        />
      </div>

      {/* Prose */}
      <div className="mx-auto max-w-[65ch] px-5 py-16 md:py-24">
        <div className="space-y-6 text-lg leading-relaxed text-ink/85">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <Link
            href="/journal"
            className="label text-ink transition-opacity hover:opacity-60"
          >
            ← All journal
          </Link>
        </div>
      </div>

      {/* Read next */}
      {more.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
            <p className="label mb-10 text-muted">Read next</p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
              {more.map((p) => (
                <Link key={p.slug} href={`/journal/${p.slug}`} className="group block">
                  <p className="label text-muted">
                    {formatDate(p.date)} · {readingTime(p)} min read
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-tight">
                    <span className="bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-primary group-hover:bg-[length:100%_2px]">
                      {p.title}
                    </span>
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
