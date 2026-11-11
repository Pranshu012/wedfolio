'use client';

import React from 'react';
import { assetUrl } from '@/lib/utils';

interface ParchmentBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ParchmentBackground({ children, className = '', style }: ParchmentBackgroundProps) {
  return (
    <div
      className={`relative min-h-screen bg-[#F5EBDD] text-[#4A0E17] ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.5) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(220, 205, 185, 0.45) 0%, transparent 60%),
          url('${assetUrl('/themes/palace-garden/vintage-parchment-texture.jpg')}')
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto, auto, 800px 800px',
        ...style,
      }}
    >
      {/* Soft Vintage Vignette around Viewport Edges */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-35"
        style={{
          boxShadow: 'inset 0 0 140px 40px rgba(184, 150, 98, 0.16)',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
