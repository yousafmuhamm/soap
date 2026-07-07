"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

/**
 * Accessible disclosure accordion with hairline dividers (§3). Each row is a
 * <button aria-expanded aria-controls> paired with a region — fully keyboard
 * operable (Enter/Space toggle, Tab to move). Height animates open/closed;
 * reduced motion snaps. Multiple rows may be open at once.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <AccordionRow key={i} item={item} />
      ))}
    </div>
  );
}

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between py-6 text-left"
        >
          <span className="label text-ink">{item.title}</span>
          <span
            aria-hidden
            className={[
              "font-display text-2xl leading-none transition-transform duration-300",
              open ? "rotate-45" : "",
            ].join(" ")}
          >
            +
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-sm leading-relaxed text-muted">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
