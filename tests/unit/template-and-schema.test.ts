import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  PublicWeddingSnapshotSchema,
  PublicVenueSchema,
} from '../../src/modules/publishing/domain/public-snapshot.schema.ts';
import { TemplateVersionNotFoundError } from '../../src/modules/templates/domain/template-errors.ts';
import { royalHeritageMetadata, royalHeritageDefaultTheme } from '../../src/templates/royal-heritage/v1/template.config.ts';
import { palaceGardenMetadata, palaceGardenDefaultTheme } from '../../src/templates/palace-garden/v1/template.config.ts';
import { SHREYA_PRANSHU_FALLBACK } from '../../src/modules/publishing/services/public-wedding.service.ts';

describe('Public Wedding Snapshot Schema Validation', () => {
  it('successfully validates the Shreya & Pranshu seeded snapshot', () => {
    const parsed = PublicWeddingSnapshotSchema.parse(SHREYA_PRANSHU_FALLBACK.content);
    assert.equal(parsed.slug, 'shreya-pranshu');
    assert.equal(parsed.couple.bride.fullName, 'Shreya');
    assert.equal(parsed.couple.groom.fullName, 'Pranshu');
    assert.equal(parsed.eventDate, '2026-12-12');
    assert.equal(parsed.timezone, 'Asia/Kolkata');
  });

  it('rejects wedding snapshot with invalid date format', () => {
    assert.throws(
      () => {
        PublicWeddingSnapshotSchema.parse({
          ...SHREYA_PRANSHU_FALLBACK.content,
          eventDate: '12-12-2026', // invalid, must be YYYY-MM-DD
        });
      },
      /Date must be YYYY-MM-DD/
    );
  });

  it('allows venue to be omitted when isVenueEnabled is false', () => {
    const withoutVenue = {
      ...SHREYA_PRANSHU_FALLBACK.content,
      isVenueEnabled: false,
      venue: undefined,
    };
    const parsed = PublicWeddingSnapshotSchema.parse(withoutVenue);
    assert.equal(parsed.isVenueEnabled, false);
    assert.equal(parsed.venue, undefined);
  });

  it('validates venue coordinates and map URLs when venue is present', () => {
    const venue = PublicVenueSchema.parse(SHREYA_PRANSHU_FALLBACK.content.venue);
    assert.equal(venue.city, 'Jaipur');
    assert.equal(venue.name, 'The Royal Palace & Heritage Gardens');
    assert.ok(venue.googleMapsEmbedUrl.startsWith('https://'));
  });
});

describe('Template Versioning Invariants', () => {
  it('instantiates TemplateVersionNotFoundError with explicit version notice', () => {
    const error = new TemplateVersionNotFoundError('royal-heritage', '2.0.0');
    assert.equal(error.name, 'TemplateVersionNotFoundError');
    assert.ok(error.message.includes('royal-heritage'));
    assert.ok(error.message.includes('2.0.0'));
    assert.ok(error.message.includes('not registered'));
  });

  it('successfully verifies Royal Heritage v1.0.0 template configuration', () => {
    assert.equal(royalHeritageMetadata.id, 'royal-heritage');
    assert.equal(royalHeritageMetadata.version, '1.0.0');
    assert.equal(royalHeritageDefaultTheme.primaryColor, '#5B0E2D');
  });

  it('successfully verifies Palace Garden v1.0.0 template configuration', () => {
    assert.equal(palaceGardenMetadata.id, 'palace-garden');
    assert.equal(palaceGardenMetadata.version, '1.0.0');
    assert.equal(palaceGardenMetadata.category, 'garden');
    assert.equal(palaceGardenDefaultTheme.primaryColor, '#4A0E17');
    assert.equal(palaceGardenDefaultTheme.backgroundColor, '#FAF6EE');
    assert.equal(palaceGardenDefaultTheme.secondaryColor, '#6B7C69');
  });
});
