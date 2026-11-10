import type { Variants } from 'motion/react';

/**
 * Reusable Motion Design Tokens & Primitives for Wedfolio
 * Preferred Easing: [0.22, 1, 0.36, 1]
 */
export const MOTION_DURATIONS = {
  hover: 0.22,
  button: 0.2,
  cardReveal: 0.65,
  headingReveal: 0.6,
  envelope: 1.1,
  transition: 0.85,
  marker: 0.5,
} as const;

export const MOTION_EASINGS = {
  ceremonial: [0.22, 1, 0.36, 1] as const,
  organic: [0.25, 0.1, 0.25, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
  easeOut: 'easeOut' as const,
} as const;

/**
 * Shared Heading Reveal Variants
 */
export function getHeadingVariants(shouldReduceMotion = false): Variants {
  return {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : MOTION_DURATIONS.headingReveal,
        ease: MOTION_EASINGS.ceremonial,
      },
    },
  };
}

/**
 * Shared Ornamental Divider Draw Variants
 */
export function getDividerVariants(shouldReduceMotion = false): Variants {
  return {
    hidden: {
      scaleX: shouldReduceMotion ? 1 : 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        delay: shouldReduceMotion ? 0 : 0.2,
        ease: MOTION_EASINGS.easeOut,
      },
    },
  };
}

/**
 * Shared Card Reveal Variants
 */
export function getCardRevealVariants(shouldReduceMotion = false): Variants {
  return {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : MOTION_DURATIONS.cardReveal,
        ease: MOTION_EASINGS.ceremonial,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };
}

/**
 * Staggered Item Child Variants
 */
export function getItemVariants(shouldReduceMotion = false): Variants {
  return {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.45,
        ease: MOTION_EASINGS.easeOut,
      },
    },
  };
}

/**
 * Timeline Node Marker Scale-in Variants
 */
export function getMarkerVariants(shouldReduceMotion = false): Variants {
  return {
    hidden: {
      scale: shouldReduceMotion ? 1 : 0.35,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : MOTION_DURATIONS.marker,
        ease: MOTION_EASINGS.spring,
      },
    },
  };
}
