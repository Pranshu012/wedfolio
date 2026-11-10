'use client';

import React from 'react';
import { InteractiveGallery } from '@/components/interactive/photo-gallery/InteractiveGallery';
import type { PublicGalleryItem } from '@/modules/publishing/domain/public-snapshot.schema';

interface PalaceGallerySectionProps {
  items: PublicGalleryItem[];
}

export function PalaceGallerySection({ items }: PalaceGallerySectionProps) {
  return (
    <div className="py-2">
      <InteractiveGallery
        items={items}
        title="Captured Memories"
        subtitle="A glimpse into our cherished moments and timeless celebrations"
        themeVariant="palace"
      />
    </div>
  );
}
