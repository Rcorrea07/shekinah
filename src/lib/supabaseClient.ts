import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PrayerRequest } from "../types/domain";

export type PrayerRequestRow = {
  id?: string;
  name?: string | null;
  request: string;
  isAnonymous: boolean;
  prayingCount: number | null;
  createdAt?: string | null;
  category: PrayerRequest["category"] | string | null;
};

export type PrayerRequestInsert = {
  name: string;
  request: string;
  isAnonymous: boolean;
  prayingCount: number;
  category: PrayerRequest["category"];
};

export type PrayerRequestUpdate = Partial<Pick<PrayerRequestInsert, "prayingCount">>;

export type Database = {
  public: {
    Tables: {
      prayer_requests: {
        Row: PrayerRequestRow;
        Insert: PrayerRequestInsert;
        Update: PrayerRequestUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigError =
  !supabaseUrl || !supabaseAnonKey
    ? "Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas variáveis de ambiente."
    : null;

export const supabase: SupabaseClient<Database> | null = supabaseConfigError
  ? null
  : createClient<Database>(supabaseUrl, supabaseAnonKey);
