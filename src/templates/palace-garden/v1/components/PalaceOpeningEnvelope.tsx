'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface PalaceOpeningEnvelopeProps {
  sealText?: string;
  weddingTitle: string;
  coupleNames: string;
  onOpenComplete?: () => void;
}

type EnvelopeState = 'closed' | 'breaking' | 'opening' | 'revealing' | 'dismissed';

export function PalaceOpeningEnvelope({
  sealText = 'S & P',
  weddingTitle,
  coupleNames,
  onOpenComplete,
}: PalaceOpeningEnvelopeProps) {
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>('closed');
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, bypass the opening ceremony automatically
  useEffect(() => {
    if (shouldReduceMotion) {
      onOpenComplete?.();
    }
  }, [shouldReduceMotion, onOpenComplete]);

  // Handle skip action immediately
  const handleSkip = useCallback(() => {
    setEnvelopeState('dismissed');
    onOpenComplete?.();
  }, [onOpenComplete]);

  // Handle seal tap / click sequence
  const handleSealClick = useCallback(() => {
    if (envelopeState !== 'closed') return;

    // State 2: Seal breaks
    setEnvelopeState('breaking');

    // State 3: Envelope flap opens and letter rises
    const timer1 = setTimeout(() => {
      setEnvelopeState('opening');
    }, 450);

    // State 4: Letter progressive reveal
    const timer2 = setTimeout(() => {
      setEnvelopeState('revealing');
    }, 1100);

    // State 5: Smooth exit into the main website
    const timer3 = setTimeout(() => {
      setEnvelopeState('dismissed');
      onOpenComplete?.();
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [envelopeState, onOpenComplete]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSealClick();
    }
  };

  const isFlapOpen = envelopeState === 'opening' || envelopeState === 'revealing';
  const isLetterRevealed = envelopeState === 'revealing';
  const isSealBreaking = envelopeState === 'breaking' || isFlapOpen;

  return (
    <AnimatePresence>
      {envelopeState !== 'dismissed' && !shouldReduceMotion && (
        <motion.div
          key="palace-envelope-modal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2B0E17]/92 px-4 backdrop-blur-md overflow-hidden select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Palace Garden Wedding Invitation Opening Seal"
        >
          {/* Subtle Ambient Mandala Ring in Background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="w-[620px] h-[620px] rounded-full border-[10px] border-[#C5A059] border-dashed animate-spin-slow" />
          </div>

          {/* Invitation Envelope Shell */}
          <div className="relative w-full max-w-[340px] sm:max-w-[440px] aspect-[1.38/1] perspective-[1200px]">
            {/* 1. Envelope Back Panel (Warm Ivory Parchment) */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FAF6EE] via-[#F5ECE0] to-[#EFE2D0] border-2 border-[#C5A059] shadow-2xl overflow-visible">
              {/* Corner Filigrees in Antique Gold */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#C5A059]" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#C5A059]" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#C5A059]" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#C5A059]" />
            </div>

            {/* 2. Royal Parchment Letter (Rising from Inside the Pocket) */}
            <motion.div
              initial={{ y: 0, scale: 0.94 }}
              animate={
                isLetterRevealed
                  ? { y: -70, scale: 1.05 }
                  : isFlapOpen
                  ? { y: -35, scale: 0.98 }
                  : { y: 0, scale: 0.94 }
              }
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-3 sm:inset-x-5 top-3 sm:top-4 bottom-3 sm:bottom-4 rounded-xl bg-gradient-to-b from-[#FAF6EE] via-[#FAF4E8] to-[#F5ECE0] border border-[#C5A059] p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-2xl z-10 overflow-hidden"
            >
              {/* Ornate Inner Border Line */}
              <div className="absolute inset-2 border border-[#C5A059]/40 rounded-lg pointer-events-none" />

              {/* Step 1: Traditional Mantra */}
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={isLetterRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[9px] sm:text-[11px] font-serif uppercase tracking-[0.3em] text-[#C5A059] font-bold"
              >
                || Shree Ganeshay Namah ||
              </motion.span>

              {/* Step 2: Wedding Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={isLetterRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] text-[#6B7C69] font-semibold mt-1"
              >
                {weddingTitle}
              </motion.h3>

              {/* Step 3: Grand Couple Names */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isLetterRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#4A0E17] tracking-wide my-1 drop-shadow-xs"
              >
                {coupleNames}
              </motion.h2>

              {/* Step 4: Auspicious Date Hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isLetterRevealed ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="text-[10px] sm:text-xs font-serif italic text-stone-600 mt-0.5"
              >
                Save The Auspicious Date • December 2026
              </motion.p>
            </motion.div>

            {/* 3. Envelope Pocket Sides & Bottom (z-20 Over the Letter) */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Left Flap */}
              <div
                className="absolute inset-0 bg-[#F5ECE0] border-l-2 border-[#C5A059]/60 shadow-lg"
                style={{
                  clipPath: 'polygon(0 0, 0 100%, 50% 50%)',
                }}
              />
              {/* Right Flap */}
              <div
                className="absolute inset-0 bg-[#EFE2D0] border-r-2 border-[#C5A059]/60 shadow-lg"
                style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)',
                }}
              />
              {/* Bottom Pocket Flap */}
              <div
                className="absolute inset-0 bg-[#FAF4E8] border-b-2 border-[#C5A059]/70 shadow-xl"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 45%)',
                }}
              />
            </div>

            {/* 4. Triangular Top Flap with 3D Flip */}
            <motion.div
              animate={
                isFlapOpen
                  ? { rotateX: 180, zIndex: 5 }
                  : { rotateX: 0, zIndex: 30 }
              }
              transition={{
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
              }}
              className="absolute inset-x-0 top-0 h-full pointer-events-none"
            >
              <div
                className="w-full h-full bg-[#FAF6EE] border-t-2 border-[#C5A059] shadow-2xl"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 55%)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Gold Flap Border Line */}
                <div
                  className="w-full h-full border-t border-[#C5A059]/60"
                  style={{ clipPath: 'polygon(5% 5%, 95% 5%, 50% 50%)' }}
                />
              </div>
            </motion.div>

            {/* 5. Central Antique Gold Wax Seal (Interactive Button) */}
            <div className="absolute inset-0 flex items-center justify-center z-40">
              {!isFlapOpen && (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Break palace seal to open wedding invitation"
                  onClick={handleSealClick}
                  onKeyDown={handleKeyDown}
                  className="group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#C5A059]/50 rounded-full select-none touch-manipulation"
                >
                  <motion.div
                    animate={
                      isSealBreaking
                        ? {
                            scale: [1, 1.15, 0.9, 0],
                            opacity: [1, 0.9, 0.6, 0],
                            rotate: [0, -8, 8, -4],
                          }
                        : { scale: 1, opacity: 1, rotate: 0 }
                    }
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#E8CE84] via-[#C5A059] to-[#8C6A29] p-[2.5px] shadow-2xl flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95"
                  >
                    <div className="w-full h-full rounded-full bg-[#4A0E17] border-2 border-[#E8CE84] flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
                      {/* Golden Fracture Flash line when cracking */}
                      {isSealBreaking && (
                        <div className="absolute inset-0 bg-[#FAF6EE] opacity-75 animate-ping" />
                      )}

                      <span className="text-[#FAF6EE] text-xs sm:text-sm font-serif font-bold tracking-widest drop-shadow-xs">
                        {sealText}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-[#C5A059] font-serif uppercase tracking-widest mt-0.5">
                        {isSealBreaking ? 'Opening' : 'Tap To Open'}
                      </span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Accessible Skip Button */}
          <button
            onClick={handleSkip}
            className="mt-8 text-[#C5A059] hover:text-[#FAF6EE] text-xs font-serif uppercase tracking-[0.2em] underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059] px-3.5 py-1.5 rounded cursor-pointer flex items-center gap-1.5"
          >
            <span>Skip Animation / View Invitation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
