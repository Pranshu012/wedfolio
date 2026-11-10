'use client';

import React from 'react';
import type { WeddingTemplateProps } from '@/modules/templates/domain/template-contract';
import { ParchmentBackground } from './components/ParchmentBackground';
import { FloatingPetals } from './components/FloatingPetals';
import { PalaceHeroSection } from './sections/PalaceHeroSection';
import { PalaceCountdownSection } from './sections/PalaceCountdownSection';
import { PalaceStorySection } from './sections/PalaceStorySection';
import { PalaceFamilySection } from './sections/PalaceFamilySection';
import { PalaceItinerarySection } from './sections/PalaceItinerarySection';
import { PalaceGallerySection } from './sections/PalaceGallerySection';
import { PalaceVenueSection } from './sections/PalaceVenueSection';
import { PalaceFooterSection } from './sections/PalaceFooterSection';
import { RoyalAudioPlayer } from '@/components/interactive/audio-player/RoyalAudioPlayer';
import { VenueEditorModal } from '@/components/interactive/venue-editor/VenueEditorModal';

export function PalaceGardenTemplate({ content, theme, isEditor = false }: WeddingTemplateProps) {
  const coupleNames = `${content.couple.bride.fullName} & ${content.couple.groom.fullName}`;

  return (
    <ParchmentBackground
      className="antialiased selection:bg-[#C5A059] selection:text-[#4A0E17]"
      style={{
        fontFamily: theme.fontBody || 'Cormorant Garamond, serif',
      }}
    >
      {/* Subtle Floating Rose Petals (respects prefers-reduced-motion) */}
      <FloatingPetals />

      {/* 1. Palace Garden Hero with Corner Roses, Ganesha, Muhurat Cartouche & Palace Illustration */}
      <PalaceHeroSection content={content} />

      {/* 2. Wedding Countdown Section */}
      <PalaceCountdownSection
        eventDate={content.eventDate}
        eventStartTime={content.eventStartTime || '18:00'}
        timezone={content.timezone || 'Asia/Kolkata'}
      />

      {/* 3. Couple Introduction & Love Story */}
      <PalaceStorySection couple={content.couple} />

      {/* 4. Family Introductions (Bride-side & Groom-side) */}
      <div className="border-t border-[#C5A059]/30 bg-[#FAF4E8]/40">
        <PalaceFamilySection family={content.family} />
      </div>

      {/* 5. Event Schedule / Itinerary Timeline */}
      <div className="border-t border-[#C5A059]/30">
        <PalaceItinerarySection schedule={content.schedule} />
      </div>

      {/* 6. Photo Gallery */}
      <div className="border-t border-[#C5A059]/30 bg-[#FAF4E8]/30">
        <PalaceGallerySection items={content.gallery} />
      </div>

      {/* 7. Venue & Google Maps (Optional & Editable) */}
      {content.isVenueEnabled && content.venue && (
        <div className="border-t border-[#C5A059]/30">
          <PalaceVenueSection
            venue={content.venue}
            isEnabled={content.isVenueEnabled}
          />
        </div>
      )}

      {/* 8. Palace Garden Footer with Pavilions & Blessing */}
      <PalaceFooterSection coupleNames={coupleNames} />

      {/* 9. Floating Background Audio Player (Explicit Playback) */}
      <RoyalAudioPlayer
        audioUrl={content.interactive?.backgroundMusicUrl}
        trackTitle={content.interactive?.musicTitle}
      />

      {/* 10. Editable Venue Information Modal for Authenticated Workspace Editors ONLY */}
      {isEditor && (
        <VenueEditorModal
          weddingSlug={content.slug}
          initialVenue={content.venue}
          initialIsEnabled={content.isVenueEnabled}
        />
      )}
    </ParchmentBackground>
  );
}

export default PalaceGardenTemplate;
