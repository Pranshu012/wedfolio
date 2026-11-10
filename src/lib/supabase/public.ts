import { createClient } from '@supabase/supabase-js';
import { env } from '../env.ts';

export function createPublicClient() {
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
      },
    }
  );
}
