import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * 404 page, styled to match the site: serif headline, hairline detail, a yellow-
 * underlined route back. No image — restraint (§1).
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col items-start justify-center px-5 py-32 md:px-10">
      <p className="label text-muted">Error 404</p>
      <h1 className="mt-6 font-display text-6xl leading-none md:text-8xl">
        Not found.
      </h1>
      <p className="mt-6 max-w-sm text-base text-muted">
        The page you were looking for isn&rsquo;t here — it may have moved, or
        never existed. Everything we make is in the collection.
      </p>
      <div className="mt-10 flex flex-wrap gap-8">
        <Link
          href="/"
          className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
        >
          Return home
        </Link>
        <Link
          href="/collection"
          className="label border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-60"
        >
          View the collection
        </Link>
      </div>
    </div>
  );
}
