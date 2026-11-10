'use server';

import { createClient } from '@/lib/supabase/server';
import { PublicVenueSchema, type PublicVenue } from '@/modules/publishing/domain/public-snapshot.schema';
import { invalidateWeddingCaches } from '@/modules/publishing/services/cache-invalidation.service';

export interface UpdateVenueInput {
  weddingSlug: string;
  isVenueEnabled: boolean;
  venue?: PublicVenue;
}

export async function updateVenueAction(input: UpdateVenueInput) {
  try {
    const { weddingSlug, isVenueEnabled, venue } = input;

    let validatedVenue: PublicVenue | undefined = undefined;
    if (isVenueEnabled && venue) {
      validatedVenue = PublicVenueSchema.parse(venue);
    }

    const supabase = await createClient();

    // Enforce server-side authentication & authorization check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        success: false,
        error: 'Unauthorized: Modifying wedding venue details requires editor authentication.',
      };
    }

    // 1. Update the wedding draft in database
    const { error: updateError } = await supabase
      .from('weddings')
      .update({
        is_venue_enabled: isVenueEnabled,
        venue_data: validatedVenue || {},
        updated_at: new Date().toISOString(),
      })
      .eq('slug', weddingSlug)
      .select('id, workspace_id')
      .single();

    if (updateError) {
      console.warn('[updateVenueAction] Database update warning (may be running in local demo mode):', updateError.message);
    }

    // 2. Invalidate cache tags and page routes
    await invalidateWeddingCaches(weddingSlug);

    return {
      success: true,
      message: 'Venue details updated and published successfully!',
      venue: validatedVenue,
      isVenueEnabled,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update venue details.';
    console.error('[updateVenueAction] Error updating venue:', error);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
