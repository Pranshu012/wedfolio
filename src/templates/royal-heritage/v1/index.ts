import type { WeddingTemplateDefinition } from '../../../modules/templates/domain/template-contract.ts';
import {
  royalHeritageMetadata,
  royalHeritageDefaultTheme,
} from './template.config.ts';
import { RoyalHeritageTemplate } from './RoyalHeritageTemplate.tsx';

export const royalHeritageV1: WeddingTemplateDefinition = {
  metadata: royalHeritageMetadata,
  defaultTheme: royalHeritageDefaultTheme,
  Component: RoyalHeritageTemplate,
};

export { RoyalHeritageTemplate };
