"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react";

interface StaggerProps extends HTMLMotionProps<"div"> {
  /** Seconds between each child. */
  stagger?: number;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (for above-the-fold content). */
  immediate?: boolean;
  as?: "div" | "ul" | "ol";
}

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({
  stagger = 0.08,
  delay = 0,
  immediate = false,
  as = "div",
  children,
  ...props
}: StaggerProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
  };
  // Polymorphic element: the props are identical apart from the DOM node type.
  const Comp = (as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div) as typeof motion.div;

  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-60px" } };

  return (
    <Comp initial="hidden" variants={variants} {...trigger} {...props}>
      {children}
    </Comp>
  );
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  as?: "div" | "li" | "span";
}

export function StaggerItem({ as = "div", children, ...props }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] } },
  };
  const Comp = (as === "li" ? motion.li : as === "span" ? motion.span : motion.div) as typeof motion.div;
  return (
    <Comp variants={variants} {...props}>
      {children}
    </Comp>
  );
}
