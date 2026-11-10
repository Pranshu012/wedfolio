'use client';

import React from 'react';
import type { WeddingTemplateProps } from '@/modules/templates/domain/template-contract';
import { HeroEnvelopeSection } from './sections/HeroEnvelopeSection';
import { WeddingCountdown } from '@/components/interactive/countdown/WeddingCountdown';
import { CoupleStorySection } from './sections/CoupleStorySection';
import { RoyalFamilySection } from './sections/RoyalFamilySection';
import { ItinerarySection } from './sections/ItinerarySection';
import { InteractiveGallery } from '@/components/interactive/photo-gallery/InteractiveGallery';
import { VenueMapSection } from './sections/VenueMapSection';
import { RoyalAudioPlayer } from '@/components/interactive/audio-player/RoyalAudioPlayer';
import { VenueEditorModal } from '@/components/interactive/venue-editor/VenueEditorModal';

export function RoyalHeritageTemplate({ content, theme, isEditor = false }: WeddingTemplateProps) {
  return (
    <main
      className="min-h-screen text-stone-900 selection:bg-[#D4AF37] selection:text-[#5B0E2D] antialiased"
      style={{
        backgroundColor: theme.backgroundColor || '#FDFBF7',
        fontFamily: theme.fontBody || 'Cormorant Garamond, serif',
      }}
    >
      {/* 1. Royal Hero with Wax Seal Envelope & Scratch Date */}
      <HeroEnvelopeSection content={content} />

      {/* 2. Wedding Countdown Section */}
      <div className="bg-[#4A0B24] border-y-2 border-[#D4AF37]/60">
        <WeddingCountdown
          eventDate={content.eventDate}
          eventStartTime={content.eventStartTime || '18:00'}
          timezone={content.timezone || 'Asia/Kolkata'}
        />
      </div>

      {/* 3. Couple Introduction & Love Story */}
      <CoupleStorySection couple={content.couple} />

      {/* 4. Family Introductions (Bride-side & Groom-side) */}
      <div className="border-t border-[#D4AF37]/30">
        <RoyalFamilySection family={content.family} />
      </div>

      {/* 5. Event Schedule / Itinerary Timeline */}
      <div className="bg-[#F5ECE0]/40 border-t border-[#D4AF37]/30">
        <ItinerarySection schedule={content.schedule} />
      </div>

      {/* 6. Photo Gallery */}
      <div className="border-t border-[#D4AF37]/30">
        <InteractiveGallery items={content.gallery} />
      </div>

      {/* 7. Venue & Google Maps (Optional & Editable) */}
      {content.isVenueEnabled && content.venue && (
        <div className="border-t border-[#D4AF37]/30 bg-[#F5ECE0]/30">
          <VenueMapSection
            venue={content.venue}
            isEnabled={content.isVenueEnabled}
          />
        </div>
      )}

      {/* 8. Royal Footer */}
      <footer className="py-16 px-4 text-center bg-[#2B0514] text-[#FDFBF7] border-t-2 border-[#D4AF37]">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <span className="text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em]">
            || Subham Bhavatu ||
          </span>
          <h4 className="text-2xl font-serif font-bold text-[#FDFBF7] mt-2">
            {content.couple.bride.fullName} &amp; {content.couple.groom.fullName}
          </h4>
          <p className="text-xs font-serif italic text-[#E0C097] mt-2">
            Thank you for being an indispensable part of our sacred celebration.
          </p>
          <div className="mt-8 text-[11px] font-serif text-[#D4AF37]/70 uppercase tracking-widest">
            Crafted with Royal Elegance on Wedfolio
          </div>
        </div>
      </footer>

      {/* 9. Floating Luxury Background Audio Player (Explicit Playback) */}
      <RoyalAudioPlayer
        audioUrl={content.interactive?.backgroundMusicUrl}
        trackTitle={content.interactive?.musicTitle}
      />

      {/* 10. Editable Venue Information Modal for Authenticated Wedding Editors ONLY */}
      {isEditor && (
        <VenueEditorModal
          weddingSlug={content.slug}
          initialVenue={content.venue}
          initialIsEnabled={content.isVenueEnabled}
        />
      )}
    </main>
  );
}

export default RoyalHeritageTemplate;
