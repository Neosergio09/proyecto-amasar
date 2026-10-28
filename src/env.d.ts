/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user?: import('@supabase/supabase-js').User;
    supabase?: import('@supabase/supabase-js').SupabaseClient;
    supabaseHeaders?: Record<string, string>;
  }
}
