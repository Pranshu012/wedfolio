import type { TemplateMetadata, PublicThemeConfig } from '../../../modules/templates/domain/template-contract.ts';

export const royalHeritageMetadata: TemplateMetadata = {
  id: 'royal-heritage',
  name: 'Royal Heritage',
  version: '1.0.0',
  category: 'royal',
  description: 'An opulent, regal Indian wedding celebration template featuring imperial gold borders, burgundy velour, and sacred traditional motifs.',
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

export const royalHeritageDefaultTheme: PublicThemeConfig = {
  primaryColor: '#5B0E2D',     // Imperial Burgundy
  secondaryColor: '#0B3C2D',   // Regal Emerald
  accentColor: '#D4AF37',      // Warm Antique Gold
  backgroundColor: '#FDFBF7',  // Vintage Ivory Parchment
  fontHeading: 'Cinzel, Georgia, serif',
  fontBody: 'Cormorant Garamond, serif',
  fontScript: 'Great Vibes, cursive',
};
