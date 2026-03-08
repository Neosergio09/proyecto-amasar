import { d as defineMiddleware, s as sequence } from './chunks/index_CxGZ_cx-.mjs';
import { g as getSupabaseServer } from './chunks/supabase_DZdNAR0C.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_TIk6lcT8.mjs';
import 'piccolore';
import './chunks/astro/server_6DCZPHUI.mjs';
import 'clsx';

const isProtectedRoute = (path) => {
  return path.startsWith("/admin") || path.startsWith("/vendedores");
};
const isLoginPage = (path) => {
  return path === "/admin/login" || path === "/vendedores/login";
};
const isStaticAsset = (path) => {
  const extensions = [".png", ".jpg", ".jpeg", ".svg", ".css", ".js", ".json", ".ico", ".webp", ".woff", ".woff2", ".ttf"];
  return extensions.some((ext) => path.endsWith(ext));
};
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect, locals } = context;
  const path = url.pathname;
  if (isStaticAsset(path)) {
    return next();
  }
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;
  const hasSessionTokens = !!(accessToken && refreshToken);
  if (!hasSessionTokens) {
    if (isProtectedRoute(path) && !isLoginPage(path)) {
      return redirect("/admin/login");
    }
    return next();
  }
  try {
    const supabase = await getSupabaseServer(cookies);
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      cookies.delete("sb-access-token", { path: "/" });
      cookies.delete("sb-refresh-token", { path: "/" });
      if (isProtectedRoute(path) && !isLoginPage(path)) {
        return redirect("/admin/login");
      }
      return next();
    }
    const { data: profile, error: profileError } = await supabase.from("perfiles").select("rol").eq("id", user.id).single();
    let rol = "";
    if (profileError || !profile) {
      console.error("Error de sincronización:", profileError || "Perfil no encontrado en DB");
      const metaRole = user.user_metadata?.role;
      if (metaRole) {
        console.warn(`⚠️ Recuperando acceso vía Metadata para usuario: ${user.id} (Rol: ${metaRole})`);
        locals.user = user;
        rol = metaRole;
      } else {
        console.error("⛔ SEGURIDAD: Usuario autenticado sin perfil asociado y sin metadata.", user.id);
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
        return redirect("/admin/login?error=security_profile_synchro");
      }
    } else {
      rol = profile.rol;
    }
    locals.user = user;
    if (isLoginPage(path)) {
      if (rol === "admin") return redirect("/admin/dashboard");
      if (rol === "vendedor") return redirect("/vendedores");
      return redirect("/");
    }
    if (path.startsWith("/admin")) {
      if (rol !== "admin") {
        console.warn(`⛔ Acceso Denegado: Rol '${rol}' intentó entrar a Admin.`);
        if (rol === "vendedor") return redirect("/vendedores");
        return redirect("/");
      }
    }
    if (path.startsWith("/vendedores")) {
      if (rol !== "vendedor" && rol !== "admin") {
        return redirect("/");
      }
    }
    return next();
  } catch (err) {
    console.error("🔥 Error Inesperado en Middleware:", err);
    return redirect("/admin/login");
  }
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
