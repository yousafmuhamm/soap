"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";
import { NAV, SITE } from "@/lib/site";

/**
 * Fixed header: transparent over the hero, transitions to a white background
 * with a hairline bottom border after 50px of scroll (§4 D-line, YSL pattern).
 *
 * Only the home page carries a full-bleed dark hero behind the header, so there
 * the unscrolled state uses white text; every other route starts on white and
 * uses ink text throughout.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const hasHero = pathname === "/";
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid state also applies while the mobile overlay is open so the bar reads
  // against white rather than fighting the hero behind the overlay.
  const solid = scrolled || menuOpen;

  // Light text only while transparent over the home hero.
  const onDarkHero = hasHero && !solid;
  const textClass = onDarkHero ? "text-white" : "text-ink";
  const logoClass = onDarkHero ? "text-white" : "text-primary";

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          solid
            ? "border-b border-line bg-white/70 backdrop-blur-md"
            : "border-b border-transparent",
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 transition-colors duration-300 md:h-20 md:px-10",
            textClass,
          ].join(" ")}
        >
          {/* Left: desktop nav / mobile hamburger */}
          <nav
            className="hidden flex-1 items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label transition-opacity hover:opacity-60 focus-visible:outline-current"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="label flex min-h-11 flex-1 items-center text-left focus-visible:outline-current md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>

          {/* Center: wordmark */}
          <Link
            href="/"
            className={[
              "transition-colors duration-300 hover:opacity-80",
              "focus-visible:outline-current",
              logoClass,
            ].join(" ")}
            aria-label={`${SITE.name}, home`}
          >
            <BrandLogo
              className="[--brand-logo-height:2.75rem] md:[--brand-logo-height:3.25rem]"
              decorative
            />
          </Link>

          {/* Right: stockist link (desktop) / spacer (mobile) */}
          <div className="flex flex-1 items-center justify-end">
            <Link
              href="/contact"
              className="label hidden transition-opacity hover:opacity-60 focus-visible:outline-current md:inline"
            >
              Find a Stockist
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
