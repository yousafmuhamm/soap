"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import BrandLogo from "./BrandLogo";
import { NAV, SITE } from "@/lib/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen white overlay menu (YSL-style), with staggered link fade-in.
 * Motion is disabled under prefers-reduced-motion.
 */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => previousFocusRef.current?.focus());
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-50 bg-bg md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <span aria-label={SITE.name} role="img" className="text-primary">
              <BrandLogo className="[--brand-logo-height:2.5rem]" decorative />
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="label inline-flex min-h-11 min-w-11 items-center justify-center focus-visible:outline-current"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-col px-5 pt-10" aria-label="Mobile">
            {NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.4,
                  ease: "easeOut",
                  delay: reduce ? 0 : 0.1 + i * 0.08,
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-line py-6 font-display text-4xl"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-5 pt-10">
            <Link
              href="/contact"
              onClick={onClose}
              className="label inline-flex min-h-11 items-center text-muted"
            >
              Find a Stockist
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
