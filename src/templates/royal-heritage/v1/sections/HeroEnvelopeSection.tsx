'use client';

import React from 'react';
import { OpeningEnvelope } from '@/components/interactive/opening-envelope/OpeningEnvelope';
import { ScratchDateReveal } from '@/components/interactive/scratch-reveal/ScratchDateReveal';
import type { PublicWeddingSnapshot } from '@/modules/publishing/domain/public-snapshot.schema';

interface HeroEnvelopeSectionProps {
  content: PublicWeddingSnapshot;
}

export function HeroEnvelopeSection({ content }: HeroEnvelopeSectionProps) {
  const coupleNames = `${content.couple.bride.fullName} & ${content.couple.groom.fullName}`;

  return (
    <header className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 sm:py-20 overflow-hidden bg-gradient-to-b from-[#1F030E] via-[#4A0B24] to-[#FDFBF7]">
      {/* Interactive Wax Seal Opening Envelope Modal */}
      <OpeningEnvelope
        sealText={content.interactive?.envelopeSealText || 'S & P'}
        weddingTitle={content.weddingTitle}
        coupleNames={coupleNames}
      />

      {/* Decorative Traditional Invocation */}
      <div className="mb-3">
        <span className="text-[#D4AF37] text-xs sm:text-sm font-serif tracking-[0.3em] uppercase font-semibold">
          || Shree Ganeshay Namah ||
        </span>
      </div>

      {/* Ornate Mandala Gold Emblem */}
      <div className="my-2 flex items-center justify-center">
        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-[#D4AF37] p-1 shadow-lg bg-[#5B0E2D]/70 flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-[#F3D794]/60 flex items-center justify-center text-[#D4AF37] text-base sm:text-lg font-serif">
            ✦
          </div>
        </div>
      </div>

      {/* Royal Subtitle */}
      <p className="text-[#E0C097] text-xs sm:text-sm uppercase tracking-[0.25em] font-serif mt-2">
        Together with their families
      </p>

      {/* Grand Couple Names (Responsive for 360px, 390px, and Desktop) */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FDFBF7] tracking-wide mt-2 sm:mt-3 drop-shadow-md px-2">
        {coupleNames}
      </h1>

      {/* Tagline / Subtitle */}
      <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#F3D794] max-w-xl mx-auto mt-3 sm:mt-4 px-4 font-light">
        &ldquo;Two souls, one destiny, united in royal harmony and eternal love.&rdquo;
      </p>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 my-5 sm:my-6">
        <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        <span className="text-[#D4AF37] text-sm">❦</span>
        <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      {/* Interactive Scratch-To-Reveal Wedding Date */}
      <ScratchDateReveal
        revealText="Saturday, 12th December 2026"
        subText="Save The Auspicious Date"
        muhuratTime="Godhuli Bela • 06:00 PM onwards"
      />
    </header>
  );
}
