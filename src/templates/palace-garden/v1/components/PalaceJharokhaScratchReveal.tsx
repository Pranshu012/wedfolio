'use client';

import React, { useRef, useEffect, useState, useCallback, useId } from 'react';
import confetti from 'canvas-confetti';
import { useReducedMotion } from 'motion/react';
import { Eye, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PalaceJharokhaScratchRevealProps {
  dateText?: string;
  supportingText?: string;
  foilHeading?: string;
  onRevealed?: () => void;
  className?: string;
}

// Classical Rajasthani Palace Jharokha multi-cusped ogee arch path (ViewBox 0 0 320 360)
const JHAROKHA_VIEWBOX_PATH =
  'M 160 24 C 152 28, 140 38, 134 52 C 126 62, 108 78, 96 98 C 84 116, 68 136, 56 156 C 46 166, 40 176, 40 190 L 40 318 C 40 332, 50 342, 68 344 L 160 344 L 252 344 C 270 342, 280 332, 280 318 L 280 190 C 280 176, 274 166, 264 156 C 252 136, 236 116, 224 98 C 212 78, 194 62, 186 52 C 180 38, 168 28, 160 24 Z';

// Normalized path for clipPathUnits="objectBoundingBox"
const JHAROKHA_NORMALIZED_CLIP_PATH =
  'M 0.5000 0.0667 C 0.4750 0.0778, 0.4375 0.1056, 0.4188 0.1444 C 0.3937 0.1722, 0.3375 0.2167, 0.3000 0.2722 C 0.2625 0.3222, 0.2125 0.3778, 0.1750 0.4333 C 0.1437 0.4611, 0.1250 0.4889, 0.1250 0.5278 L 0.1250 0.8833 C 0.1250 0.9222, 0.1562 0.9500, 0.2125 0.9556 L 0.5000 0.9556 L 0.7875 0.9556 C 0.8438 0.9500, 0.8750 0.9222, 0.8750 0.8833 L 0.8750 0.5278 C 0.8750 0.4889, 0.8562 0.4611, 0.8250 0.4333 C 0.7875 0.3778, 0.7375 0.3222, 0.7000 0.2722 C 0.6625 0.2167, 0.6062 0.1722, 0.5813 0.1444 C 0.5625 0.1056, 0.5250 0.0778, 0.5000 0.0667 Z';

export function PalaceJharokhaScratchReveal({
  dateText = '31 January 2027',
  supportingText = 'The day we begin forever.',
  foilHeading = 'Scratch to unveil our special day',
  onRevealed,
  className,
}: PalaceJharokhaScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const rawId = useId();
  const clipId = `jharokha-clip-${rawId.replace(/:/g, '')}`;

  // Subtle restrained antique gold & dusty rose celebratory sparkles
  const triggerRestrainedCelebration = useCallback(() => {
    if (shouldReduceMotion) return;
    confetti({
      particleCount: 22,
      spread: 45,
      startVelocity: 16,
      ticks: 65,
      gravity: 0.95,
      origin: { y: 0.52 },
      colors: ['#D4AF37', '#E8CE84', '#D98894', '#FAF4E8'],
      shapes: ['circle'],
      scalar: 0.8,
    });
  }, [shouldReduceMotion]);

  const handleRevealAll = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);
    triggerRestrainedCelebration();
    onRevealed?.();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isRevealed, onRevealed, triggerRestrainedCelebration]);

  // Paint the champagne gold metallic scratch foil clipped to the Jharokha arch
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset canvas and clip strictly within the Jharokha window silhouette
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    const path = new Path2D(JHAROKHA_VIEWBOX_PATH);
    ctx.clip(path);

    // Warm champagne-gold metallic foil gradient
    const gradient = ctx.createLinearGradient(40, 24, 280, 344);
    gradient.addColorStop(0, '#FAF0DA');
    gradient.addColorStop(0.25, '#F3E1B8');
    gradient.addColorStop(0.5, '#E5CB95');
    gradient.addColorStop(0.75, '#D5B77B');
    gradient.addColorStop(1, '#C5A059');

    ctx.fillStyle = gradient;
    ctx.fill(path);

    // Soft architectural gold inner contour line
    ctx.strokeStyle = 'rgba(140, 106, 41, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.stroke(path);

    // Decorative floral ornament at foil center
    ctx.fillStyle = '#8C6A29';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❦ 🌸 ❦', width / 2, height / 2 - 20);

    // Elegant invitation copy on foil: "Scratch to unveil our special day"
    ctx.fillStyle = '#4A0E17';
    ctx.font = '600 11.5px "Cinzel", Georgia, serif';
    ctx.fillText(foilHeading, width / 2, height / 2 + 10);

    // Subtle decorative base flourish
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 35, height / 2 + 42);
    ctx.lineTo(width / 2 + 35, height / 2 + 42);
    ctx.stroke();

    ctx.restore();
  }, [foilHeading]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Check scratch percentage: reveal after approximately 50% is removed
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Sample central jharokha window region (x: 50-270, y: 50-320)
      const imageData = ctx.getImageData(50, 50, 220, 270);
      const pixels = imageData.data;
      let transparentPixels = 0;
      const totalSampled = pixels.length / 16;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] < 128) {
          transparentPixels++;
        }
      }

      const percentage = (transparentPixels / totalSampled) * 100;
      // Reveal at ~50% threshold
      if (percentage >= 48) {
        handleRevealAll();
      }
    } catch {
      // Fallback in case of CORS or canvas security restrictions
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.save();
    // Constrain erasing within the Jharokha arch
    const path = new Path2D(JHAROKHA_VIEWBOX_PATH);
    ctx.clip(path);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    setHasScratched(true);
    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsScratching(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center my-6 px-4 w-full max-w-[320px] sm:max-w-[340px] mx-auto select-none',
        className
      )}
    >
      {/* Invisible SVG definition for responsive objectBoundingBox clip-path */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={JHAROKHA_NORMALIZED_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* Main Jharokha Window Container */}
      <div
        className="relative w-full aspect-[8/9] min-h-[320px] sm:min-h-[345px] flex items-center justify-center filter drop-shadow-[0_12px_28px_rgba(140,106,41,0.22)]"
      >
        {/* Layer 1: Revealed Content (Beneath the foil inside the Jharokha shape) */}
        <div
          style={{ clipPath: `url(#${clipId})` }}
          className="absolute inset-0 bg-gradient-to-b from-[#FAF4E8] via-[#FAF2E4] to-[#F5EBDD] flex flex-col items-center justify-center px-6 py-8 text-center z-0 shadow-inner"
        >
          {/* Subtle sacred invocation / header */}
          <div className="flex items-center gap-1.5 text-[#C5A059] mb-1">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span className="text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.25em] font-bold">
              Save The Date
            </span>
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
          </div>

          {/* Wedding Date in Large Deep-Burgundy Serif */}
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] tracking-wide my-1 leading-snug drop-shadow-xs">
            {dateText}
          </h3>

          {/* Supporting Poetic Text */}
          <p className="text-xs sm:text-sm font-serif italic text-[#6B7C69] mt-1 max-w-[210px] font-medium leading-relaxed">
            &ldquo;{supportingText}&rdquo;
          </p>

          {/* Decorative antique gold divider flourish */}
          <div className="flex items-center gap-2 mt-3 opacity-60">
            <div className="w-8 h-px bg-[#C5A059]" />
            <span className="text-[#C5A059] text-[10px]">✦</span>
            <div className="w-8 h-px bg-[#C5A059]" />
          </div>
        </div>

        {/* Layer 2: Scratch Canvas Foil (Clipped to the exact Jharokha arch) */}
        <canvas
          ref={canvasRef}
          width={320}
          height={360}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ clipPath: `url(#${clipId})` }}
          className={`absolute inset-0 w-full h-full cursor-crosshair touch-none z-10 transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Interactive scratch card. Tap reveal button or drag pointer to scratch."
        />

        {/* Layer 3: Refined Antique-Gold Architectural Frame (SVG Overlay, Pointer Events None) */}
        <svg
          viewBox="0 0 320 360"
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="jharokhaGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8CE84" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#8C6A29" />
            </linearGradient>
            <linearGradient id="jharokhaInnerGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F3E1B8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Outer Main Jharokha Arch Outline */}
          <path
            d={JHAROKHA_VIEWBOX_PATH}
            fill="none"
            stroke="url(#jharokhaGold)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Delicate Concentric Accent Line */}
          <path
            d="M 160 30 C 153 34, 143 42, 137 54 C 130 63, 114 78, 102 96 C 91 113, 76 132, 64 151 C 55 161, 48 171, 47 186 L 47 313 C 47 325, 54 335, 70 337 L 160 337 L 250 337 C 266 335, 273 325, 273 313 L 273 186 C 272 171, 265 161, 256 151 C 244 132, 229 113, 218 96 C 206 78, 190 63, 183 54 C 177 42, 167 34, 160 30 Z"
            fill="none"
            stroke="url(#jharokhaInnerGold)"
            strokeWidth="0.8"
          />

          {/* Top Architectural Kalash / Lotus Finial */}
          <g transform="translate(160, 16)">
            {/* Kalash Base */}
            <path
              d="M -4 8 Q 0 4 4 8 Z"
              fill="url(#jharokhaGold)"
            />
            {/* Lotus Bud */}
            <path
              d="M 0 0 C -3 4, -4 7, 0 8 C 4 7, 3 4, 0 0 Z"
              fill="url(#jharokhaGold)"
            />
            <circle cx="0" cy="0" r="1.5" fill="#FAF0DA" />
          </g>

          {/* Left Stepped Shoulder Bracket (Corbel) */}
          <g transform="translate(40, 190)">
            <path
              d="M 0 0 L -4 4 L -4 10 L 0 8 Z"
              fill="url(#jharokhaGold)"
              opacity="0.8"
            />
          </g>

          {/* Right Stepped Shoulder Bracket (Corbel) */}
          <g transform="translate(280, 190)">
            <path
              d="M 0 0 L 4 4 L 4 10 L 0 8 Z"
              fill="url(#jharokhaGold)"
              opacity="0.8"
            />
          </g>

          {/* Base Sill Architectural Double Line */}
          <line
            x1="52"
            y1="344"
            x2="268"
            y2="344"
            stroke="url(#jharokhaGold)"
            strokeWidth="1.5"
          />
          <line
            x1="62"
            y1="348"
            x2="258"
            y2="348"
            stroke="url(#jharokhaGold)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Exterior Delicate Watercolor Botanical Floral Accents (Left Shoulder) */}
          <g transform="translate(32, 172)">
            {/* Sage foliage leaf */}
            <path
              d="M 0 0 C -6 -6, -10 -4, -12 2 C -8 6, -2 4, 0 0 Z"
              fill="#6B7C69"
              opacity="0.75"
            />
            {/* Soft pink rosebud */}
            <circle cx="-6" cy="-2" r="3.5" fill="#D98894" opacity="0.85" />
            <circle cx="-6" cy="-2" r="1.5" fill="#FAF0DA" opacity="0.9" />
          </g>

          {/* Exterior Delicate Watercolor Botanical Floral Accents (Right Shoulder) */}
          <g transform="translate(288, 172)">
            {/* Sage foliage leaf */}
            <path
              d="M 0 0 C 6 -6, 10 -4, 12 2 C 8 6, 2 4, 0 0 Z"
              fill="#6B7C69"
              opacity="0.75"
            />
            {/* Soft pink rosebud */}
            <circle cx="6" cy="-2" r="3.5" fill="#D98894" opacity="0.85" />
            <circle cx="6" cy="-2" r="1.5" fill="#FAF0DA" opacity="0.9" />
          </g>
        </svg>
      </div>

      {/* Accessible Tap to Reveal Fallback */}
      {!isRevealed && (
        <button
          type="button"
          onClick={handleRevealAll}
          className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-serif text-[#8C6A29] hover:text-[#4A0E17] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] px-3.5 py-1.5 rounded-full cursor-pointer transition-colors active:scale-95 bg-[#FAF6EE]/80 border border-[#C5A059]/30 shadow-xs"
          aria-label={hasScratched ? 'Reveal remaining wedding date' : 'Tap to reveal wedding date'}
        >
          <Eye className="w-3.5 h-3.5 text-[#8C6A29]" />
          <span>{hasScratched ? 'Reveal Remaining Date' : 'Tap to Reveal Wedding Date'}</span>
        </button>
      )}
    </div>
  );
}
