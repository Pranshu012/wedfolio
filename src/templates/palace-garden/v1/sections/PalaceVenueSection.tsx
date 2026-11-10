'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import type { PublicVenue } from '@/modules/publishing/domain/public-snapshot.schema';
import { SectionDivider } from '../components/SectionDivider';
import { getHeadingVariants, MOTION_EASINGS } from '@/lib/design-system/motion';

interface PalaceVenueSectionProps {
  venue?: PublicVenue;
  isEnabled?: boolean;
}

export function PalaceVenueSection({ venue, isEnabled = true }: PalaceVenueSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  if (!isEnabled || !venue) return null;

  return (
    <section className="py-16 sm:py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        variants={getHeadingVariants(!!shouldReduceMotion)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.3em] font-semibold">
          Destination &amp; Directions
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#4A0E17] font-medium mt-1">
          The Wedding Venue
        </h2>
        <SectionDivider />
        <p className="text-sm md:text-base font-serif italic text-stone-600 max-w-md mx-auto">
          Where our grand celebrations and joyous memories unfold
        </p>
      </motion.div>

      {/* Venue Card with Embedded Map */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: MOTION_EASINGS.ceremonial }}
        className="rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F5ECE0] border border-[#C5A059]/45 shadow-[0_12px_36px_rgba(74,14,23,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-5 relative"
      >
        {/* Venue Information Column */}
        <div className="p-7 sm:p-10 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#4A0E17] border border-[#C5A059] flex items-center justify-center text-[#FAF6EE] mb-5 shadow-sm">
              <MapPin className="w-5 h-5 text-[#C5A059]" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#6B7C69]">
              Sacred Destination
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] mt-1">
              {venue.name}
            </h3>

            <p className="text-sm sm:text-base font-serif text-stone-700 mt-3 leading-relaxed">
              {venue.address}
              {venue.city ? `, ${venue.city}` : ''}
              {venue.state ? `, ${venue.state}` : ''}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {venue.directionsUrl && (
              <a
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#4A0E17] text-[#FAF6EE] font-serif text-xs uppercase tracking-widest font-semibold hover:bg-[#601320] transition-colors shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
            )}
          </div>
        </div>

        {/* Embedded Map Column */}
        <div className="lg:col-span-3 min-h-[300px] lg:min-h-full bg-stone-200 relative border-t lg:border-t-0 lg:border-l border-[#C5A059]/30">
          <iframe
            title={`Map location for ${venue.name}`}
            src={
              venue.googleMapsEmbedUrl ||
              'https://maps.google.com/maps?q=Bengaluru&t=&z=12&ie=UTF8&iwloc=&output=embed'
            }
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </motion.div>
    </section>
  );
}
