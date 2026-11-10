'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { PublicWeddingData } from '@/modules/publishing/services/public-wedding.service';
import { resolveTemplate } from '@/modules/templates/loader';
import { ThemeSwitcherPill } from '@/components/shared/ThemeSwitcherPill';

interface WeddingViewClientProps {
  wedding: PublicWeddingData;
  slug: string;
  isEditor: boolean;
}

export function WeddingViewClient({ wedding, slug, isEditor }: WeddingViewClientProps) {
  const searchParams = useSearchParams();
  const queryTemplate = searchParams?.get('template') || searchParams?.get('theme');

  // Client-state template switcher with query parameter fallback (defaults to palace-garden)
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    queryTemplate === 'royal-heritage' ? 'royal-heritage' : 'palace-garden'
  );

  const activeTemplateId = queryTemplate || selectedTemplate;

  // Resolve template definition
  const template = resolveTemplate(activeTemplateId, wedding.templateVersion);
  const TemplateComponent = template.Component;
  const activeTheme =
    activeTemplateId === 'palace-garden'
      ? template.defaultTheme
      : wedding.theme;

  return (
    <>
      <TemplateComponent
        content={wedding.content}
        theme={activeTheme}
        isEditor={isEditor}
      />
      <ThemeSwitcherPill
        currentTemplate={activeTemplateId}
        slug={slug}
        onSwitchTheme={(themeId) => setSelectedTemplate(themeId)}
      />
    </>
  );
}
