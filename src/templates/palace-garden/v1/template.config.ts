import type { TemplateMetadata, PublicThemeConfig } from '../../../modules/templates/domain/template-contract.ts';

export const palaceGardenMetadata: TemplateMetadata = {
  id: 'palace-garden',
  name: 'Palace Garden',
  version: '1.0.0',
  category: 'garden',
  description: 'An exquisite illustrated Indian wedding invitation template featuring warm ivory parchment, soft watercolor pink roses, muted sage foliage, traditional sandstone palace pavilions, and regal peacocks.',
  supportedSections: [
    'envelope-hero',
    'scratch-date',
    'couple-story',
    'family-introductions',
    'event-schedule',
    'photo-gallery',
    'wedding-countdown',
    'venue-map',
    'interactive-audio',
  ],
};

export const palaceGardenDefaultTheme: PublicThemeConfig = {
  primaryColor: '#4A0E17',     // Deep Wine / Royal Burgundy
  secondaryColor: '#6B7C69',   // Muted Sage Green
  accentColor: '#C5A059',      // Antique Gold
  backgroundColor: '#FAF6EE',  // Warm Ivory Parchment
  fontHeading: 'Cinzel, Georgia, serif',
  fontBody: 'Cormorant Garamond, Georgia, serif',
  fontScript: 'Great Vibes, cursive',
};
