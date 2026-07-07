import Link from "next/link";
import NewsletterInput from "./NewsletterInput";
import { FOOTER_NAV, SITE, SOCIALS } from "@/lib/site";

/**
 * Four-column footer: newsletter + three link groups, hairline top border,
 * tiny uppercase labels. Server component — the only interactive part is the
 * newsletter input.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Column 1: brand + newsletter */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl leading-none tracking-tight">
              {SITE.name}
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted">{SITE.tagline}</p>
            <div className="mt-8">
              <NewsletterInput />
            </div>
          </div>

          {/* Columns 2–4: link groups */}
          {FOOTER_NAV.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <p className="label mb-5 text-muted">{group.heading}</p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink transition-opacity hover:opacity-60"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="label text-muted">
            © {year} {SITE.name}
          </p>
          <ul className="flex gap-6">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label text-ink transition-opacity hover:opacity-60"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
