import type { WeddingTemplateDefinition } from '../../../modules/templates/domain/template-contract.ts';
import {
  palaceGardenMetadata,
  palaceGardenDefaultTheme,
} from './template.config.ts';
import { PalaceGardenTemplate } from './PalaceGardenTemplate.tsx';

export const palaceGardenV1: WeddingTemplateDefinition = {
  metadata: palaceGardenMetadata,
  defaultTheme: palaceGardenDefaultTheme,
  Component: PalaceGardenTemplate,
};

export { PalaceGardenTemplate };
