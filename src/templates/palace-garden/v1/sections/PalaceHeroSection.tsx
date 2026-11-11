'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CornerBotanicals } from '../components/CornerBotanicals';
import { PalaceHeroIllustration } from '../components/PalaceHeroIllustration';
import { MuhuratCartouche } from '../components/MuhuratCartouche';
import { PalaceOpeningEnvelope } from '../components/PalaceOpeningEnvelope';
import { SectionDivider } from '../components/SectionDivider';
import { ScratchDateReveal } from '@/components/interactive/scratch-reveal/ScratchDateReveal';
import type { PublicWeddingSnapshot } from '@/modules/publishing/domain/public-snapshot.schema';
import { MOTION_EASINGS } from '@/lib/design-system/motion';
import { assetUrl } from '@/lib/utils';

interface PalaceHeroSectionProps {
  content: PublicWeddingSnapshot;
}

export function PalaceHeroSection({ content }: PalaceHeroSectionProps) {
  const coupleNames = `${content.couple.bride.fullName} & ${content.couple.groom.fullName}`;
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="relative min-h-[96vh] sm:min-h-screen flex flex-col items-center justify-start text-center pt-8 sm:pt-14 pb-20 sm:pb-32 overflow-hidden bg-[#F5EBDD]">
      {/* 1. Continuous Royal Watercolor Palace Garden Background Layer (Desktop & Mobile) */}
      <PalaceHeroIllustration />

      {/* 2. Corner Watercolor Botanical Roses (Top Left & Top Right) */}
      <CornerBotanicals />

      {/* 3. Interactive Wax Seal Opening Envelope Modal */}
      <PalaceOpeningEnvelope
        sealText={content.interactive?.envelopeSealText || 'S & P'}
        weddingTitle={content.weddingTitle}
        coupleNames={coupleNames}
      />

      {/* 4. Central Content Area (Kept clean for supreme readability in the upper parchment zone) */}
      <div className="relative z-20 px-4 max-w-2xl mx-auto flex flex-col items-center mt-2 sm:mt-4">
        {/* Sacred Traditional Mantra */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: MOTION_EASINGS.ceremonial }}
          className="mb-2"
        >
          <span className="text-[#C5A059] text-xs sm:text-sm font-serif tracking-[0.3em] uppercase font-semibold">
            || Shree Ganeshay Namah ||
          </span>
        </motion.div>

        {/* Sacred Antique Gold Ganesha Line-art Emblem */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: MOTION_EASINGS.ceremonial }}
          className="my-1.5 flex items-center justify-center"
        >
          <img
            src={assetUrl('/themes/palace-garden/ganesha-gold.svg')}
            alt="Lord Ganesha Emblem"
            className="w-12 h-12 sm:w-14 sm:h-14 opacity-90"
          />
        </motion.div>

        {/* Traditional Families Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: MOTION_EASINGS.ceremonial }}
          className="text-[#6B7C69] text-xs sm:text-sm uppercase tracking-[0.25em] font-serif mt-2 font-medium"
        >
          Together with their families
        </motion.p>

        {/* Grand Couple Names in Deep Wine Serif */}
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: MOTION_EASINGS.ceremonial }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#4A0E17] tracking-wide mt-2 sm:mt-3 drop-shadow-xs px-2"
        >
          {coupleNames}
        </motion.h1>

        {/* Poetic Tagline */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: MOTION_EASINGS.ceremonial }}
          className="text-sm sm:text-base md:text-lg font-serif italic text-stone-700 max-w-lg mx-auto mt-2.5 sm:mt-3.5 px-4 font-light leading-relaxed"
        >
          &ldquo;Two souls, one destiny, united in royal harmony and eternal love.&rdquo;
        </motion.p>

        {/* Antique Gold Ornamental Divider */}
        <SectionDivider className="my-2 sm:my-3" />

        {/* Save The Auspicious Date Callout */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-[#C5A059] text-xs sm:text-sm uppercase tracking-[0.25em] font-serif font-semibold"
        >
          Save The Auspicious Date
        </motion.p>

        {/* 4. Scalloped Muhurat Cartouche wrapping Scratch Date Reveal */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: MOTION_EASINGS.ceremonial }}
        >
          <MuhuratCartouche subtitle="WEDDING MUHURAT">
            <ScratchDateReveal
              revealText="Saturday, 12th December 2026"
              subText="Auspicious Wedding Muhurat"
              muhuratTime="Godhuli Bela • 06:00 PM onwards"
            />
          </MuhuratCartouche>
        </motion.div>
      </div>
    </header>
  );
}
