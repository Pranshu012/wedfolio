'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import type { PublicCouple } from '@/modules/publishing/domain/public-snapshot.schema';
import { RoyalAvatar } from '@/components/shared/RoyalImage';

interface CoupleStorySectionProps {
  couple: PublicCouple;
}

export function CoupleStorySection({ couple }: CoupleStorySectionProps) {
  return (
    <section className="py-14 sm:py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em]">
          The Blessed Couple
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#5B0E2D] font-medium mt-2">
          Bride &amp; Groom
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-px w-16 bg-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">✦</span>
          <div className="h-px w-16 bg-[#D4AF37]/50" />
        </div>
      </div>

      {/* Couple Dual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
        {/* The Bride: Shreya */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FDFBF7] to-[#F7F1E5] border-2 border-[#D4AF37]/60 shadow-xl relative overflow-hidden group hover:border-[#D4AF37] transition-all">
          <div className="mb-6">
            <RoyalAvatar
              src={couple.bride.avatarUrl}
              alt={couple.bride.fullName}
              fallbackLetter="S"
              roleTitle="The Royal Bride"
            />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold">
            The Royal Bride
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5B0E2D] mt-1">
            {couple.bride.fullName}
          </h3>
          <p className="text-sm sm:text-base font-serif italic text-stone-700 mt-3 leading-relaxed max-w-sm">
            {couple.bride.bio ||
              'A graceful soul with an infectious smile, bringing elegance, laughter, and light into every room she enters.'}
          </p>
        </div>

        {/* The Groom: Pranshu */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FDFBF7] to-[#F7F1E5] border-2 border-[#D4AF37]/60 shadow-xl relative overflow-hidden group hover:border-[#D4AF37] transition-all">
          <div className="mb-6">
            <RoyalAvatar
              src={couple.groom.avatarUrl}
              alt={couple.groom.fullName}
              fallbackLetter="P"
              roleTitle="The Royal Groom"
            />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold">
            The Royal Groom
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5B0E2D] mt-1">
            {couple.groom.fullName}
          </h3>
          <p className="text-sm sm:text-base font-serif italic text-stone-700 mt-3 leading-relaxed max-w-sm">
            {couple.groom.bio ||
              'A visionary thinker with a compassionate heart, deeply devoted to building a wondrous life and shared adventures.'}
          </p>
        </div>
      </div>

      {/* Love Story Box */}
      {couple.story && (
        <div className="mt-12 sm:mt-16 p-6 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-r from-[#5B0E2D] via-[#4A0B24] to-[#5B0E2D] border-2 border-[#D4AF37] shadow-2xl text-center text-[#FDFBF7] max-w-3xl mx-auto relative overflow-hidden">
          <Heart className="w-6 h-6 text-[#D4AF37] mx-auto mb-3 fill-current" />
          <h4 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-[#F3D794] tracking-wide">
            Our Love Story
          </h4>
          <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#FDFBF7]/90 mt-3 sm:mt-4 leading-relaxed">
            &ldquo;{couple.story}&rdquo;
          </p>
        </div>
      )}
    </section>
  );
}
