'use client';

import React from 'react';
import { InteractiveGallery } from '@/components/interactive/photo-gallery/InteractiveGallery';
import type { PublicGalleryItem } from '@/modules/publishing/domain/public-snapshot.schema';
import { SectionDivider } from '../components/SectionDivider';

interface PalaceGallerySectionProps {
  items: PublicGalleryItem[];
}

export function PalaceGallerySection({ items }: PalaceGallerySectionProps) {
  return (
    <section className="py-14 sm:py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-10 sm:mb-14">
        <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.3em] font-semibold">
          Precious Moments
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4A0E17] font-medium mt-1">
          Captured Memories
        </h2>
        <SectionDivider />
      </div>

      {/* Interactive Gallery */}
      <InteractiveGallery items={items} />
    </section>
  );
}
