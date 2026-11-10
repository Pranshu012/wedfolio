import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedWeddingBySlug } from '@/modules/publishing/services/public-wedding.service';
import { resolveTemplate } from '@/modules/templates/loader';
import { createClient } from '@/lib/supabase/server';
import { ThemeSwitcherPill } from '@/components/shared/ThemeSwitcherPill';

interface WeddingPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    template?: string;
    theme?: string;
  }>;
}

export async function generateStaticParams() {
  return [{ slug: 'shreya-pranshu' }];
}

export async function generateMetadata({
  params,
}: WeddingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const wedding = await getPublishedWeddingBySlug(slug);

  if (!wedding) {
    return {
      title: 'Wedding Not Found | Wedfolio',
      description: 'The requested wedding website could not be located.',
    };
  }

  const coupleNames = `${wedding.content.couple.bride.fullName} & ${wedding.content.couple.groom.fullName}`;

  return {
    title: `${coupleNames} | ${wedding.content.weddingTitle}`,
    description: `Celebrate the royal wedding of ${coupleNames} on ${wedding.content.eventDate}. View the itinerary, love story, photo gallery, and venue directions.`,
    openGraph: {
      title: `${coupleNames} — Royal Wedding Celebration`,
      description: `Join us in celebrating the holy union of ${coupleNames} on ${wedding.content.eventDate}.`,
      type: 'website',
      url: `/w/${slug}`,
    },
  };
}

export default async function WeddingPage({ params, searchParams }: WeddingPageProps) {
  const { slug } = await params;
  const search = await searchParams;
  const wedding = await getPublishedWeddingBySlug(slug);

  if (!wedding) {
    notFound();
  }

  // Check if current user is an authenticated workspace editor
  let isEditor = false;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: member } = await supabase
        .from('workspace_members')
        .select('role')
        .eq('user_id', user.id)
        .in('role', ['owner', 'editor'])
        .maybeSingle();

      if (member) {
        isEditor = true;
      }
    }
  } catch {
    isEditor = false;
  }

  // Allow query-based preview for template variations (e.g. ?template=palace-garden)
  const requestedTemplate = search?.template || search?.theme;
  const activeTemplateId = requestedTemplate === 'palace-garden'
    ? 'palace-garden'
    : requestedTemplate === 'royal-heritage'
    ? 'royal-heritage'
    : wedding.templateId;

  // Strictly resolve template by ID and exact version (fails explicitly if missing)
  const template = resolveTemplate(activeTemplateId, wedding.templateVersion);
  const TemplateComponent = template.Component;
  const activeTheme = activeTemplateId === 'palace-garden' ? template.defaultTheme : wedding.theme;

  return (
    <>
      <TemplateComponent
        content={wedding.content}
        theme={activeTheme}
        isEditor={isEditor}
      />
      <ThemeSwitcherPill currentTemplate={activeTemplateId} slug={slug} />
    </>
  );
}
