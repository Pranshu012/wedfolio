'use client';

import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import type { PublicFamilyMember } from '@/modules/publishing/domain/public-snapshot.schema';

interface RoyalFamilySectionProps {
  family: PublicFamilyMember[];
}

export function RoyalFamilySection({ family }: RoyalFamilySectionProps) {
  const [activeSide, setActiveSide] = useState<'all' | 'bride' | 'groom'>('all');

  const filteredMembers =
    activeSide === 'all'
      ? family
      : family.filter((m) => m.side === activeSide);

  const brideCount = family.filter((m) => m.side === 'bride').length;
  const groomCount = family.filter((m) => m.side === 'groom').length;

  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto bg-[#FDFBF7]">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em]">
          With Sacred Blessings
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#5B0E2D] font-medium mt-2">
          Family Introductions
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-px w-16 bg-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">✦</span>
          <div className="h-px w-16 bg-[#D4AF37]/50" />
        </div>
        <p className="text-sm md:text-base font-serif italic text-stone-600 max-w-lg mx-auto">
          The pillar of our values, heritage, and eternal support
        </p>
      </div>

      {/* Side Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveSide('all')}
          className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-widest transition-all ${
            activeSide === 'all'
              ? 'bg-[#5B0E2D] text-[#F3D794] border-2 border-[#D4AF37] shadow-md'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
          }`}
        >
          All Families
        </button>
        <button
          onClick={() => setActiveSide('bride')}
          className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-widest transition-all ${
            activeSide === 'bride'
              ? 'bg-[#5B0E2D] text-[#F3D794] border-2 border-[#D4AF37] shadow-md'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
          }`}
        >
          Bride&apos;s Family ({brideCount})
        </button>
        <button
          onClick={() => setActiveSide('groom')}
          className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-widest transition-all ${
            activeSide === 'groom'
              ? 'bg-[#5B0E2D] text-[#F3D794] border-2 border-[#D4AF37] shadow-md'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
          }`}
        >
          Groom&apos;s Family ({groomCount})
        </button>
      </div>

      {/* Family Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMembers.map((member, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#FDFBF7] to-[#F5ECE0] border border-[#D4AF37]/60 shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between"
          >
            {/* Side Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-serif font-bold text-[#D4AF37] bg-[#5B0E2D] px-2.5 py-1 rounded-full">
                {member.side === 'bride' ? "Bride's Side" : "Groom's Side"}
              </span>
              <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <div>
              <h4 className="text-xl font-serif font-bold text-[#5B0E2D]">
                {member.name}
              </h4>
              <p className="text-xs uppercase tracking-wider font-serif text-[#0B3C2D] font-semibold mt-0.5">
                {member.relation}
              </p>
              {member.blessingMessage && (
                <p className="text-sm font-serif italic text-stone-700 mt-3 leading-relaxed border-l-2 border-[#D4AF37]/70 pl-3">
                  &ldquo;{member.blessingMessage}&rdquo;
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
