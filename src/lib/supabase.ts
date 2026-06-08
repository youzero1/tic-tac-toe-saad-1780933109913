import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as unknown as { env: Record<string, string> }).env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = (import.meta as unknown as { env: Record<string, string> }).env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type GameRecord = {
  id: number;
  winner: string | null;
  is_draw: boolean;
  board: string;
  created_at: string;
};
