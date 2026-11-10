'use client';

import React from 'react';
import { assetUrl } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`flex items-center justify-center my-4 ${className}`} aria-hidden="true">
      <img
        src={assetUrl('/themes/palace-garden/section-divider.svg')}
        alt=""
        className="w-48 sm:w-64 h-auto opacity-80"
      />
    </div>
  );
}
