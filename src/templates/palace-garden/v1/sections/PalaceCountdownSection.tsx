'use client';

import React from 'react';
import { WeddingCountdown } from '@/components/interactive/countdown/WeddingCountdown';

interface PalaceCountdownSectionProps {
  eventDate: string;
  eventStartTime?: string;
  timezone?: string;
}

export function PalaceCountdownSection({
  eventDate,
  eventStartTime = '18:00',
  timezone = 'Asia/Kolkata',
}: PalaceCountdownSectionProps) {
  return (
    <section className="relative py-8 px-4 bg-gradient-to-r from-[#FAF4E8] via-[#FAF6EE] to-[#FAF4E8] border-y-2 border-[#C5A059]/60 shadow-xs">
      <div className="max-w-4xl mx-auto text-center">
        <WeddingCountdown
          eventDate={eventDate}
          eventStartTime={eventStartTime}
          timezone={timezone}
          title="Countdown To The Sacred Union"
          variant="palace"
        />
      </div>
    </section>
  );
}
