'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PetalConfig {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotate: number;
}

const PETALS: PetalConfig[] = [
  { id: 1, left: '8%', size: 14, duration: 14, delay: 0, color: '#D98894', rotate: 25 },
  { id: 2, left: '22%', size: 18, duration: 16, delay: 3, color: '#EAB8C0', rotate: 45 },
  { id: 3, left: '38%', size: 12, duration: 13, delay: 1, color: '#D98894', rotate: -30 },
  { id: 4, left: '62%', size: 16, duration: 15, delay: 4, color: '#EAB8C0', rotate: 60 },
  { id: 5, left: '78%', size: 13, duration: 17, delay: 2, color: '#8A9A86', rotate: -15 },
  { id: 6, left: '92%', size: 15, duration: 14, delay: 5, color: '#D98894', rotate: 40 },
];

export function FloatingPetals() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10 select-none">
      {PETALS.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, 15, -15, 0],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [petal.rotate, petal.rotate + 180],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: petal.left }}
          className="absolute top-0"
        >
          {/* Delicate Watercolor Petal SVG */}
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            className="opacity-60 drop-shadow-xs"
          >
            <path
              d="M10 0 C16 4, 20 12, 17 20 C14 26, 6 26, 3 20 C0 12, 4 4, 10 0 Z"
              fill={petal.color}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
