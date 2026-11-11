'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { assetUrl } from '@/lib/utils';
import { MOTION_EASINGS } from '@/lib/design-system/motion';

/**
 * Continuous Soft Watercolor Background System for Royal Watercolor Palace Garden.
 * Features:
 * - Dominant warm ivory parchment (#F5EBDD) with delicate vintage paper texture.
 * - Extremely soft watercolor palace architecture, pale sage foliage, and faded dusty-pink flora (~75-85% visually softer).
 * - Multi-stage ivory radial vignette & linear gradient masks that keep the central content area clean and luminous.
 * - Seamless edge dissolves with zero harsh rectangular image borders.
 * - Leaves all foreground typography, mandala artwork, and interactive components 100% crisp and saturated.
 */
export function PalaceHeroIllustration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none bg-[#F5EBDD]">
      {/* 1. Vintage Parchment Texture Base Layer (Tactile paper grain) */}
      <div
        className="absolute inset-0 w-full h-full opacity-35 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url('${assetUrl('/themes/palace-garden/vintage-parchment-texture.jpg')}')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '800px 800px',
        }}
        aria-hidden="true"
      />

      {/* 2A. DESKTOP LANDSCAPE COMPOSITION (Soft Watercolor Wash ~80% visually softer) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.22 } : { opacity: 0 }}
        animate={{ opacity: 0.22 }}
        transition={{ duration: 1.2, ease: MOTION_EASINGS.ceremonial }}
        className="hidden md:block absolute inset-0 w-full h-full mix-blend-multiply"
      >
        <img
          src={assetUrl('/themes/palace-garden/palace-garden-desktop-bg.jpg')}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom"
          style={{
            filter: 'brightness(1.18) contrast(0.78) saturate(0.58) sepia(0.15)',
            maskImage:
              'radial-gradient(ellipse 72% 58% at 50% 46%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 75%, black 100%), linear-gradient(to bottom, transparent 0%, transparent 12%, black 35%, black 82%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 72% 58% at 50% 46%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 75%, black 100%), linear-gradient(to bottom, transparent 0%, transparent 12%, black 35%, black 82%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }}
        />
      </motion.div>

      {/* 2B. MOBILE PORTRAIT COMPOSITION (Soft Watercolor Wash ~80% visually softer) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.20 } : { opacity: 0 }}
        animate={{ opacity: 0.20 }}
        transition={{ duration: 1.2, ease: MOTION_EASINGS.ceremonial }}
        className="block md:hidden absolute inset-0 w-full h-full mix-blend-multiply"
      >
        <img
          src={assetUrl('/themes/palace-garden/palace-garden-mobile-bg.jpg')}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom"
          style={{
            filter: 'brightness(1.18) contrast(0.78) saturate(0.58) sepia(0.15)',
            maskImage:
              'radial-gradient(ellipse 78% 55% at 50% 44%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 75%, black 100%), linear-gradient(to bottom, transparent 0%, transparent 10%, black 30%, black 85%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 78% 55% at 50% 44%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 75%, black 100%), linear-gradient(to bottom, transparent 0%, transparent 10%, black 30%, black 85%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }}
        />
      </motion.div>

      {/* 3. Central Warm Ivory Cloud Veil — keeps mandala and couple title crisp & luminous */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 52% at 50% 45%, rgba(245, 235, 221, 0.88) 0%, rgba(245, 235, 221, 0.6) 42%, rgba(245, 235, 221, 0.15) 75%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* 4. Top Parchment Veil — dissolves top header into clean warm ivory */}
      <div
        className="absolute inset-x-0 top-0 h-36 sm:h-52 bg-gradient-to-b from-[#F5EBDD] via-[#F5EBDD]/85 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* 5. Bottom Parchment Transition — dissolves smoothly into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#F5EBDD] via-[#F5EBDD]/70 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

export { PalaceHeroIllustration as PalaceHeroBackground };
