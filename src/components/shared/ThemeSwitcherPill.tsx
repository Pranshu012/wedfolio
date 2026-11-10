'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface ThemeSwitcherPillProps {
  currentTemplate: string;
  slug: string;
}

export function ThemeSwitcherPill({ currentTemplate, slug }: ThemeSwitcherPillProps) {
  const isPalaceGarden = currentTemplate === 'palace-garden';

  return (
    <aside
      aria-label="Theme Variation Switcher"
      className="fixed bottom-4 left-4 z-40 select-none print:hidden"
    >
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FAF6EE]/90 backdrop-blur-md border border-[#C5A059] shadow-lg text-xs font-serif">
        <Link
          href={`/w/${slug}?template=palace-garden`}
          className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
            isPalaceGarden
              ? 'bg-[#4A0E17] text-[#FAF6EE] font-bold shadow-xs'
              : 'text-stone-700 hover:text-[#4A0E17]'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#C5A059]" />
          <span>Palace Garden</span>
        </Link>

        <Link
          href={`/w/${slug}?template=royal-heritage`}
          className={`px-3 py-1 rounded-full transition-all ${
            !isPalaceGarden
              ? 'bg-[#5B0E2D] text-[#FAF6EE] font-bold shadow-xs'
              : 'text-stone-700 hover:text-[#5B0E2D]'
          }`}
        >
          <span>Royal Heritage</span>
        </Link>
      </div>
    </aside>
  );
}
