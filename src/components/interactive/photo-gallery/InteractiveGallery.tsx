'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PublicGalleryItem } from '@/modules/publishing/domain/public-snapshot.schema';
import { RoyalGalleryImage } from '@/components/shared/RoyalImage';

interface InteractiveGalleryProps {
  items: PublicGalleryItem[];
  title?: string;
  subtitle?: string;
  themeVariant?: 'royal' | 'palace';
}

export function InteractiveGallery({
  items,
  title = 'Moments of Love & Royalty',
  subtitle = 'A glimpse into our cherished memories and auspicious milestones',
  themeVariant = 'royal',
}: InteractiveGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isPalace = themeVariant === 'palace';

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % items.length);
  }, [selectedIndex, items.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
  }, [selectedIndex, items.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev, handleClose]);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <span
          className={`text-xs font-serif uppercase tracking-[0.3em] font-semibold ${
            isPalace ? 'text-[#C5A059]' : 'text-[#D4AF37]'
          }`}
        >
          Treasured Gallery
        </span>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-serif font-medium mt-2 ${
            isPalace ? 'text-[#4A0E17]' : 'text-[#5B0E2D]'
          }`}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div
            className={`h-px w-16 ${
              isPalace ? 'bg-[#C5A059]/40' : 'bg-[#D4AF37]/50'
            }`}
          />
          <span className={`text-sm ${isPalace ? 'text-[#C5A059]' : 'text-[#D4AF37]'}`}>
            ✦
          </span>
          <div
            className={`h-px w-16 ${
              isPalace ? 'bg-[#C5A059]/40' : 'bg-[#D4AF37]/50'
            }`}
          />
        </div>
        <p className="text-sm md:text-base font-serif italic text-stone-600 max-w-lg mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, idx) => (
          <RoyalGalleryImage
            key={idx}
            src={item.url}
            alt={item.caption || `Royal Wedding Photo ${idx + 1}`}
            caption={item.caption}
            index={idx}
            themeVariant={themeVariant}
            onClick={() => setSelectedIndex(idx)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#5B0E2D]/80 border border-[#D4AF37] text-[#FDFBF7] hover:scale-110 transition-transform focus:outline-none cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 md:left-8 p-2.5 md:p-3 rounded-full bg-[#5B0E2D]/80 border border-[#D4AF37] text-[#FDFBF7] hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 md:right-8 p-2.5 md:p-3 rounded-full bg-[#5B0E2D]/80 border border-[#D4AF37] text-[#FDFBF7] hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Active Image Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center overflow-hidden rounded-2xl border-2 border-[#D4AF37] bg-[#2B0514] shadow-2xl p-2"
          >
            <img
              src={items[selectedIndex].url}
              alt={items[selectedIndex].caption || `Photo ${selectedIndex + 1}`}
              className="max-h-[70vh] w-auto object-contain rounded-xl"
              onError={(e) => {
                // If modal image fails, don't show broken tag
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {items[selectedIndex].caption && (
              <p className="text-center font-serif text-[#FDFBF7] text-sm md:text-base italic mt-3 px-4 pb-1">
                {items[selectedIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
