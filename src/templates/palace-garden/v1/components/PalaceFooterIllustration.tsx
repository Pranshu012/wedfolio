'use client';

import React from 'react';

export function PalaceFooterIllustration() {
  return (
    <div className="pointer-events-none relative w-full overflow-hidden select-none py-4">
      <div className="w-full max-w-lg mx-auto flex justify-center opacity-85">
        <img
          src="/themes/palace-garden/palace-footer-garden.png"
          alt="Palace Garden Pavilions and Botanical Flora"
          className="w-full max-w-[380px] sm:max-w-[460px] h-[160px] sm:h-[220px] object-cover object-bottom"
          style={{
            maskImage: 'radial-gradient(ellipse at 50% 80%, black 50%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 80%, black 50%, transparent 95%)',
          }}
        />
      </div>
    </div>
  );
}
