'use client';

import React from 'react';
import type { PublicWeddingData } from '@/modules/publishing/services/public-wedding.service';
import { resolveTemplate } from '@/modules/templates/loader';

interface WeddingViewClientProps {
  wedding: PublicWeddingData;
  slug: string;
  isEditor: boolean;
}

export function WeddingViewClient({ wedding, isEditor }: WeddingViewClientProps) {
  // Shreya and Pranshu's wedding website exclusively renders Palace Garden.
  // The underlying multi-template registry and loader remain intact for commercial platform capabilities.
  const activeTemplateId = 'palace-garden';

  // Resolve template definition
  const template = resolveTemplate(activeTemplateId, wedding.templateVersion);
  const TemplateComponent = template.Component;
  const activeTheme = template.defaultTheme || wedding.theme;

  return (
    <TemplateComponent
      content={wedding.content}
      theme={activeTheme}
      isEditor={isEditor}
    />
  );
}
