'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface RoyalAvatarProps {
  src?: string;
  alt: string;
  fallbackLetter: string;
  className?: string;
  roleTitle?: string;
}

export function RoyalAvatar({
  src,
  alt,
  fallbackLetter,
  className = 'w-36 h-36 sm:w-44 sm:h-44',
  roleTitle,
}: RoyalAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showFallback = !src || hasError;

  return (
    <div
      className={`relative rounded-full border-4 border-[#D4AF37] p-1 shadow-2xl overflow-hidden bg-gradient-to-br from-[#5B0E2D] to-[#3B071C] flex items-center justify-center ${className}`}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover rounded-full transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      ) : null}

      {showFallback && (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#5B0E2D] via-[#4A0B24] to-[#2B0514] flex flex-col items-center justify-center p-3 text-center border border-[#F3D794]/40 select-none">
          <span className="text-3xl sm:text-4xl font-serif font-bold text-[#F3D794] tracking-wider drop-shadow-md">
            {fallbackLetter}
          </span>
          {roleTitle && (
            <span className="text-[9px] uppercase font-serif tracking-widest text-[#D4AF37]/90 mt-1 line-clamp-1">
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
}

export function RoyalGalleryImage({
  src,
  alt,
  caption,
  index,
  onClick,
}: RoyalGalleryImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-[#D4AF37]/60 shadow-md bg-[#2B0514] transition-all duration-300 hover:shadow-2xl hover:border-[#D4AF37] hover:-translate-y-1"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-[#4A0B24] via-[#5B0E2D] to-[#2B0514] relative flex items-center justify-center">
        {/* If image fails or loading, render royal artistic card */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-2 bg-[#5B0E2D]/60 shadow">
              <Sparkles className="w-5 h-5 text-[#F3D794]" />
            </div>
            <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Moments • {index + 1}
            </span>
            <p className="text-sm font-serif italic text-[#FDFBF7] mt-1 line-clamp-2">
              {caption || 'A royal memory in celebration'}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A040D]/90 via-[#4A0B24]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left pointer-events-none">
          <span className="text-[#F3D794] text-xs font-serif uppercase tracking-wider font-semibold">
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
