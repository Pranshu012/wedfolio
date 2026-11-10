'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Clock } from 'lucide-react';

const emptySubscribe = () => () => {};

interface WeddingCountdownProps {
  eventDate: string;        // "2026-12-12"
  eventStartTime?: string;  // "18:00"
  timezone?: string;        // "Asia/Kolkata"
  title?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function WeddingCountdown({
  eventDate,
  eventStartTime = '18:00',
  timezone = 'Asia/Kolkata',
  title = 'Countdown To The Auspicious Union',
}: WeddingCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    const calculateTime = () => {
      const targetIso = `${eventDate}T${eventStartTime}:00`;
      const targetTime = new Date(targetIso).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [eventDate, eventStartTime, timezone]);

  return (
    <section className="py-12 px-4 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-serif mb-2">
        <Clock className="w-4 h-4" />
        <span>{title}</span>
      </div>

      {isClient && timeLeft.isPast ? (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#5B0E2D] via-[#4A0B24] to-[#5B0E2D] border border-[#D4AF37]/50 shadow-xl max-w-md">
          <p className="text-xl md:text-2xl font-serif text-[#FDFBF7] font-medium">
            ✦ The Celebrations Have Commenced ✦
          </p>
          <p className="text-[#E0C097] text-xs font-serif italic mt-2">
            Blessing the royal couple on their sacred journey together.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-xl w-full">
          {[
            { label: 'Days', value: isClient ? timeLeft.days : 0 },
            { label: 'Hours', value: isClient ? timeLeft.hours : 0 },
            { label: 'Minutes', value: isClient ? timeLeft.minutes : 0 },
            { label: 'Seconds', value: isClient ? timeLeft.seconds : 0 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#5B0E2D] to-[#3B071C] border border-[#D4AF37]/50 shadow-lg relative overflow-hidden"
            >
              {/* Gold Accent Top Bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F3D794] to-[#D4AF37]" />

              <span
                suppressHydrationWarning
                className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FDFBF7] tracking-tight"
              >
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-[#D4AF37] mt-1 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
