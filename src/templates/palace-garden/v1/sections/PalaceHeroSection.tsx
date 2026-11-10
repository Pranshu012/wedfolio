'use client';

import React from 'react';
import { CornerBotanicals } from '../components/CornerBotanicals';
import { PalaceHeroIllustration } from '../components/PalaceHeroIllustration';
import { MuhuratCartouche } from '../components/MuhuratCartouche';
import { PalaceOpeningEnvelope } from '../components/PalaceOpeningEnvelope';
import { SectionDivider } from '../components/SectionDivider';
import { ScratchDateReveal } from '@/components/interactive/scratch-reveal/ScratchDateReveal';
import type { PublicWeddingSnapshot } from '@/modules/publishing/domain/public-snapshot.schema';

interface PalaceHeroSectionProps {
  content: PublicWeddingSnapshot;
}

export function PalaceHeroSection({ content }: PalaceHeroSectionProps) {
  const coupleNames = `${content.couple.bride.fullName} & ${content.couple.groom.fullName}`;

  return (
    <header className="relative min-h-[92vh] flex flex-col items-center justify-between text-center pt-8 sm:pt-14 overflow-hidden bg-gradient-to-b from-[#FAF6EE] via-[#FAF4E8] to-[#F5ECE0]">
      {/* 1. Corner Watercolor Botanical Roses (Top Left & Top Right) */}
      <CornerBotanicals />

      {/* 2. Interactive Wax Seal Opening Envelope Modal */}
      <PalaceOpeningEnvelope
        sealText={content.interactive?.envelopeSealText || 'S & P'}
        weddingTitle={content.weddingTitle}
        coupleNames={coupleNames}
      />

      {/* 3. Central Content Area (Kept clean for supreme readability) */}
      <div className="relative z-20 px-4 max-w-2xl mx-auto flex flex-col items-center mt-2 sm:mt-4">
        {/* Sacred Traditional Mantra */}
        <div className="mb-2">
          <span className="text-[#C5A059] text-xs sm:text-sm font-serif tracking-[0.3em] uppercase font-semibold">
            || Shree Ganeshay Namah ||
          </span>
        </div>

        {/* Sacred Antique Gold Ganesha Line-art Emblem */}
        <div className="my-1.5 flex items-center justify-center">
          <img
            src="/themes/palace-garden/ganesha-gold.svg"
            alt="Lord Ganesha Emblem"
            className="w-12 h-12 sm:w-14 sm:h-14 opacity-90"
          />
        </div>

        {/* Traditional Families Subtitle */}
        <p className="text-[#6B7C69] text-xs sm:text-sm uppercase tracking-[0.25em] font-serif mt-2 font-medium">
          Together with their families
        </p>

        {/* Grand Couple Names in Deep Wine Serif */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#4A0E17] tracking-wide mt-2 sm:mt-3 drop-shadow-xs px-2">
          {coupleNames}
        </h1>

        {/* Poetic Tagline */}
        <p className="text-sm sm:text-base md:text-lg font-serif italic text-stone-700 max-w-lg mx-auto mt-2.5 sm:mt-3.5 px-4 font-light leading-relaxed">
          &ldquo;Two souls, one destiny, united in royal harmony and eternal love.&rdquo;
        </p>

        {/* Antique Gold Ornamental Divider */}
        <SectionDivider className="my-2 sm:my-3" />

        {/* Save The Auspicious Date Callout */}
        <p className="text-[#C5A059] text-xs sm:text-sm uppercase tracking-[0.25em] font-serif font-semibold">
          Save The Auspicious Date
        </p>

        {/* 4. Scalloped Muhurat Cartouche wrapping Scratch Date Reveal */}
        <MuhuratCartouche subtitle="WEDDING MUHURAT">
          <ScratchDateReveal
            revealText="Saturday, 12th December 2026"
            subText="Auspicious Wedding Muhurat"
            muhuratTime="Godhuli Bela • 06:00 PM onwards"
          />
        </MuhuratCartouche>
      </div>

      {/* 5. Bottom Anchored Palace, Peacocks, Garden Palms & Couple Illustration */}
      <PalaceHeroIllustration />
    </header>
  );
}
