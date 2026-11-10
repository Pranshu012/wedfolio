'use client';

import React from 'react';

interface ParchmentBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ParchmentBackground({ children, className = '', style }: ParchmentBackgroundProps) {
  return (
    <div
      className={`relative min-h-screen bg-[#FAF6EE] text-[#4A0E17] ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.7) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(232, 223, 208, 0.4) 0%, transparent 60%),
          url('/themes/palace-garden/parchment-pattern.svg')
        `,
        backgroundRepeat: 'repeat',
        ...style,
      }}
    >
      {/* Soft Vignette around Viewport Edges */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          boxShadow: 'inset 0 0 120px 40px rgba(197, 160, 89, 0.12)',
        }}
      />
      {children}
    </div>
  );
}
