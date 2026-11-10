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
        className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[#4A0B24] via-[#5B0E2D] to-[#2B0514] border-2 border-[#D4AF37] shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all text-[#FDFBF7]"
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
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#E2B755] via-[#D4AF37] to-[#AA7D19] flex items-center justify-center text-[#420A20] shadow-md flex-shrink-0">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
          )}
        </div>

        {/* Track Title and Equalizer */}
        <div className="flex flex-col pr-1 min-w-0">
          <span className="text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] text-[#F3D794] font-semibold">
            {isPlaying ? 'Now Playing' : 'Royal Melody'}
          </span>
          <span className="text-xs font-serif text-[#FDFBF7] max-w-[140px] sm:max-w-[200px] truncate leading-tight">
            {trackTitle}
          </span>
        </div>

        {/* Animated Equalizer Waveform when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 pl-1" aria-hidden="true">
            <span className="w-0.5 h-full bg-[#D4AF37] animate-pulse" />
            <span className="w-0.5 h-2 bg-[#F3D794] animate-bounce" />
            <span className="w-0.5 h-3 bg-[#D4AF37] animate-pulse" />
          </div>
        )}

        {/* Mute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1 text-[#D4AF37] hover:text-[#FDFBF7] transition-colors ml-1 cursor-pointer"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </aside>
  );
}
