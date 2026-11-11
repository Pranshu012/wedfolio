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
    <section className="relative py-10 px-4 bg-gradient-to-r from-[#F5EBDD] via-[#FAF4E8] to-[#F5EBDD] border-y border-[#C5A059]/35">
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
