// ============================================================
// SkyVision Global Motion System
// Centralized Framer Motion variants for the entire site.
// ============================================================
import type { Variants, Transition } from 'framer-motion';

// Framer Motion v12 requires ease bezier as a 4-tuple, not number[].
type BezierTuple = [number, number, number, number];

const smooth: BezierTuple = [0.25, 0.46, 0.45, 0.94];
const snappy: BezierTuple = [0.76, 0, 0.24, 1];

// Shared transition builders
const smoothT = (duration: number, delay = 0): Transition => ({
  duration,
  ease: smooth,
  delay,
});

// ── Page-level entrance / exit ─────────────────────────────
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    y: 12,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: smoothT(0.7),
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -12,
    filter: 'blur(6px)',
    transition: { duration: 0.5, ease: snappy },
  },
};

// ── Section stagger container ──────────────────────────────
export const sectionContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.05,
    },
  },
};

// ── Standard fade-up (tags, text, badges) ─────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: smoothT(0.75),
  },
};

// ── Heading reveal (slightly bigger travel) ────────────────
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 56, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: smoothT(0.9),
  },
};

// ── Card reveal (scroll-based) ─────────────────────────────
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.95, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: smoothT(0.75),
  },
};

// ── Image reveal ───────────────────────────────────────────
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: smoothT(1.0),
  },
};

// ── Slide-in from left ─────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: smoothT(0.8),
  },
};

// ── Slide-in from right ────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: smoothT(0.8),
  },
};

// ── viewport trigger props (reusable spread) ──────────────
export const inViewProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
} as const;
