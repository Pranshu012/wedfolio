'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useReducedMotion } from 'motion/react';
import { Eye, Sparkles } from 'lucide-react';
import { assetUrl, cn } from '@/lib/utils';

export interface PalaceMandalaScratchRevealProps {
  dateLine1?: string;
  dateLine2?: string;
  supportingText?: string;
  foilTagline?: string;
  foilInstruction?: string;
  onRevealed?: () => void;
  className?: string;
}

export function PalaceMandalaScratchReveal({
  dateLine1 = '31 JANUARY',
  dateLine2 = '2027',
  supportingText = 'The day we begin forever.',
  foilTagline = 'A LITTLE SURPRISE AWAITS',
  foilInstruction = 'Scratch to reveal our wedding date',
  onRevealed,
  className,
}: PalaceMandalaScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Subtle restrained antique gold & dusty rose celebratory sparkles
  const triggerRestrainedCelebration = useCallback(() => {
    if (shouldReduceMotion) return;
    confetti({
      particleCount: 20,
      spread: 42,
      startVelocity: 15,
      ticks: 60,
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

  // Paint the champagne gold metallic scratch foil inside the circular canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const r = width / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    // Circular clip path for the canvas interior
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // Luxurious champagne-gold metallic foil gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#FAF0DA');
    gradient.addColorStop(0.25, '#F3E1B8');
    gradient.addColorStop(0.5, '#E5CB95');
    gradient.addColorStop(0.75, '#D5B77B');
    gradient.addColorStop(1, '#C5A059');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle embossed watermark concentric rings
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(140, 106, 41, 0.3)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.arc(cx, cy, r - 24, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Decorative floral ornament
    ctx.fillStyle = '#8C6A29';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌸', cx, cy - 28);

    // Foil Tagline: "A LITTLE SURPRISE AWAITS"
    ctx.fillStyle = '#8C6A29';
    ctx.font = '700 9.5px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '2.5px';
    ctx.fillText(foilTagline, cx, cy - 6);

    // Foil Instruction: "Scratch to reveal our wedding date"
    ctx.fillStyle = '#4A0E17';
    ctx.font = 'italic 600 13px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(foilInstruction, cx, cy + 18);

    // Subtle divider flourish
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 34);
    ctx.lineTo(cx + 28, cy + 34);
    ctx.stroke();

    ctx.restore();
  }, [foilTagline, foilInstruction]);

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
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      let totalCirclePixels = 0;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = canvas.width / 2;

      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          const dist = Math.hypot(x - cx, y - cy);
          if (dist <= r - 4) {
            totalCirclePixels++;
            const idx = (y * canvas.width + x) * 4;
            if (pixels[idx + 3] < 128) {
              transparentPixels++;
            }
          }
        }
      }

      if (totalCirclePixels > 0) {
        const percentage = (transparentPixels / totalCirclePixels) * 100;
        if (percentage >= 48) {
          handleRevealAll();
        }
      }
    } catch {
      // Fallback
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
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
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
        'relative flex flex-col items-center justify-center my-4 sm:my-6 px-4 w-full max-w-[380px] sm:max-w-[420px] mx-auto select-none',
        className
      )}
    >
      {/* Outer Medallion Container (Maintains perfect aspect-square symmetry) */}
      <div className="relative w-full aspect-square filter drop-shadow-[0_12px_32px_rgba(140,106,41,0.22)]">
        
        {/* Layer 1: Central Scratch & Reveal Disc (Positioned at 19.6% inset = 60.8% diameter) */}
        <div
          style={{
            top: '19.6%',
            left: '19.6%',
            width: '60.8%',
            height: '60.8%',
          }}
          className="absolute rounded-full overflow-hidden z-10"
        >
          {/* Layer 1A: Underlying Revealed Wedding Date (Z-0) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE] via-[#FAF2E4] to-[#F5EBDD] flex flex-col items-center justify-center p-3 text-center z-0 select-none shadow-inner">
            {/* Header: "OUR WEDDING DAY" */}
            <div className="flex items-center gap-1 text-[#C5A059] mb-0.5 sm:mb-1">
              <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
              <span className="text-[8px] sm:text-[10px] font-serif uppercase tracking-[0.25em] font-bold">
                OUR WEDDING DAY
              </span>
              <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
            </div>

            {/* Two-Line Wedding Date in bold Deep Burgundy */}
            <div className="flex flex-col items-center leading-tight my-0.5 sm:my-1">
              <span className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-[#4A0E17] tracking-wider drop-shadow-xs">
                {dateLine1}
              </span>
              <span className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-[#4A0E17] tracking-widest mt-0.5 drop-shadow-xs">
                {dateLine2}
              </span>
            </div>

            {/* Small antique-gold floral ornament divider */}
            <div className="flex items-center gap-1.5 my-1 opacity-70">
              <div className="w-5 h-px bg-[#C5A059]" />
              <span className="text-[#C5A059] text-[8px]">✦</span>
              <div className="w-5 h-px bg-[#C5A059]" />
            </div>

            {/* Supporting Romantic Subtitle */}
            <p className="text-[9.5px] sm:text-[11.5px] font-serif italic text-[#6B7C69] font-medium leading-tight max-w-[140px] sm:max-w-[170px]">
              &ldquo;{supportingText}&rdquo;
            </p>
          </div>

          {/* Layer 1B: Champagne Gold Scratch Canvas (Z-10) */}
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute inset-0 w-full h-full cursor-crosshair touch-none z-10 transition-opacity duration-700 ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Interactive scratch card. Drag pointer across or tap button below to reveal."
          />
        </div>

        {/* Layer 2: Permanent Intricate Ornamental Gold Mandala Frame (Z-20, Never Scratched) */}
        <img
          src={assetUrl('/themes/palace-garden/royal-mandala-frame.png')}
          alt="Royal Ornamental Gold Mandala Frame"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 select-none"
        />
      </div>

      {/* Layer 3: Accessible Tap to Reveal Fallback */}
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
