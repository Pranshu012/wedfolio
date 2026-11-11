import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

describe('Palace Garden Royal Mandala Scratch Reveal Invariants', () => {
  const componentPath = join(
    process.cwd(),
    'src/templates/palace-garden/v1/components/PalaceMandalaScratchReveal.tsx'
  );
  const componentSource = readFileSync(componentPath, 'utf8');

  it('verifies that the transparent ornamental gold mandala asset exists in public directory', () => {
    const assetPath = join(
      process.cwd(),
      'public/themes/palace-garden/royal-mandala-frame.png'
    );
    assert.ok(existsSync(assetPath), 'royal-mandala-frame.png must exist in public directory');
  });

  it('enforces exact geometric proportions (60.8% inner diameter, 19.6% inset)', () => {
    assert.ok(
      componentSource.includes("width: '60.8%'") ||
      componentSource.includes("'--mandala-inner-size': '60.8%'") ||
      componentSource.includes("var(--mandala-inner-size, 60.8%)")
    );
    assert.ok(
      componentSource.includes("height: '60.8%'") ||
      componentSource.includes("var(--mandala-inner-size, 60.8%)")
    );
    assert.ok(
      componentSource.includes("top: '19.6%'") ||
      componentSource.includes("'--mandala-inner-inset': '19.6%'") ||
      componentSource.includes("var(--mandala-inner-inset, 19.6%)")
    );
    assert.ok(
      componentSource.includes("left: '19.6%'") ||
      componentSource.includes("var(--mandala-inner-inset, 19.6%)")
    );
  });

  it('guarantees the gold mandala frame sits at z-20 with pointer-events-none to protect from scratching', () => {
    assert.ok(componentSource.includes('pointer-events-none'));
    assert.ok(componentSource.includes('z-20'));
  });

  it('configures the required foil and revealed typography strings', () => {
    assert.ok(componentSource.includes("foilTagline = 'A LITTLE SURPRISE AWAITS'"));
    assert.ok(componentSource.includes("foilInstructionLine1 = 'Scratch to reveal'"));
    assert.ok(componentSource.includes("foilInstructionLine2 = 'our wedding date'"));
    assert.ok(componentSource.includes('OUR WEDDING DAY'));
    assert.ok(componentSource.includes("dateLine1 = '31 January'"));
    assert.ok(componentSource.includes("dateLine2 = '2027'"));
    assert.ok(componentSource.includes("supportingText = 'The day we begin forever.'"));
  });

  it('enforces approximately 50% threshold for automatic scratch reveal', () => {
    assert.ok(componentSource.includes('percentage >= 48'));
  });

  it('preserves the accessible tap-to-reveal fallback button', () => {
    assert.ok(componentSource.includes('Tap to Reveal Wedding Date'));
    assert.ok(componentSource.includes('Reveal Remaining Date'));
    assert.ok(componentSource.includes('<Eye'));
  });

  it('ensures Royal Heritage template retains its regal rectangular scratch card independently', () => {
    const royalHeroPath = join(
      process.cwd(),
      'src/templates/royal-heritage/v1/sections/HeroEnvelopeSection.tsx'
    );
    const royalSource = readFileSync(royalHeroPath, 'utf8');
    assert.ok(royalSource.includes('ScratchDateReveal'));
  });
});
