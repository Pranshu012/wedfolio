'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { assetUrl } from '@/lib/utils';
import { MOTION_EASINGS } from '@/lib/design-system/motion';

/**
 * Continuous Illustrated Background System for Royal Watercolor Palace Garden.
 * Features dedicated, un-stretched compositions for Desktop (Landscape) and Mobile (Portrait).
 * Seamlessly fades into warm ivory parchment (#F5EBDD) at the top and bottom with zero harsh borders.
 */
export function PalaceHeroIllustration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* A. DESKTOP LANDSCAPE COMPOSITION (Hidden on Mobile) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: MOTION_EASINGS.ceremonial }}
        className="hidden md:block absolute inset-0 w-full h-full"
      >
        <img
          src={assetUrl('/themes/palace-garden/palace-garden-desktop-bg.jpg')}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom"
          style={{
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.4) 75%, transparent 95%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.4) 75%, transparent 95%)',
          }}
        />
      </motion.div>

      {/* B. MOBILE PORTRAIT COMPOSITION (Hidden on Desktop) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: MOTION_EASINGS.ceremonial }}
        className="block md:hidden absolute inset-0 w-full h-full"
      >
        <img
          src={assetUrl('/themes/palace-garden/palace-garden-mobile-bg.jpg')}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom"
          style={{
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.4) 75%, transparent 95%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.4) 75%, transparent 95%)',
          }}
        />
      </motion.div>

      {/* C. Soft Parchment Gradient Overlays to guarantee seamless blend into #F5EBDD */}
      {/* Top Parchment Veil */}
      <div
        className="absolute inset-x-0 top-0 h-40 sm:h-56 bg-gradient-to-b from-[#F5EBDD] via-[#F5EBDD]/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Bottom Parchment Transition into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#F5EBDD] via-[#F5EBDD]/65 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

export { PalaceHeroIllustration as PalaceHeroBackground };
