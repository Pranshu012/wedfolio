'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Heart } from 'lucide-react';
import type { PublicCouple } from '@/modules/publishing/domain/public-snapshot.schema';
import { RoyalAvatar } from '@/components/shared/RoyalImage';
import { SectionDivider } from '../components/SectionDivider';
import { MOTION_EASINGS, getHeadingVariants } from '@/lib/design-system/motion';

interface PalaceStorySectionProps {
  couple: PublicCouple;
}

export function PalaceStorySection({ couple }: PalaceStorySectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-14 sm:py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Heading */}
      <motion.div
        className="text-center mb-12 sm:mb-16"
        variants={getHeadingVariants(!!shouldReduceMotion)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.3em] font-semibold">
          The Blessed Couple
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4A0E17] font-medium mt-1">
          Bride &amp; Groom
        </h2>
        <SectionDivider />
      </motion.div>

      {/* Couple Dual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
        {/* The Bride: Shreya */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: MOTION_EASINGS.ceremonial }}
          whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.22 } }}
          className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#FAF6EE] to-[#F5ECE0] border border-[#C5A059]/45 shadow-[0_8px_24px_rgba(74,14,23,0.06)] hover:shadow-[0_16px_36px_rgba(74,14,23,0.12)] relative overflow-hidden transition-all"
        >
          {/* Subtle botanical corner lines */}
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-20 border-t-2 border-r-2 border-[#C5A059] rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none opacity-20 border-b-2 border-l-2 border-[#C5A059] rounded-bl-2xl" />

          <div className="mb-6">
            <RoyalAvatar
              src={couple.bride.avatarUrl}
              alt={couple.bride.fullName}
              fallbackLetter="S"
              roleTitle="The Royal Bride"
              shape="arch"
              themeVariant="palace"
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
        </motion.div>

        {/* The Groom: Pranshu */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: MOTION_EASINGS.ceremonial }}
          whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.22 } }}
          className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#FAF6EE] to-[#F5ECE0] border border-[#C5A059]/45 shadow-[0_8px_24px_rgba(74,14,23,0.06)] hover:shadow-[0_16px_36px_rgba(74,14,23,0.12)] relative overflow-hidden transition-all"
        >
          {/* Subtle botanical corner lines */}
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-20 border-t-2 border-r-2 border-[#C5A059] rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none opacity-20 border-b-2 border-l-2 border-[#C5A059] rounded-bl-2xl" />

          <div className="mb-6">
            <RoyalAvatar
              src={couple.groom.avatarUrl}
              alt={couple.groom.fullName}
              fallbackLetter="P"
              roleTitle="The Royal Groom"
              shape="arch"
              themeVariant="palace"
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
        </motion.div>
      </div>

      {/* Shared Love Story Narrative */}
      {couple.story && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: MOTION_EASINGS.ceremonial }}
          className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#FAF4E8] via-[#FAF6EE] to-[#FAF4E8] border border-[#C5A059]/40 shadow-[0_6px_20px_rgba(74,14,23,0.05)]"
        >
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
        </motion.div>
      )}
    </section>
  );
}
