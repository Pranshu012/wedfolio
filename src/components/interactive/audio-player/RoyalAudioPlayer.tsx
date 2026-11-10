'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface RoyalAudioPlayerProps {
  audioUrl?: string;
  trackTitle?: string;
}

export function RoyalAudioPlayer({
  audioUrl = '/audio/royal-sitar-harmony.mp3',
  trackTitle = 'Royal Shehnai & Sitar Harmony',
}: RoyalAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('error', handleError);
    return () => audio.removeEventListener('error', handleError);
  }, []);

  const togglePlay = () => {
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
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!audioUrl) return null;

  return (
    <aside
      aria-label="Background Wedding Music"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center"
    >
      <audio ref={audioRef} src={audioUrl} loop preload="none" />

      <div
        onClick={togglePlay}
        className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-gradient-to-r from-[#38061B] via-[#4A0B24] to-[#240310] border border-[#D4AF37]/75 shadow-[0_8px_25px_rgba(91,14,45,0.25)] cursor-pointer hover:border-[#D4AF37] active:scale-95 transition-all text-[#FDFBF7]"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            togglePlay();
          }
        }}
        aria-label={isPlaying ? 'Pause background wedding music' : 'Play background wedding music'}
      >
        {/* Play / Pause Circular Gold Button */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#E2B755] via-[#D4AF37] to-[#AA7D19] flex items-center justify-center text-[#420A20] shadow-sm flex-shrink-0">
          {isPlaying ? (
            <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          ) : (
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
          )}
        </div>

        {/* Track Title and Equalizer */}
        <div className="flex flex-col pr-1 min-w-0">
          <span className="text-[8px] sm:text-[9px] font-serif uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            {isPlaying ? 'Now Playing' : 'Shehnai & Sitar'}
          </span>
          <span className="text-[11px] font-serif text-[#FDFBF7] max-w-[110px] sm:max-w-[160px] truncate leading-tight">
            {trackTitle}
          </span>
        </div>

        {/* Animated Equalizer Waveform when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 pl-0.5" aria-hidden="true">
            <span className="w-0.5 h-full bg-[#D4AF37] animate-pulse" />
            <span className="w-0.5 h-1.5 bg-[#F3D794] animate-bounce" />
            <span className="w-0.5 h-2.5 bg-[#D4AF37] animate-pulse" />
          </div>
        )}

        {/* Mute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1 text-[#D4AF37] hover:text-[#FDFBF7] transition-colors ml-0.5 cursor-pointer"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3" />
            ) : (
              <Volume2 className="w-3 h-3" />
            )}
          </button>
        )}
      </div>
    </aside>
  );
}
