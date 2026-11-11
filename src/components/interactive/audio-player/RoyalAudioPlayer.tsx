'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Music2 } from 'lucide-react';
import { assetUrl, cn } from '@/lib/utils';

export interface RoyalAudioPlayerProps {
  audioUrl?: string;
  trackTitle?: string;
  variant?: 'royal' | 'palace';
  className?: string;
}

export function RoyalAudioPlayer({
  audioUrl,
  trackTitle = 'Royal Shehnai & Sitar Harmony',
  variant = 'royal',
  className,
}: RoyalAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Normalize audio URL using assetUrl to support GitHub Pages base path
  const normalizedAudioUrl =
    audioUrl && audioUrl.trim().length > 0 ? assetUrl(audioUrl) : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setHasError(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
    };
  }, [normalizedAudioUrl]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.warn('Audio playback could not start:', err);
          setIsPlaying(false);
          if (audio.error) {
            setHasError(true);
          }
        });
    }
  }, [isPlaying, hasError]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  const isPalace = variant === 'palace';

  // State 1: No valid audio asset configured or unrecoverable audio load error
  // Displays the disabled "Music coming soon" floating pill
  if (!normalizedAudioUrl || hasError) {
    return (
      <aside
        aria-label="Background Wedding Music"
        className={cn(
          'fixed z-40 flex items-center transition-all select-none',
          className
        )}
        style={{
          bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
          right: 'max(1rem, env(safe-area-inset-right, 1rem))',
        }}
      >
        <div
          role="status"
          aria-label="Background music coming soon"
          title="Background wedding music will be available soon"
          className={cn(
            'flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border backdrop-blur-md transition-all shadow-lg',
            isPalace
              ? 'bg-[#FAF6EE]/95 border-[#C5A059]/60 shadow-[0_8px_25px_rgba(74,14,23,0.12)] text-[#4A0E17]'
              : 'bg-gradient-to-r from-[#38061B]/95 via-[#4A0B24]/95 to-[#240310]/95 border-[#D4AF37]/50 shadow-[0_8px_25px_rgba(91,14,45,0.30)] text-[#FDFBF7]'
          )}
        >
          {/* Muted decorative icon badge */}
          <div
            className={cn(
              'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 border',
              isPalace
                ? 'bg-[#EFE4D2] border-[#C5A059]/50 text-[#8C6A29]'
                : 'bg-[#5B0E2D] border-[#D4AF37]/40 text-[#D4AF37]'
            )}
            aria-hidden="true"
          >
            <Music2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80" />
          </div>

          {/* Microcopy with theme-specific typography */}
          <div className="flex flex-col pr-1 min-w-0 text-left">
            <span
              className={cn(
                'text-[8px] sm:text-[9px] font-serif uppercase tracking-[0.2em] font-semibold',
                isPalace ? 'text-[#6B7C69]' : 'text-[#D4AF37]/80'
              )}
            >
              Melody
            </span>
            <span
              className={cn(
                'text-[10px] sm:text-[11px] font-serif italic max-w-[110px] sm:max-w-[150px] truncate leading-tight',
                isPalace ? 'text-[#4A0E17]/85' : 'text-[#FDFBF7]/85'
              )}
            >
              Music coming soon
            </span>
          </div>
        </div>
      </aside>
    );
  }

  // State 2: Active interactive player with valid audioUrl
  return (
    <aside
      aria-label="Background Wedding Music"
      className={cn(
        'fixed z-40 flex items-center select-none',
        className
      )}
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
        right: 'max(1rem, env(safe-area-inset-right, 1rem))',
      }}
    >
      <audio ref={audioRef} src={normalizedAudioUrl} loop preload="none" />

      <div
        className={cn(
          'flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border backdrop-blur-md transition-all shadow-lg',
          isPalace
            ? 'bg-gradient-to-r from-[#FAF6EE] via-[#FAF4E8] to-[#F5EBDD] border-[#C5A059]/70 shadow-[0_8px_25px_rgba(74,14,23,0.12)] text-[#4A0E17]'
            : 'bg-gradient-to-r from-[#38061B] via-[#4A0B24] to-[#240310] border-[#D4AF37]/75 shadow-[0_8px_25px_rgba(91,14,45,0.35)] text-[#FDFBF7]'
        )}
      >
        {/* Semantic Play/Pause Button (No invalid nested buttons) */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={
            isPlaying ? 'Pause background wedding music' : 'Play background wedding music'
          }
          aria-pressed={isPlaying}
          title={isPlaying ? 'Pause music' : 'Play background music'}
          className={cn(
            'flex items-center gap-2 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 transition-all active:scale-95 group text-left',
            isPalace
              ? 'focus-visible:ring-[#8C6A29] focus-visible:ring-offset-[#FAF6EE]'
              : 'focus-visible:ring-[#D4AF37] focus-visible:ring-offset-[#38061B]'
          )}
        >
          {/* Circular Gold Play/Pause Icon Button */}
          <span
            className={cn(
              'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 transition-transform group-hover:scale-105',
              isPalace
                ? 'bg-gradient-to-br from-[#E8CE84] via-[#D4AF37] to-[#8C6A29] text-[#3D0C1A]'
                : 'bg-gradient-to-br from-[#E2B755] via-[#D4AF37] to-[#AA7D19] text-[#420A20]'
            )}
            aria-hidden="true"
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            ) : (
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
            )}
          </span>

          {/* Track Eyebrow & Title */}
          <span className="flex flex-col pr-0.5 min-w-0">
            <span
              className={cn(
                'text-[8px] sm:text-[9px] font-serif uppercase tracking-[0.2em] font-semibold',
                isPalace ? 'text-[#6B7C69]' : 'text-[#D4AF37]'
              )}
            >
              {isPlaying ? 'Now Playing' : 'Background Music'}
            </span>
            <span
              className={cn(
                'text-[10px] sm:text-[11px] font-serif max-w-[95px] sm:max-w-[150px] truncate leading-tight',
                isPalace ? 'text-[#4A0E17]' : 'text-[#FDFBF7]'
              )}
            >
              {trackTitle}
            </span>
          </span>

          {/* Equalizer Waveform while playing (Respects prefers-reduced-motion) */}
          {isPlaying && (
            <span
              className="flex items-end gap-0.5 h-3 pl-0.5 text-current flex-shrink-0"
              aria-hidden="true"
            >
              <span
                className={cn(
                  'w-0.5 h-full rounded-full motion-safe:animate-pulse motion-reduce:h-2',
                  isPalace ? 'bg-[#6B7C69]' : 'bg-[#D4AF37]'
                )}
              />
              <span
                className={cn(
                  'w-0.5 h-1.5 rounded-full motion-safe:animate-bounce motion-reduce:h-2',
                  isPalace ? 'bg-[#8C6A29]' : 'bg-[#F3D794]'
                )}
              />
              <span
                className={cn(
                  'w-0.5 h-2.5 rounded-full motion-safe:animate-pulse motion-reduce:h-2',
                  isPalace ? 'bg-[#6B7C69]' : 'bg-[#D4AF37]'
                )}
              />
            </span>
          )}
        </button>

        {/* Separate Sibling Mute / Unmute Button */}
        {isPlaying && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            aria-pressed={isMuted}
            title={isMuted ? 'Unmute' : 'Mute'}
            className={cn(
              'p-1 sm:p-1.5 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 transition-colors ml-0.5 active:scale-95 flex-shrink-0',
              isPalace
                ? 'text-[#8C6A29] hover:text-[#4A0E17] hover:bg-[#8C6A29]/10 focus-visible:ring-[#8C6A29]'
                : 'text-[#D4AF37] hover:text-[#FDFBF7] hover:bg-[#D4AF37]/10 focus-visible:ring-[#D4AF37]'
            )}
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            ) : (
              <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            )}
          </button>
        )}
      </div>
    </aside>
  );
}
