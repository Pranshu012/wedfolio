'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import type { PublicVenue } from '@/modules/publishing/domain/public-snapshot.schema';
import { getHeadingVariants, MOTION_EASINGS } from '@/lib/design-system/motion';

interface VenueMapSectionProps {
  venue?: PublicVenue;
  isEnabled?: boolean;
}

export function VenueMapSection({ venue, isEnabled = true }: VenueMapSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  if (!isEnabled || !venue) return null;

  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        variants={getHeadingVariants(!!shouldReduceMotion)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em]">
          Destination & Directions
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#5B0E2D] font-medium mt-2">
          The Wedding Venue
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-px w-16 bg-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">✦</span>
          <div className="h-px w-16 bg-[#D4AF37]/50" />
        </div>
        <p className="text-sm md:text-base font-serif italic text-stone-600 max-w-md mx-auto">
          Where our grand celebrations and royal memories unfold
        </p>
      </motion.div>

      {/* Venue Card with Embedded Map */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: MOTION_EASINGS.ceremonial }}
        className="rounded-2xl bg-gradient-to-br from-[#FDFBF7] to-[#F5ECE0] border border-[#D4AF37]/50 shadow-[0_16px_40px_rgba(91,14,45,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-5 relative"
      >
        {/* Venue Information Column */}
        <div className="p-8 md:p-12 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#5B0E2D] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#D4AF37]">
              Royal Location
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#5B0E2D] mt-1">
              {venue.name}
            </h3>

            <p className="text-sm md:text-base font-serif text-stone-700 mt-4 leading-relaxed">
              {venue.address}
            </p>

            <p className="text-sm font-serif font-semibold text-[#0B3C2D] mt-1">
              {venue.city}
              {venue.state ? `, ${venue.state}` : ''}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#D4AF37]/30">
            <a
              href={venue.directionsUrl || `https://maps.google.com/?q=${encodeURIComponent(venue.name + ' ' + venue.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-gradient-to-r from-[#5B0E2D] to-[#4A0B24] border border-[#D4AF37]/80 text-[#F3D794] text-xs font-serif uppercase tracking-[0.2em] font-semibold shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75" />
            </a>
          </div>
        </div>

        {/* Google Maps Embed Frame */}
        <div className="lg:col-span-3 min-h-[350px] lg:min-h-[450px] w-full bg-stone-200 border-t lg:border-t-0 lg:border-l border-[#D4AF37]/40 relative">
          {venue.googleMapsEmbedUrl ? (
            <iframe
              src={venue.googleMapsEmbedUrl}
              title={`Map for ${venue.name}`}
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-stone-500">
              <MapPin className="w-12 h-12 text-[#D4AF37] mb-2" />
              <p className="font-serif text-sm">Interactive map will appear here once finalized.</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
