import { ImageResponse } from 'next/og';
import { getPublishedWeddingBySlug } from '@/modules/publishing/services/public-wedding.service';

export const runtime = 'nodejs';
export const alt = 'The Royal Wedding Celebration';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const wedding = await getPublishedWeddingBySlug(slug);

  const coupleNames = wedding
    ? `${wedding.content.couple.bride.fullName} & ${wedding.content.couple.groom.fullName}`
    : 'Shreya & Pranshu';

  const weddingTitle = wedding?.content.weddingTitle || 'The Royal Wedding';
  const eventDate = wedding?.content.eventDate || '12th December 2026';
  const city = wedding?.content.venue?.city || 'Jaipur, Rajasthan';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2B0514 0%, #5B0E2D 50%, #1A040D 100%)',
          color: '#FDFBF7',
          padding: '40px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Outer Gold Border */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '3px solid #D4AF37',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
          }}
        >
          {/* Top Traditional Mantra */}
          <div
            style={{
              fontSize: '18px',
              letterSpacing: '6px',
              color: '#F3D794',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            || Shree Ganeshay Namah ||
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '22px',
              letterSpacing: '4px',
              color: '#D4AF37',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            {weddingTitle}
          </div>

          {/* Couple Names */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#FDFBF7',
              marginBottom: '20px',
              textAlign: 'center',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            {coupleNames}
          </div>

          {/* Gold Divider Line */}
          <div
            style={{
              width: '180px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
              marginBottom: '20px',
            }}
          />

          {/* Date & Destination */}
          <div
            style={{
              fontSize: '24px',
              color: '#F3D794',
              fontStyle: 'italic',
              marginBottom: '6px',
            }}
          >
            {eventDate} • {city}
          </div>

          <div
            style={{
              fontSize: '14px',
              color: 'rgba(212, 175, 55, 0.7)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginTop: '16px',
            }}
          >
            Wedfolio Royal Wedding Invitation
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
