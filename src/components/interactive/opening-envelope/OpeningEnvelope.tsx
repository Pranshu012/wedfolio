'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface OpeningEnvelopeProps {
  sealText?: string;
  weddingTitle: string;
  coupleNames: string;
  onOpenComplete?: () => void;
}

type EnvelopeState = 'closed' | 'breaking' | 'opening' | 'revealing' | 'dismissed';

export function OpeningEnvelope({
  sealText = 'S & P',
  weddingTitle,
  coupleNames,
  onOpenComplete,
}: OpeningEnvelopeProps) {
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

  // Keyboard navigation: Enter or Space on wax seal opens it
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
          key="royal-envelope-modal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#150209]/96 px-4 backdrop-blur-md overflow-hidden select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Royal Wedding Invitation Opening Seal"
        >
          {/* Subtle Ambient Mandala Ring in Background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="w-[620px] h-[620px] rounded-full border-[12px] border-[#D4AF37] border-dashed animate-spin-slow" />
          </div>

          {/* Invitation Envelope Shell */}
          <div className="relative w-full max-w-[340px] sm:max-w-[440px] aspect-[1.38/1] perspective-[1200px]">
            {/* 1. Envelope Back Panel (Deep Burgundy Velour) */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B071C] via-[#4A0B24] to-[#240310] border-2 border-[#D4AF37]/80 shadow-2xl overflow-visible">
              {/* Ornate Gold Corner Filigrees */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]" />
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
              className="absolute inset-x-3 sm:inset-x-5 top-3 sm:top-4 bottom-3 sm:bottom-4 rounded-xl bg-gradient-to-b from-[#FDFBF7] via-[#FAF4E8] to-[#F5ECE0] border border-[#D4AF37] p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-2xl z-10 overflow-hidden"
            >
              {/* Ornate Inner Border Line */}
              <div className="absolute inset-2 border border-[#D4AF37]/40 rounded-lg pointer-events-none" />

              {/* Step 1: Traditional Mantra */}
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={isLetterRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[9px] sm:text-[11px] font-serif uppercase tracking-[0.3em] text-[#D4AF37] font-bold"
              >
                || Shree Ganeshay Namah ||
              </motion.span>

              {/* Step 2: Wedding Title */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={isLetterRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-2xl font-serif font-bold text-[#5B0E2D] tracking-wide mt-1.5"
              >
                {weddingTitle}
              </motion.h2>

              {/* Step 3: Ornate Gold Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isLetterRevealed ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex items-center justify-center gap-2 my-2 w-28"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs">✦</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </motion.div>

              {/* Step 4: Couple Names */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isLetterRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-base sm:text-xl font-serif italic text-stone-900 font-semibold tracking-wide"
              >
                {coupleNames}
              </motion.p>

              {/* Step 5: Invitation Message & Date */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={isLetterRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="text-[10px] sm:text-xs uppercase font-serif tracking-[0.18em] text-[#0B3C2D] font-bold mt-1.5"
              >
                Cordially Invite You To Celebrate
              </motion.p>
            </motion.div>

            {/* 3. Envelope Front Pocket (Covers the bottom half of the letter when closed) */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl bg-gradient-to-t from-[#2B0514] via-[#4A0B24] to-[#5B0E2D] border-x-2 border-b-2 border-[#D4AF37]/80 shadow-md z-20 overflow-hidden pointer-events-none"
              style={{
                clipPath: 'polygon(0 0, 50% 30%, 100% 0, 100% 100%, 0 100%)',
              }}
            >
              {/* Subtle Fold Highlights */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-transparent via-[#D4AF37] to-transparent" />
            </div>

            {/* 4. Triangular Envelope Flap (Rotates Upwards in 3D around top fold) */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={
                isFlapOpen
                  ? { rotateX: 180, zIndex: 5 }
                  : { rotateX: 0, zIndex: 25 }
              }
              transition={{
                duration: 0.85,
                ease: [0.25, 1, 0.5, 1],
              }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
              className="absolute inset-x-0 top-0 h-[56%] bg-gradient-to-b from-[#661033] via-[#4D0A25] to-[#360519] border-t-2 border-[#D4AF37] shadow-xl pointer-events-none"
            >
              {/* Golden Hem on Flap Edge */}
              <div className="absolute inset-0 border-b-2 border-[#D4AF37]/60" />
            </motion.div>

            {/* 5. Royal Wax Seal (Interactive focal point placed over flap apex) */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
              {!isFlapOpen && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleSealClick}
                  onKeyDown={handleKeyDown}
                  className="relative group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/60 rounded-full"
                  aria-label="Tap royal wax seal to open invitation"
                >
                  {/* Subtle pulsing gold aura when closed */}
                  {envelopeState === 'closed' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.6, 0.15, 0.6],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 rounded-full bg-[#D4AF37]/40 blur-md pointer-events-none"
                    />
                  )}

                  {/* Left Half of Wax Seal (Separates elegantly during cracking) */}
                  <motion.div
                    animate={
                      isSealBreaking
                        ? { x: -24, rotate: -18, opacity: 0, scale: 0.85 }
                        : { x: 0, rotate: 0, opacity: 1, scale: 1 }
                    }
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#E2B755] via-[#C9972C] to-[#8C6212] p-[2.5px] shadow-2xl flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7D1236] to-[#420A20] border-2 border-[#F3D794] flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
                      {/* Golden Fracture Flash line when cracking */}
                      {isSealBreaking && (
                        <div className="absolute inset-0 bg-[#F3D794] opacity-75 animate-ping" />
                      )}

                      <span className="text-[#F3D794] text-xs sm:text-sm font-serif font-bold tracking-widest drop-shadow-sm">
                        {sealText}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-[#D4AF37] font-serif uppercase tracking-widest mt-0.5">
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
            className="mt-8 text-[#D4AF37] hover:text-[#FDFBF7] text-xs font-serif uppercase tracking-[0.2em] underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] px-3.5 py-1.5 rounded cursor-pointer flex items-center gap-1.5"
          >
            <span>Skip Animation / View Invitation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
