'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MuhuratCartoucheProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function MuhuratCartouche({
  children,
  subtitle = 'WEDDING MUHURAT',
  className = '',
}: MuhuratCartoucheProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative max-w-sm sm:max-w-md mx-auto my-4 sm:my-6 ${className}`}
    >
      {/* Outer Scalloped Gold Frame Container */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#FAF4E8] via-[#FAF2E4] to-[#F5EBDD] p-4 sm:p-6 border border-[#C5A059]/75 shadow-[0_8px_30px_rgba(197,160,89,0.18)]">
        {/* Inner Scalloped Gold Border Line */}
        <div className="absolute inset-2 border border-[#C5A059]/35 rounded-xl pointer-events-none" />

        {/* Top Header Badge Banner */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F5EBDD] border border-[#C5A059] px-4 py-0.5 rounded-full shadow-xs">
          <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            {subtitle}
          </span>
        </div>

        {/* Left Floral Rosette Accent */}
        <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F5EBDD] border border-[#C5A059]/60 flex items-center justify-center text-[#D98894] text-xs shadow-xs pointer-events-none">
          🌸
        </div>

        {/* Right Floral Rosette Accent */}
        <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F5EBDD] border border-[#C5A059]/60 flex items-center justify-center text-[#D98894] text-xs shadow-xs pointer-events-none">
          🌸
        </div>

        {/* Content Inside Cartouche (Scratch card or date) */}
        <div className="relative z-10 pt-2 pb-1 text-center">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
