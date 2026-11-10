import type React from 'react';
import type { PublicWeddingSnapshot, PublicThemeConfig } from '../../publishing/domain/public-snapshot.schema.ts';

export type { PublicWeddingSnapshot, PublicThemeConfig };

export type TemplateSectionIdentifier =
  | 'envelope-hero'
  | 'couple-story'
  | 'family-introductions'
  | 'event-schedule'
  | 'photo-gallery'
  | 'wedding-countdown'
  | 'venue-map'
  | 'interactive-audio'
  | 'scratch-date';

export interface TemplateMetadata {
  id: string; // e.g. 'royal-heritage'
  name: string;
  version: string; // Semantic version, e.g. '1.0.0'
  category: 'royal' | 'editorial' | 'garden';
  supportedSections: TemplateSectionIdentifier[];
  previewImageUrl?: string;
  description: string;
}

export interface WeddingTemplateProps {
  content: PublicWeddingSnapshot;
  theme: PublicThemeConfig;
  isInteractivePreview?: boolean;
  isEditor?: boolean;
}

export interface WeddingTemplateDefinition {
  metadata: TemplateMetadata;
  defaultTheme: PublicThemeConfig;
  Component: React.ComponentType<WeddingTemplateProps>;
}
