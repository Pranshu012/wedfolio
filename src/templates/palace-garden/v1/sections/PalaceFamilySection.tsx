'use client';

import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import type { PublicFamilyMember } from '@/modules/publishing/domain/public-snapshot.schema';
import { SectionDivider } from '../components/SectionDivider';

interface PalaceFamilySectionProps {
  family: PublicFamilyMember[];
}

export function PalaceFamilySection({ family }: PalaceFamilySectionProps) {
  const [activeSide, setActiveSide] = useState<'all' | 'bride' | 'groom'>('all');

  const filteredMembers =
    activeSide === 'all'
      ? family
      : family.filter((member) => member.side === activeSide);

  return (
    <section className="py-14 sm:py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-10 sm:mb-14">
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
      </div>

      {/* Family Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredMembers.map((member, idx) => (
          <div
            key={member.name || idx}
            className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#FAF6EE] to-[#F5ECE0] border-2 border-[#C5A059]/50 shadow-md flex flex-col justify-between group hover:border-[#C5A059] transition-all"
          >
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

            <div className="mt-5 pt-3 border-t border-[#C5A059]/30 flex items-center gap-1.5 text-xs font-serif text-[#C5A059]">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>With heartfelt blessings &amp; love</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
