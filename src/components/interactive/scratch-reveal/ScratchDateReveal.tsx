'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Eye } from 'lucide-react';

interface ScratchDateRevealProps {
  revealText: string; // e.g. "Saturday, 12th December 2026"
  subText?: string;
  muhuratTime?: string; // e.g. "Auspicious Muhurat: 06:00 PM onwards"
  onRevealed?: () => void;
}

export function ScratchDateReveal({
  revealText,
  subText = 'Save The Auspicious Date',
  muhuratTime = 'Godhuli Bela • 06:00 PM',
  onRevealed,
}: ScratchDateRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#5B0E2D', '#0B3C2D', '#F3D794'],
    });
  }, []);

  const handleRevealAll = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);
    triggerConfetti();
    onRevealed?.();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isRevealed, onRevealed, triggerConfetti]);

  // Paint the metallic gold scratch layer on canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.25, '#F3D794');
    gradient.addColorStop(0.5, '#C69324');
    gradient.addColorStop(0.75, '#F5DE9B');
    gradient.addColorStop(1, '#AA7D19');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative traditional diamond pattern overlay
    ctx.strokeStyle = 'rgba(91, 14, 45, 0.25)';
    ctx.lineWidth = 1.2;
    for (let i = -height; i < width + height; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(i + height, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }

    // Outer border on canvas
    ctx.strokeStyle = 'rgba(91, 14, 45, 0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, width - 6, height - 6);

    // Calligraphic instruction text
    ctx.fillStyle = '#420A20';
    ctx.font = 'bold 13px Cinzel, Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, height / 2 - 8);

    ctx.fillStyle = '#5B0E2D';
    ctx.font = 'italic 10px Cormorant Garamond, serif';
    ctx.fillText('(Drag pointer or swipe across)', width / 2, height / 2 + 12);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Check scratch percentage accurately
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      const totalSampled = pixels.length / 16;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] < 128) {
          transparentPixels++;
        }
      }

      const percentage = (transparentPixels / totalSampled) * 100;
      if (percentage > 35) {
        handleRevealAll();
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
    // Scale coordinates accurately for responsive display sizing
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

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
    <div className="flex flex-col items-center justify-center my-6 px-4 w-full max-w-sm mx-auto">
      {/* Subtitle Header */}
      <div className="text-center mb-2.5">
        <span className="text-[#D4AF37] text-xs font-serif uppercase tracking-[0.25em] flex items-center justify-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          {subText}
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </span>
      </div>

      {/* Card Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[2.8/1] min-h-[110px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#420A20] via-[#5B0E2D] to-[#2B0514] flex items-center justify-center select-none"
      >
        {/* Hidden Content Revealed Beneath Scratch Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-0">
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#F3D794] font-semibold">
            Wedding Muhurat
          </span>
          <span className="text-lg sm:text-xl font-serif font-bold text-[#FDFBF7] tracking-wider mt-1 drop-shadow-sm">
            {revealText}
          </span>
          <span className="text-[11px] font-serif italic text-[#E0C097] mt-0.5">
            {muhuratTime}
          </span>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={360}
          height={130}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 w-full h-full cursor-crosshair touch-none z-10 transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Interactive scratch card. Tap reveal button or drag pointer to scratch."
        />
      </div>

      {/* Accessible Tap to Reveal Fallback */}
      {!isRevealed && (
        <button
          onClick={handleRevealAll}
          className="mt-3 text-xs font-serif text-[#D4AF37] hover:text-[#F3D794] flex items-center gap-1.5 transition-colors underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] px-3 py-1 rounded cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{hasScratched ? 'Reveal Remaining Date' : 'Tap to Reveal Wedding Date'}</span>
        </button>
      )}
    </div>
  );
}
