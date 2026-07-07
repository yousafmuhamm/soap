"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";

type MotionDivProps = ComponentProps<typeof motion.div>;

interface FadeUpProps extends MotionDivProps {
  /** Stagger index — multiplies the 80ms base delay (§2 motion spec). */
  index?: number;
  /** Render as a different element while keeping the motion behaviour. */
  as?: "div" | "li" | "section";
}

/**
 * Shared scroll-reveal wrapper (§4.2): fades content up once when it enters the
 * viewport. 400ms ease-out, 80ms stagger per index. Disabled entirely under
 * prefers-reduced-motion — content renders immediately in its final position.
 * Built once here, reused across every section.
 */
export default function FadeUp({
  index = 0,
  as = "div",
  children,
  ...props
}: FadeUpProps) {
  const reduce = useReducedMotion();
  // The motion.* components share a compatible prop surface; casting the tag to
  // the div variant keeps a single prop type without per-element unions.
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return <MotionTag {...props}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
