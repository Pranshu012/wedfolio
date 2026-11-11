'use client';

import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { PublicFamilyMember } from '@/modules/publishing/domain/public-snapshot.schema';
import { SectionDivider } from '../components/SectionDivider';
import { MOTION_EASINGS, getHeadingVariants } from '@/lib/design-system/motion';

interface PalaceFamilySectionProps {
  family: PublicFamilyMember[];
}

export function PalaceFamilySection({ family }: PalaceFamilySectionProps) {
  const [activeSide, setActiveSide] = useState<'all' | 'bride' | 'groom'>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredMembers =
    activeSide === 'all'
      ? family
      : family.filter((member) => member.side === activeSide);

  return (
    <section className="py-14 sm:py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Heading */}
      <motion.div
        className="text-center mb-10 sm:mb-14"
        variants={getHeadingVariants(!!shouldReduceMotion)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.3em] font-semibold">
          Kutumb Sambandh
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4A0E17] font-medium mt-1">
          The Blessed Families
        </h2>
        <SectionDivider />

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveSide('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
              activeSide === 'all'
                ? 'bg-[#4A0E17] text-[#FAF6EE] shadow-sm'
                : 'bg-[#FAF4E8] text-stone-700 hover:bg-[#EFE2D0] border border-[#C5A059]/40'
            }`}
          >
            All Families
          </button>
          <button
            onClick={() => setActiveSide('bride')}
            className={`px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
              activeSide === 'bride'
                ? 'bg-[#6B7C69] text-[#FAF6EE] shadow-sm'
                : 'bg-[#FAF4E8] text-stone-700 hover:bg-[#EFE2D0] border border-[#C5A059]/40'
            }`}
          >
            Bride&apos;s Side
          </button>
          <button
            onClick={() => setActiveSide('groom')}
            className={`px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
              activeSide === 'groom'
                ? 'bg-[#6B7C69] text-[#FAF6EE] shadow-sm'
                : 'bg-[#FAF4E8] text-stone-700 hover:bg-[#EFE2D0] border border-[#C5A059]/40'
            }`}
          >
            Groom&apos;s Side
          </button>
        </div>
      </motion.div>

      {/* Family Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((member, idx) => (
            <motion.div
              layout
              key={member.name + member.relation + idx}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.45,
                ease: MOTION_EASINGS.ceremonial,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.22 } }}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#FAF4E8] to-[#EFE5D5] border border-[#C5A059]/40 shadow-[0_6px_20px_rgba(74,14,23,0.06)] hover:shadow-[0_12px_30px_rgba(74,14,23,0.1)] flex flex-col justify-between transition-shadow relative overflow-hidden"
            >
              {/* Corner delicate botanical floral accents */}
              <div className="absolute top-0 right-0 w-7 h-7 pointer-events-none opacity-20 border-t-2 border-r-2 border-[#C5A059] rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-7 h-7 pointer-events-none opacity-20 border-b-2 border-l-2 border-[#C5A059] rounded-bl-2xl" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#6B7C69] font-serif font-bold">
                    {member.relation}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF4E8] text-[#C5A059] border border-[#C5A059]/40 font-serif">
                    {member.side === 'bride' ? "Bride's Side" : "Groom's Side"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#4A0E17]">
                  {member.name}
                </h3>
                {member.blessingMessage && (
                  <p className="text-sm font-serif italic text-stone-700 mt-3 leading-relaxed">
                    &ldquo;{member.blessingMessage}&rdquo;
                  </p>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-[#C5A059]/25 flex items-center gap-1.5 text-xs font-serif text-[#C5A059]">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>With heartfelt blessings &amp; love</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
