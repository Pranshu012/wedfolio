'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import type { PublicEventScheduleItem } from '@/modules/publishing/domain/public-snapshot.schema';
import { SectionDivider } from '../components/SectionDivider';
import { MOTION_EASINGS, MOTION_DURATIONS } from '@/lib/design-system/motion';

interface PalaceItinerarySectionProps {
  schedule: PublicEventScheduleItem[];
}

export function PalaceItinerarySection({ schedule }: PalaceItinerarySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked progress for drawing down the golden timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 75%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!schedule || schedule.length === 0) return null;

  // Animation variants
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: MOTION_DURATIONS.headingReveal, ease: MOTION_EASINGS.ceremonial },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: MOTION_DURATIONS.cardReveal,
        ease: MOTION_EASINGS.ceremonial,
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' as const },
    },
  };

  const markerVariants: Variants = {
    hidden: { scale: shouldReduceMotion ? 1 : 0.4, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: MOTION_DURATIONS.marker, ease: MOTION_EASINGS.spring },
    },
  };

  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* A. Heading Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerVariants}
        className="text-center mb-14 sm:mb-20"
      >
        <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.3em] font-semibold">
          Shubh Vivah Samaroh
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4A0E17] font-medium mt-1">
          Event Itinerary
        </h2>
        <SectionDivider />
        <p className="text-sm md:text-base font-serif italic text-stone-600 max-w-md mx-auto">
          We request the honor of your gracious presence at each auspicious celebration
        </p>
      </motion.div>

      {/* B. Animated Timeline Container */}
      <div
        ref={containerRef}
        className="relative ml-4 md:ml-32 pl-7 sm:pl-9 md:pl-12 space-y-10 sm:space-y-14"
      >
        {/* Background Guide Line */}
        <div className="absolute left-0 top-3 bottom-6 w-[2px] bg-[#C5A059]/25" />

        {/* Foreground Progressively Drawn Antique Gold Line */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-0 top-3 bottom-6 w-[2px] origin-top bg-gradient-to-b from-[#C5A059] via-[#E8CE84] to-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.35)]"
          />
        )}

        {schedule.map((event, idx) => (
          <div key={event.id || idx} className="relative">
            {/* Timeline Marker Node (Rose center with antique gold border) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={markerVariants}
              className="absolute -left-[36px] sm:-left-[44px] md:-left-[57px] top-4 w-6 h-6 rounded-full bg-[#FAF6EE] border-2 border-[#C5A059] flex items-center justify-center shadow-[0_0_8px_rgba(197,160,89,0.35)] text-[#D98894] text-[11px] z-10"
              aria-hidden="true"
            >
              🌸
            </motion.div>

            {/* C. Event Card Reveal */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -4,
                      borderColor: 'rgba(197, 160, 89, 0.9)',
                      boxShadow: '0 18px 36px -10px rgba(74, 14, 23, 0.14)',
                      transition: { duration: 0.25, ease: 'easeOut' as const },
                    }
              }
              className="relative p-5 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F5ECE0] border border-[#C5A059]/45 shadow-[0_8px_24px_rgba(74,14,23,0.06)] transition-all"
            >
              {/* Corner delicate botanical floral accents */}
              <div className="absolute top-0 right-0 w-7 h-7 pointer-events-none opacity-20 border-t-2 border-r-2 border-[#C5A059] rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-7 h-7 pointer-events-none opacity-20 border-b-2 border-l-2 border-[#C5A059] rounded-bl-2xl" />

              {/* Staggered Content Sequence */}
              {/* 1 & 2. Date and Time Badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-2 mb-3"
              >
                <span className="text-xs font-serif uppercase tracking-widest text-[#FAF6EE] bg-[#6B7C69] px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.date}
                </span>
                <span className="text-xs font-serif text-stone-700 bg-[#FAF4E8] border border-[#C5A059]/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  {event.startTime}
                  {event.endTime ? ` - ${event.endTime}` : ''}
                </span>
              </motion.div>

              {/* 3. Event Title */}
              <motion.h3
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] tracking-tight"
              >
                {event.name}
              </motion.h3>

              {/* 4. Venue Name */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-serif text-[#6B7C69] font-semibold mt-2"
              >
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>{event.venueName}</span>
              </motion.div>

              {/* 5. Event Description */}
              {event.description && (
                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base font-serif italic text-stone-700 mt-3 leading-relaxed"
                >
                  {event.description}
                </motion.p>
              )}

              {/* 6. Dress Code */}
              {event.dressCode && (
                <motion.div
                  variants={itemVariants}
                  className="mt-4 pt-3 border-t border-[#C5A059]/30 flex items-center gap-2 text-xs font-serif text-[#4A0E17]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                  <span className="font-semibold uppercase tracking-wider text-[#6B7C69]">
                    Attire:
                  </span>
                  <span className="italic">{event.dressCode}</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
