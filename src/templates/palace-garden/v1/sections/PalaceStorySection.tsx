'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import type { PublicCouple } from '@/modules/publishing/domain/public-snapshot.schema';
import { RoyalAvatar } from '@/components/shared/RoyalImage';
import { SectionDivider } from '../components/SectionDivider';

interface PalaceStorySectionProps {
  couple: PublicCouple;
}

export function PalaceStorySection({ couple }: PalaceStorySectionProps) {
  return (
    <section className="py-14 sm:py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.3em] font-semibold">
          The Blessed Couple
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4A0E17] font-medium mt-1">
          Bride &amp; Groom
        </h2>
        <SectionDivider />
      </div>

      {/* Couple Dual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
        {/* The Bride: Shreya */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FAF6EE] to-[#F5ECE0] border-2 border-[#C5A059]/60 shadow-lg relative overflow-hidden group hover:border-[#C5A059] transition-all">
          <div className="mb-6">
            <RoyalAvatar
              src={couple.bride.avatarUrl}
              alt={couple.bride.fullName}
              fallbackLetter="S"
              roleTitle="The Royal Bride"
            />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#6B7C69] font-serif font-bold">
            The Royal Bride
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] mt-1">
            {couple.bride.fullName}
          </h3>
          <p className="text-sm sm:text-base font-serif italic text-stone-700 mt-3 leading-relaxed max-w-sm">
            {couple.bride.bio ||
              'A graceful soul with an infectious smile, bringing elegance, laughter, and light into every room she enters.'}
          </p>
        </div>

        {/* The Groom: Pranshu */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FAF6EE] to-[#F5ECE0] border-2 border-[#C5A059]/60 shadow-lg relative overflow-hidden group hover:border-[#C5A059] transition-all">
          <div className="mb-6">
            <RoyalAvatar
              src={couple.groom.avatarUrl}
              alt={couple.groom.fullName}
              fallbackLetter="P"
              roleTitle="The Royal Groom"
            />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#6B7C69] font-serif font-bold">
            The Royal Groom
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] mt-1">
            {couple.groom.fullName}
          </h3>
          <p className="text-sm sm:text-base font-serif italic text-stone-700 mt-3 leading-relaxed max-w-sm">
            {couple.groom.bio ||
              'A visionary thinker with a compassionate heart, deeply devoted to building a wondrous life and shared adventures.'}
          </p>
        </div>
      </div>

      {/* Shared Love Story Narrative */}
      {couple.story && (
        <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FAF4E8] via-[#FAF6EE] to-[#FAF4E8] border border-[#C5A059]/50 shadow-md">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-[#D98894] fill-[#D98894]" />
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
              Our Journey
            </span>
            <Heart className="w-4 h-4 text-[#D98894] fill-[#D98894]" />
          </div>
          <p className="text-base sm:text-lg font-serif italic text-[#4A0E17] leading-relaxed">
            &ldquo;{couple.story}&rdquo;
          </p>
        </div>
      )}
    </section>
  );
}
