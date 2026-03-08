import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dryeeosrkteamqwnfsqo.supabase.co";
const supabaseAnonKey = "sb_publishable_QEMdqb5Bl9GsE9hOWI98vQ_nFhz0Gz4";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
function getOptimizedImage(url, width = 800) {
  if (!url) return "https://placehold.co/200x200/f3f4f6/1e293b?text=Amasar";
  let finalUrl = url;
  if (!finalUrl.includes("http") && !finalUrl.includes("://")) {
    if (!finalUrl.startsWith("productos/")) {
      finalUrl = `productos/${finalUrl}`;
    }
    finalUrl = `${supabaseUrl}/storage/v1/object/public/${finalUrl}`;
  }
  if (finalUrl.includes("supabase.co")) {
    const cleanUrl = finalUrl.split("?")[0];
    return `${cleanUrl}?width=${width}&quality=80&format=webp`;
  }
  return finalUrl;
}
const getSupabaseServer = async (cookies) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
  if (accessToken && refreshToken) {
    await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }
  return client;
};

export { getOptimizedImage as a, getSupabaseServer as g, supabase as s };
