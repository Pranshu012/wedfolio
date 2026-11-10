import { z } from 'zod';

export const PublicCoupleMemberSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export const PublicCoupleSchema = z.object({
  bride: PublicCoupleMemberSchema,
  groom: PublicCoupleMemberSchema,
  story: z.string().optional(),
});

export const PublicFamilyMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relation: z.string().min(1, 'Relation is required'),
  side: z.enum(['bride', 'groom']),
  photoUrl: z.string().optional(),
  blessingMessage: z.string().optional(),
});

export const PublicEventScheduleItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Event name is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().optional(),
  venueName: z.string().min(1, 'Venue name is required'),
  description: z.string().optional(),
  dressCode: z.string().optional(),
});

export const PublicVenueSchema = z.object({
  name: z.string().min(1, 'Venue name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  googleMapsEmbedUrl: z.string().url('Must be a valid URL'),
  directionsUrl: z.string().url('Must be a valid URL'),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

export const PublicGalleryItemSchema = z.object({
  url: z.string().min(1, 'Image URL is required'),
  caption: z.string().optional(),
  aspectRatio: z.enum(['1:1', '4:5', '16:9']).default('4:5'),
});

export const PublicInteractiveConfigSchema = z.object({
  envelopeSealText: z.string().default('S & P'),
  scratchDateText: z.string().default('Save The Date: 12th December 2026'),
  backgroundMusicUrl: z.string().optional(),
  musicTitle: z.string().default('Royal Shehnai & Sitar Harmony'),
});

export const PublicThemeConfigSchema = z.object({
  primaryColor: z.string().default('#5B0E2D'),
  secondaryColor: z.string().default('#0B3C2D'),
  accentColor: z.string().default('#D4AF37'),
  backgroundColor: z.string().default('#FDFBF7'),
  fontHeading: z.string().default('Cinzel, serif'),
  fontBody: z.string().default('Cormorant Garamond, serif'),
  fontScript: z.string().default('Great Vibes, cursive'),
});

export const PublicWeddingSnapshotSchema = z.object({
  weddingTitle: z.string().min(1, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  eventStartTime: z.string().optional(),
  timezone: z.string().default('Asia/Kolkata'),
  couple: PublicCoupleSchema,
  family: z.array(PublicFamilyMemberSchema).default([]),
  schedule: z.array(PublicEventScheduleItemSchema).default([]),
  isVenueEnabled: z.boolean().default(false),
  venue: PublicVenueSchema.optional(),
  gallery: z.array(PublicGalleryItemSchema).default([]),
  interactive: PublicInteractiveConfigSchema.default({
    envelopeSealText: 'S & P',
    scratchDateText: 'Save The Date: 12th December 2026',
    musicTitle: 'Royal Shehnai & Sitar Harmony',
  }),
});

export type PublicCoupleMember = z.infer<typeof PublicCoupleMemberSchema>;
export type PublicCouple = z.infer<typeof PublicCoupleSchema>;
export type PublicFamilyMember = z.infer<typeof PublicFamilyMemberSchema>;
export type PublicEventScheduleItem = z.infer<typeof PublicEventScheduleItemSchema>;
export type PublicVenue = z.infer<typeof PublicVenueSchema>;
export type PublicGalleryItem = z.infer<typeof PublicGalleryItemSchema>;
export type PublicInteractiveConfig = z.infer<typeof PublicInteractiveConfigSchema>;
export type PublicThemeConfig = z.infer<typeof PublicThemeConfigSchema>;
export type PublicWeddingSnapshot = z.infer<typeof PublicWeddingSnapshotSchema>;
