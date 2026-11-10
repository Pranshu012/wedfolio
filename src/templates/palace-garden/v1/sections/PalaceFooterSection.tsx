'use client';

import React from 'react';
import { PalaceFooterIllustration } from '../components/PalaceFooterIllustration';

interface PalaceFooterSectionProps {
  coupleNames: string;
}

export function PalaceFooterSection({ coupleNames }: PalaceFooterSectionProps) {
  return (
    <footer className="relative pt-16 pb-12 px-4 text-center bg-gradient-to-t from-[#FAF4E8] via-[#FAF6EE] to-transparent border-t-2 border-[#C5A059]/60">
      <div className="max-w-md mx-auto flex flex-col items-center relative z-10">
        <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.3em] font-semibold">
          || Subham Bhavatu ||
        </span>
        <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] mt-2">
          {coupleNames}
        </h4>
        <p className="text-xs sm:text-sm font-serif italic text-stone-600 mt-2 max-w-sm">
          Thank you for showering your gracious blessings on our eternal union.
        </p>

        {/* Palace Pavilion Footer Garden Illustration */}
        <div className="my-4 w-full">
          <PalaceFooterIllustration />
        </div>

        <div className="text-[11px] font-serif text-[#6B7C69] uppercase tracking-widest mt-2">
          Crafted with Royal Elegance on Wedfolio
        </div>
      </div>
    </footer>
  );
}
