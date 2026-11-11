import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('Palace Garden Royal Jharokha Scratch Reveal Invariants', () => {
  const componentPath = join(
    process.cwd(),
    'src/templates/palace-garden/v1/components/PalaceJharokhaScratchReveal.tsx'
  );
  const componentSource = readFileSync(componentPath, 'utf8');

  it('contains the authentic 5-cusp Rajasthani ogee Jharokha path definition', () => {
    assert.ok(componentSource.includes('JHAROKHA_VIEWBOX_PATH'));
    assert.ok(componentSource.includes('M 160 24'));
    assert.ok(componentSource.includes('JHAROKHA_NORMALIZED_CLIP_PATH'));
  });

  it('guarantees normalized clip-path coordinates are strictly between 0.0 and 1.0', () => {
    // Extract normalized coordinates from JHAROKHA_NORMALIZED_CLIP_PATH
    const match = componentSource.match(/JHAROKHA_NORMALIZED_CLIP_PATH\s*=\s*'([^']+)'/);
    assert.ok(match, 'JHAROKHA_NORMALIZED_CLIP_PATH must be declared as string');

    const rawNums = match[1].match(/\d+\.\d+/g);
    assert.ok(rawNums && rawNums.length > 20, 'Must have at least 20 normalized coordinates');

    for (const numStr of rawNums) {
      const val = parseFloat(numStr);
      assert.ok(val >= 0.0 && val <= 1.0, `Coordinate ${val} must be in [0.0, 1.0] range`);
    }
  });

  it('specifies the required wedding date and supporting copy defaults', () => {
    assert.ok(componentSource.includes("dateText = '31 January 2027'"));
    assert.ok(componentSource.includes("supportingText = 'The day we begin forever.'"));
    assert.ok(componentSource.includes("foilHeading = 'Scratch to unveil our special day'"));
  });

  it('enforces 50% threshold for automatic scratch completion', () => {
    // Verify threshold check is around 48-50%
    assert.ok(
      componentSource.includes('percentage >= 48') || componentSource.includes('percentage >= 50'),
      'Must reveal upon ~50% foil removal'
    );
  });

  it('preserves the accessible tap-to-reveal fallback with eye icon', () => {
    assert.ok(componentSource.includes('Tap to Reveal Wedding Date'));
    assert.ok(componentSource.includes('Reveal Remaining Date'));
    assert.ok(componentSource.includes('<Eye'));
  });

  it('preserves Royal Heritage template scratch card independently', () => {
    const royalHeroPath = join(
      process.cwd(),
      'src/templates/royal-heritage/v1/sections/HeroEnvelopeSection.tsx'
    );
    const royalSource = readFileSync(royalHeroPath, 'utf8');
    assert.ok(
      royalSource.includes('ScratchDateReveal'),
      'Royal Heritage must retain ScratchDateReveal'
    );
  });
});
