import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Revalidates public wedding caches across Edge CDN and Next.js data cache.
 */
export async function invalidateWeddingCaches(slug: string): Promise<void> {
  try {
    // 1. Invalidate tag-based data cache
    revalidateTag(`wedding:${slug}`, 'max');
    
    // 2. Invalidate public HTML route
    revalidatePath(`/w/${slug}`, 'page');
    
    // 3. Invalidate Open Graph image route
    revalidatePath(`/w/${slug}/opengraph-image`, 'page');
  } catch (error) {
    console.error(`[invalidateWeddingCaches] Failed to invalidate cache for ${slug}:`, error);
  }
}
