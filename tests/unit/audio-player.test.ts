import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { assetUrl } from '../../src/lib/utils.ts';
import {
  PublicInteractiveConfigSchema,
  PublicWeddingSnapshotSchema,
} from '../../src/modules/publishing/domain/public-snapshot.schema.ts';
import { SHREYA_PRANSHU_FALLBACK } from '../../src/modules/publishing/services/public-wedding.service.ts';

describe('Background Audio Configuration & Asset Resolution', () => {
  it('resolves root-relative audio paths with assetUrl', () => {
    const rawPath = '/audio/royal-sitar-harmony.mp3';
    const resolved = assetUrl(rawPath);
    assert.ok(resolved.endsWith('/audio/royal-sitar-harmony.mp3'));
  });

  it('preserves external audio streaming URLs with assetUrl', () => {
    const cdnUrl = 'https://assets.wedfolio.com/audio/shehnai-classical.mp3';
    assert.equal(assetUrl(cdnUrl), cdnUrl);
  });

  it('validates interactive config when backgroundMusicUrl is undefined (Music coming soon state)', () => {
    const config = PublicInteractiveConfigSchema.parse({
      envelopeSealText: 'S & P',
      scratchDateText: 'Save The Date: 12th December 2026',
      musicTitle: 'Royal Shehnai & Sitar Harmony',
    });
    assert.equal(config.backgroundMusicUrl, undefined);
    assert.equal(config.musicTitle, 'Royal Shehnai & Sitar Harmony');
  });

  it('validates interactive config when custom backgroundMusicUrl is provided', () => {
    const config = PublicInteractiveConfigSchema.parse({
      envelopeSealText: 'S & P',
      scratchDateText: 'Save The Date: 12th December 2026',
      backgroundMusicUrl: '/audio/custom-raga.mp3',
      musicTitle: 'Raag Yaman Sitar Recital',
    });
    assert.equal(config.backgroundMusicUrl, '/audio/custom-raga.mp3');
    assert.equal(config.musicTitle, 'Raag Yaman Sitar Recital');
  });

  it('verifies SHREYA_PRANSHU_FALLBACK interactive configuration triggers coming soon state cleanly', () => {
    const parsed = PublicWeddingSnapshotSchema.parse(SHREYA_PRANSHU_FALLBACK.content);
    assert.equal(parsed.interactive.backgroundMusicUrl, undefined);
    assert.equal(parsed.interactive.musicTitle, 'Royal Shehnai & Sitar Harmony');
  });
});
