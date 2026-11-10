'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function PalaceHeroIllustration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none relative w-full mt-4 sm:mt-6 overflow-hidden select-none">
      {/* Soft gradient blend into ivory parchment */}
      <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#FAF6EE] to-transparent z-10" />

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto flex justify-center"
      >
        <img
          src="/themes/palace-garden/palace-hero-garden.png"
          alt="Palace Garden Pavilions with Peacocks, Garden Palms, and Royal Couple"
          className="w-full h-[250px] sm:h-[340px] md:h-[420px] lg:h-[480px] object-cover object-bottom"
          style={{
            maskImage: 'linear-gradient(to top, black 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 75%, transparent 100%)',
          }}
        />
      </motion.div>
    </div>
  );
}
