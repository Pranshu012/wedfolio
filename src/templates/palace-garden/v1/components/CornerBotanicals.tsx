'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function CornerBotanicals() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-48 sm:h-64 md:h-80 overflow-hidden z-10 select-none">
      {/* Top Left Watercolor Rose & Sage Bouquet */}
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, x: -10, y: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-28 sm:w-44 md:w-60 lg:w-72 aspect-square"
      >
        <img
          src="/themes/palace-garden/rose-corner-left.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain object-top-left"
          style={{
            maskImage: 'radial-gradient(circle at 15% 15%, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at 15% 15%, black 60%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Top Right Watercolor Rose & Sage Bouquet */}
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, x: 10, y: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-28 sm:w-44 md:w-60 lg:w-72 aspect-square"
      >
        <img
          src="/themes/palace-garden/rose-corner-right.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain object-top-right"
          style={{
            maskImage: 'radial-gradient(circle at 85% 15%, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at 85% 15%, black 60%, transparent 100%)',
          }}
        />
      </motion.div>
    </div>
  );
}
