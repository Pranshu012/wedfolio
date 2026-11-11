/**
 * Centralized Design System Tokens for Wedfolio
 * Enforces visual hierarchy, spacing, typography, and theme personality.
 */

export const THEME_TOKENS = {
  royalHeritage: {
    name: 'Royal Heritage',
    personality: 'Ceremonial, regal, structured, luxurious',
    colors: {
      primary: '#5B0E2D',        // Imperial Burgundy
      secondary: '#0B3C2D',      // Royal Emerald
      accent: '#D4AF37',         // Warm Antique Gold
      accentLight: '#F3D794',    // Pale Antique Gold
      accentDark: '#AA7D19',     // Deep Bronze Gold
      background: '#FDFBF7',     // Warm Ivory
      surface: '#FAF4E8',        // Ivory Parchment Surface
      deepBg: '#1F030E',         // Midnight Burgundy
      text: '#1C1917',           // Stone 900
      textMuted: '#57534E',      // Stone 600
    },
    borders: {
      subtle: '1px solid rgba(212, 175, 55, 0.35)',
      standard: '1px solid rgba(212, 175, 55, 0.6)',
      prominent: '2px solid rgba(212, 175, 55, 0.85)',
      radius: '1rem',            // rounded-2xl
      radiusSm: '0.75rem',       // rounded-xl
    },
    shadows: {
      ambient: '0 10px 30px -10px rgba(91, 14, 45, 0.08)',
      card: '0 14px 40px -12px rgba(91, 14, 45, 0.12)',
      glow: '0 0 20px rgba(212, 175, 55, 0.35)',
    },
    typography: {
      heading: 'Cinzel, Georgia, serif',
      body: 'Cormorant Garamond, Georgia, serif',
      accent: 'Great Vibes, cursive',
    },
  },
  palaceGarden: {
    name: 'Palace Garden',
    personality: 'Romantic, artistic, botanical, illustrated, soft',
    colors: {
      primary: '#4A0E17',        // Deep Wine
      secondary: '#6B7C69',      // Muted Sage Green
      sageLight: '#8A9A86',      // Soft Sage
      accent: '#C5A059',         // Warm Antique Gold
      rose: '#D98894',           // Dusty Watercolor Rose
      roseLight: '#EAB8C0',      // Soft Blush Rose
      background: '#F5EBDD',     // Warm Antique Parchment
      surface: '#FAF4E8',        // Soft Ivory Parchment Surface
      surfaceTint: '#EFE5D5',    // Aged Parchment Tint
      text: '#4A0E17',           // Deep Wine Typography
      textMuted: '#5C5446',      // Warm Earth Muted
    },
    borders: {
      subtle: '1px solid rgba(197, 160, 89, 0.3)',
      standard: '1px solid rgba(197, 160, 89, 0.55)',
      prominent: '2px solid rgba(197, 160, 89, 0.75)',
      radius: '1.25rem',         // softer organic radius
      radiusSm: '0.75rem',
    },
    shadows: {
      ambient: '0 8px 25px -8px rgba(74, 14, 23, 0.06)',
      card: '0 12px 32px -10px rgba(74, 14, 23, 0.09)',
      glow: '0 0 16px rgba(197, 160, 89, 0.25)',
    },
    typography: {
      heading: 'Cinzel, Georgia, serif',
      body: 'Cormorant Garamond, Georgia, serif',
      accent: 'Great Vibes, cursive',
    },
  },
} as const;
