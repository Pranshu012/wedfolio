'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import type { PublicEventScheduleItem } from '@/modules/publishing/domain/public-snapshot.schema';

interface ItinerarySectionProps {
  schedule: PublicEventScheduleItem[];
}

export function ItinerarySection({ schedule }: ItinerarySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked progress for drawing down the golden timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 75%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!schedule || schedule.length === 0) return null;

  // Reusable animation variants
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const dividerVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' as const },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 35,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.07,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
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
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const },
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
        <span className="text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em]">
          Royal Celebrations
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#5B0E2D] font-medium mt-2">
          Event Itinerary
        </h2>

        {/* Elegant Animated Divider */}
        <motion.div
          variants={dividerVariants}
          className="flex items-center justify-center gap-3 my-3"
        >
          <div className="h-px w-16 bg-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">✦</span>
          <div className="h-px w-16 bg-[#D4AF37]/50" />
        </motion.div>

        <p className="text-sm md:text-base font-serif italic text-stone-600 max-w-md mx-auto">
          We request the honor of your gracious presence at each ceremony
        </p>
      </motion.div>

      {/* B. Animated Timeline Container */}
      <div
        ref={containerRef}
        className="relative ml-4 md:ml-32 pl-7 sm:pl-9 md:pl-12 space-y-10 sm:space-y-14"
      >
        {/* Background Guide Line (Subtle) */}
        <div className="absolute left-0 top-3 bottom-6 w-[2px] bg-[#D4AF37]/25" />

        {/* Foreground Progressively Drawn Gold Line */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-0 top-3 bottom-6 w-[2px] origin-top bg-gradient-to-b from-[#D4AF37] via-[#F3D794] to-[#C9972C] shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          />
        )}

        {schedule.map((event, idx) => (
          <div key={event.id || idx} className="relative">
            {/* Timeline Marker Dot (Animates from small to natural size with subtle gold glow) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={markerVariants}
              className="absolute -left-[36px] sm:-left-[44px] md:-left-[57px] top-4 w-6 h-6 rounded-full bg-[#5B0E2D] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.45)] text-[#F3D794] text-[10px] z-10"
              aria-hidden="true"
            >
              ✦
            </motion.div>

            {/* C. Event Card Reveal (Viewport triggered) */}
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
                      borderColor: 'rgba(212, 175, 55, 1)',
                      boxShadow: '0 20px 35px -10px rgba(91, 14, 45, 0.16)',
                      transition: { duration: 0.3, ease: 'easeOut' as const },
                    }
              }
              className="p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-br from-[#FDFBF7] to-[#F5ECE0] border-2 border-[#D4AF37]/60 shadow-lg transition-colors"
            >
              {/* D. Staggered Content Sequence */}
              {/* 1 & 2. Date and Time Badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-2 mb-3"
              >
                <span className="text-xs font-serif uppercase tracking-widest text-[#5B0E2D] bg-[#D4AF37]/20 border border-[#D4AF37]/50 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.date}
                </span>
                <span className="text-xs font-serif text-stone-700 bg-stone-200/70 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#5B0E2D]" />
                  {event.startTime}
                  {event.endTime ? ` - ${event.endTime}` : ''}
                </span>
              </motion.div>

              {/* 3. Event Title */}
              <motion.h3
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-serif font-bold text-[#5B0E2D] tracking-tight"
              >
                {event.name}
              </motion.h3>

              {/* 4. Venue Name */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-serif text-[#0B3C2D] font-semibold mt-2"
              >
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
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
                  className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex items-center gap-2 text-xs font-serif text-[#5B0E2D]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span className="font-semibold uppercase tracking-wider">
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
