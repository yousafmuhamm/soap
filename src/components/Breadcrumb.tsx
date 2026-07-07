import Link from "next/link";

export interface Crumb {
  label: string;
  /** Omit href on the current (last) crumb. */
  href?: string;
}

/**
 * Tiny uppercase breadcrumb trail. The last crumb is the current page and is
 * not linked. Used on collection and product pages.
 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="label flex flex-wrap items-center gap-2 text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="transition-opacity hover:opacity-60"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-ink">
                  {item.label}
                </span>
              )}
              {!last && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
