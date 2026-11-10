import type { WeddingTemplateDefinition } from './domain/template-contract.ts';
import { TemplateVersionNotFoundError } from './domain/template-errors.ts';
import { royalHeritageV1 } from '../../templates/royal-heritage/v1/index.ts';
import { palaceGardenV1 } from '../../templates/palace-garden/v1/index.ts';

export { TemplateVersionNotFoundError };

// Immutable registry of code-controlled templates
const TEMPLATE_REGISTRY: Record<string, Record<string, WeddingTemplateDefinition>> = {
  'royal-heritage': {
    '1.0.0': royalHeritageV1,
  },
  'palace-garden': {
    '1.0.0': palaceGardenV1,
  },
};

/**
 * Resolves a template definition strictly by templateId and semantic version.
 * Throws TemplateVersionNotFoundError if the specific version is not found.
 * Strictly NO silent fallback to 1.0.0.
 */
export function resolveTemplate(templateId: string, version: string): WeddingTemplateDefinition {
  const templateFamily = TEMPLATE_REGISTRY[templateId];
  if (!templateFamily) {
    throw new TemplateVersionNotFoundError(templateId, version);
  }

  const template = templateFamily[version];
  if (!template) {
    throw new TemplateVersionNotFoundError(templateId, version);
  }

  return template;
}
