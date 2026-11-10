'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { OpeningEnvelope } from '@/components/interactive/opening-envelope/OpeningEnvelope';
import { ScratchDateReveal } from '@/components/interactive/scratch-reveal/ScratchDateReveal';
import type { PublicWeddingSnapshot } from '@/modules/publishing/domain/public-snapshot.schema';
import { MOTION_EASINGS } from '@/lib/design-system/motion';

interface HeroEnvelopeSectionProps {
  content: PublicWeddingSnapshot;
}

export function HeroEnvelopeSection({ content }: HeroEnvelopeSectionProps) {
  const coupleNames = `${content.couple.bride.fullName} & ${content.couple.groom.fullName}`;
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-4 py-14 sm:py-20 overflow-hidden bg-gradient-to-b from-[#1F030E] via-[#4A0B24] to-[#FDFBF7]">
      {/* Interactive Wax Seal Opening Envelope Modal */}
      <OpeningEnvelope
        sealText={content.interactive?.envelopeSealText || 'S & P'}
        weddingTitle={content.weddingTitle}
        coupleNames={coupleNames}
      />

      {/* Decorative Traditional Invocation */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: MOTION_EASINGS.ceremonial }}
        className="mb-3"
      >
        <span className="text-[#D4AF37] text-xs sm:text-sm font-serif tracking-[0.3em] uppercase font-semibold">
          || Shree Ganeshay Namah ||
        </span>
      </motion.div>

      {/* Ornate Mandala Gold Emblem */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: MOTION_EASINGS.ceremonial }}
        className="my-2 flex items-center justify-center"
      >
        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-[#D4AF37] p-1 shadow-lg bg-[#5B0E2D]/70 flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-[#F3D794]/60 flex items-center justify-center text-[#D4AF37] text-base sm:text-lg font-serif">
            ✦
          </div>
        </div>
      </motion.div>

      {/* Royal Subtitle */}
      <motion.p
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: MOTION_EASINGS.ceremonial }}
        className="text-[#E0C097] text-xs sm:text-sm uppercase tracking-[0.25em] font-serif mt-2"
      >
        Together with their families
      </motion.p>

      {/* Grand Couple Names (Responsive for 360px, 390px, and Desktop) */}
      <motion.h1
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.3, ease: MOTION_EASINGS.ceremonial }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FDFBF7] tracking-wide mt-2 sm:mt-3 drop-shadow-md px-2"
      >
        {coupleNames}
      </motion.h1>

      {/* Tagline / Subtitle */}
      <motion.p
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: MOTION_EASINGS.ceremonial }}
        className="text-sm sm:text-base md:text-lg font-serif italic text-[#F3D794] max-w-xl mx-auto mt-3 sm:mt-4 px-4 font-light"
      >
        &ldquo;Two souls, one destiny, united in royal harmony and eternal love.&rdquo;
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55, ease: MOTION_EASINGS.ceremonial }}
        className="flex items-center justify-center gap-3 my-5 sm:my-6"
      >
        <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        <span className="text-[#D4AF37] text-sm">❦</span>
        <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </motion.div>

      {/* Interactive Scratch-To-Reveal Wedding Date */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: MOTION_EASINGS.ceremonial }}
      >
        <ScratchDateReveal
          revealText="Saturday, 12th December 2026"
          subText="Save The Auspicious Date"
          muhuratTime="Godhuli Bela • 06:00 PM onwards"
        />
      </motion.div>
    </header>
  );
}
