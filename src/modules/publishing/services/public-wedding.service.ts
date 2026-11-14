import { createPublicClient } from '../../../lib/supabase/public.ts';
import {
  PublicWeddingSnapshotSchema,
  PublicThemeConfigSchema,
  type PublicWeddingSnapshot,
  type PublicThemeConfig,
} from '../domain/public-snapshot.schema.ts';

export interface PublicWeddingData {
  slug: string;
  templateId: string;
  templateVersion: string;
  content: PublicWeddingSnapshot;
  theme: PublicThemeConfig;
  publishedAt: string;
}

// Fallback seed data for local preview and development
export const SHREYA_PRANSHU_FALLBACK: PublicWeddingData = {
  slug: 'shreya-pranshu',
  templateId: 'palace-garden',
  templateVersion: '1.0.0',
  theme: {
    primaryColor: '#4A0E17',
    secondaryColor: '#6B7C69',
    accentColor: '#C5A059',
    backgroundColor: '#F5EBDD',
    fontHeading: 'Cinzel, Georgia, serif',
    fontBody: 'Cormorant Garamond, serif',
    fontScript: 'Great Vibes, cursive',
  },
  publishedAt: new Date().toISOString(),
  content: {
    weddingTitle: 'The Royal Wedding of Shreya & Pranshu',
    slug: 'shreya-pranshu',
    eventDate: '2026-12-12',
    eventStartTime: '18:00',
    timezone: 'Asia/Kolkata',
    couple: {
      bride: {
        fullName: 'Shreya',
        bio: 'A graceful soul with an infectious smile, bringing elegance, laughter, and light into every room she enters.',
        avatarUrl: '/static/shreya-portrait.webp',
      },
      groom: {
        fullName: 'Pranshu',
        bio: 'A visionary thinker with a compassionate heart, deeply devoted to building a wondrous life and shared adventures.',
        avatarUrl: '/static/pranshu-portrait.webp',
      },
      story: 'Two hearts brought together by destiny, nurtured by shared laughter, boundless dreams, and a royal celebration of lifelong love.',
    },
    family: [
      {
        name: 'Dr. Rajesh & Mrs. Sunita Sharma',
        relation: 'Parents of the Bride',
        side: 'bride',
        blessingMessage: 'With abundant blessings and joy as our beloved daughter embarks on her grand journey of eternal love.',
      },
      {
        name: 'Aarav Sharma',
        relation: 'Brother of the Bride',
        side: 'bride',
        blessingMessage: 'Wishing my sister and Pranshu a lifetime of magical moments and laughter.',
      },
      {
        name: 'Mr. Anil & Mrs. Rekha Gupta',
        relation: 'Parents of the Groom',
        side: 'groom',
        blessingMessage: 'Welcoming our dear Shreya into our hearts and family with open arms, blessings, and imperial celebration.',
      },
      {
        name: 'Rohan Gupta',
        relation: 'Brother of the Groom',
        side: 'groom',
        blessingMessage: 'Cheers to my brother and new sister Shreya. May your bond grow stronger with each passing sunrise.',
      },
    ],
    schedule: [
      {
        id: 'haldi',
        name: 'Shubh Haldi & Phoolon Ki Holi',
        date: '2026-12-11',
        startTime: '10:00 AM',
        venueName: 'The Courtyard Gardens',
        description: 'A radiant morning filled with turmeric blessings, marigold petals, and joyous folk melodies.',
        dressCode: 'Sunshine Yellow & Festive Traditional',
      },
      {
        id: 'mehendi-sangeet',
        name: 'Royal Mehendi & Sangeet Utsav',
        date: '2026-12-11',
        startTime: '06:30 PM',
        venueName: 'The Grand Ballroom & Amphitheatre',
        description: 'An evening of intricate henna art, scintillating musical performances, and royal ballroom celebration.',
        dressCode: 'Regal Emerald & Glamorous Cocktail',
      },
      {
        id: 'varmala-pheras',
        name: 'The Royal Varmala & Vedic Pheras',
        date: '2026-12-12',
        startTime: '05:00 PM',
        venueName: 'The Palace Mandapam',
        description: 'The sacred union amidst Vedic chants, floral shower, and exchange of royal garlands at twilight.',
        dressCode: 'Imperial Royal Traditional (Sherwani & Lehengas)',
      },
      {
        id: 'reception',
        name: 'The Grand Imperial Gala Reception',
        date: '2026-12-13',
        startTime: '07:30 PM',
        venueName: 'The Crystal Palace Gardens',
        description: 'A magnificent starlit banquet celebrating the newlyweds with imperial delicacies and live orchestral harmony.',
        dressCode: 'Black Tie / Royal Formal',
      },
    ],
    isVenueEnabled: true,
    venue: {
      name: 'The Royal Palace & Heritage Gardens',
      address: 'Heritage Palace Estate, Palace Road, Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.08272998782!2d75.71960244795325!3d26.912433644265415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db479f9d19727%3A0x68818205f7332fb7!2sCity%20Palace%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?q=City+Palace+Jaipur',
      coordinates: {
        lat: 26.9258,
        lng: 75.8237,
      },
    },
    gallery: [
      {
        url: '/static/gallery-1.webp',
        caption: 'A shared glance of infinite tomorrow',
        aspectRatio: '4:5',
      },
      {
        url: '/static/gallery-2.webp',
        caption: 'Imperial heritage & timeless celebration',
        aspectRatio: '4:5',
      },
      {
        url: '/static/gallery-3.webp',
        caption: 'Laughter captured beneath palace arches',
        aspectRatio: '4:5',
      },
      {
        url: '/static/gallery-4.webp',
        caption: 'Hand in hand towards our grand chapter',
        aspectRatio: '4:5',
      },
    ],
    interactive: {
      envelopeSealText: 'S & P',
      scratchDateText: 'Save The Date: 12th December 2026',
      backgroundMusicUrl: undefined,
      musicTitle: 'Royal Shehnai & Sitar Harmony',
    },
  },
};

/**
 * Fetches the active published wedding snapshot by slug.
 * Safely parses the content and theme using Zod schemas.
 */
export async function getPublishedWeddingBySlug(
  slug: string
): Promise<PublicWeddingData | null> {
  try {
    const supabase = createPublicClient();

    // Query the restricted public view or RPC function
    const { data, error } = await supabase
      .from('public_wedding_view')
      .select('slug, template_id, template_version, content, theme, published_at')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      // If remote Supabase is not connected or record not found, fallback for shreya-pranshu
      if (slug === 'shreya-pranshu') {
        return SHREYA_PRANSHU_FALLBACK;
      }
      return null;
    }

    const validatedContent = PublicWeddingSnapshotSchema.parse(data.content);
    const validatedTheme = PublicThemeConfigSchema.parse(data.theme);

    return {
      slug: data.slug,
      templateId: data.template_id,
      templateVersion: data.template_version,
      content: validatedContent,
      theme: validatedTheme,
      publishedAt: data.published_at,
    };
  } catch (error) {
    console.warn(`[getPublishedWeddingBySlug] Falling back for slug "${slug}":`, error);
    if (slug === 'shreya-pranshu') {
      return SHREYA_PRANSHU_FALLBACK;
    }
    return null;
  }
}
