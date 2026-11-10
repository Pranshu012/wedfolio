'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface RoyalAvatarProps {
  src?: string;
  alt: string;
  fallbackLetter: string;
  className?: string;
  roleTitle?: string;
  shape?: 'circle' | 'arch';
  themeVariant?: 'royal' | 'palace';
}

export function RoyalAvatar({
  src,
  alt,
  fallbackLetter,
  className = 'w-36 h-44 sm:w-44 sm:h-52',
  roleTitle,
  shape = 'arch',
  themeVariant = 'royal',
}: RoyalAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showFallback = !src || hasError;

  const shapeClass = shape === 'arch' ? 'rounded-t-full rounded-b-2xl' : 'rounded-full';
  const isRoyal = themeVariant === 'royal';

  return (
    <div
      className={`relative ${shapeClass} p-1.5 shadow-[0_12px_30px_rgba(91,14,45,0.14)] overflow-hidden flex items-center justify-center transition-transform hover:scale-102 ${
        isRoyal
          ? 'border border-[#D4AF37]/80 bg-gradient-to-b from-[#4A0B24] to-[#2B0514]'
          : 'border border-[#C5A059]/70 bg-gradient-to-b from-[#FAF4E8] to-[#F5ECE0]'
      } ${className}`}
    >
      {/* Inner Decorative Hairline */}
      <div className={`absolute inset-1 border ${shapeClass} pointer-events-none z-10 ${
        isRoyal ? 'border-[#F3D794]/30' : 'border-[#C5A059]/30'
      }`} />

      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${shapeClass} transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      ) : null}

      {showFallback && (
        <div className={`w-full h-full ${shapeClass} flex flex-col items-center justify-center p-4 text-center select-none ${
          isRoyal
            ? 'bg-gradient-to-b from-[#4A0B24] via-[#38061B] to-[#240310] text-[#FDFBF7]'
            : 'bg-gradient-to-b from-[#FAF6EE] via-[#FAF4E8] to-[#F5ECE0] text-[#4A0E17]'
        }`}>
          <span className={`text-4xl sm:text-5xl font-serif font-bold tracking-wider drop-shadow-xs ${
            isRoyal ? 'text-[#F3D794]' : 'text-[#4A0E17]'
          }`}>
            {fallbackLetter}
          </span>
          {roleTitle && (
            <span className={`text-[9px] uppercase font-serif tracking-[0.2em] mt-2 line-clamp-1 font-semibold ${
              isRoyal ? 'text-[#D4AF37]' : 'text-[#6B7C69]'
            }`}>
              {roleTitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

interface RoyalGalleryImageProps {
  src: string;
  alt: string;
  caption?: string;
  index: number;
  onClick?: () => void;
  themeVariant?: 'royal' | 'palace';
}

export function RoyalGalleryImage({
  src,
  alt,
  caption,
  index,
  onClick,
  themeVariant = 'royal',
}: RoyalGalleryImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isPalace = themeVariant === 'palace';

  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isPalace
          ? 'border border-[#C5A059]/45 bg-[#FAF4E8] shadow-[0_6px_18px_rgba(74,14,23,0.06)] hover:border-[#C5A059]'
          : 'border border-[#D4AF37]/50 bg-[#2B0514] shadow-md hover:border-[#D4AF37]'
      }`}
    >
      <div
        className={`aspect-[4/5] w-full overflow-hidden relative flex items-center justify-center ${
          isPalace
            ? 'bg-gradient-to-br from-[#FAF4E8] via-[#FAF6EE] to-[#EFE2D0]'
            : 'bg-gradient-to-br from-[#4A0B24] via-[#5B0E2D] to-[#2B0514]'
        }`}
      >
        {/* If image fails or loading, render royal artistic card */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
            <div
              className={`w-12 h-12 rounded-full border flex items-center justify-center mb-2 shadow ${
                isPalace
                  ? 'border-[#C5A059] bg-[#FAF6EE] text-[#C5A059]'
                  : 'border-[#D4AF37] bg-[#5B0E2D]/60 text-[#D4AF37]'
              }`}
            >
              <Sparkles className={`w-5 h-5 ${isPalace ? 'text-[#C5A059]' : 'text-[#F3D794]'}`} />
            </div>
            <span
              className={`text-xs font-serif uppercase tracking-[0.2em] font-semibold ${
                isPalace ? 'text-[#6B7C69]' : 'text-[#D4AF37]'
              }`}
            >
              Moments • {index + 1}
            </span>
            <p
              className={`text-sm font-serif italic mt-1 line-clamp-2 ${
                isPalace ? 'text-[#4A0E17]' : 'text-[#FDFBF7]'
              }`}
            >
              {caption || 'A treasured memory in celebration'}
            </p>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover Gradient Overlay */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left pointer-events-none ${
            isPalace
              ? 'bg-gradient-to-t from-[#2B0E17]/90 via-[#4A0E17]/35 to-transparent'
              : 'bg-gradient-to-t from-[#1A040D]/90 via-[#4A0B24]/40 to-transparent'
          }`}
        >
          <span
            className={`text-xs font-serif uppercase tracking-wider font-semibold ${
              isPalace ? 'text-[#FAF6EE]' : 'text-[#F3D794]'
            }`}
          >
            Photo {index + 1}
          </span>
          {caption && (
            <p className="text-[#FDFBF7] text-sm font-serif line-clamp-2 mt-0.5">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
