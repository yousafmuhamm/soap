"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
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
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="label py-2"
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
              className="label text-muted"
            >
              Find a Stockist
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
