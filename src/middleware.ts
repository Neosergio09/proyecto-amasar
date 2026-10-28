import { defineMiddleware } from "astro:middleware";
import type { APIContext, MiddlewareNext } from "astro";
import { getSupabaseServer } from "./lib/supabase";

// ----------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Verifica si la ruta solicitada pertenece a un área protegida (Admin o Vendedores).
 */
const isProtectedRoute = (path: string) => {
    return path.startsWith("/admin") || path.startsWith("/vendedores");
};

/**
 * Verifica si la ruta es una página de login para evitar bucles de redirección.
 */
const isLoginPage = (path: string) => {
    return path === "/admin/login" || path === "/vendedores/login";
};

/**
 * Optimización: Detecta si la solicitud es para un recurso estático.
 * Evita ejecutar lógica pesada de base de datos para imágenes, estilos, etc.
 */
const isStaticAsset = (path: string) => {
    const extensions = ['.png', '.jpg', '.jpeg', '.svg', '.css', '.js', '.json', '.ico', '.webp', '.woff', '.woff2', '.ttf'];
    return extensions.some(ext => path.endsWith(ext));
};

// ----------------------------------------------------------------------------
// MIDDLEWARE PRINCIPAL (THE GRAND JUDGE)
// ----------------------------------------------------------------------------

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, cookies, locals } = context;
    const path = url.pathname;

    // 1. Optimización de Rendimiento: Ignorar Assets
    if (isStaticAsset(path)) {
        return next();
    }

    // Cookies de la versión anterior (antes de @supabase/ssr): ya no se usan
    if (cookies.has("sb-access-token") || cookies.has("sb-refresh-token")) {
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
    }

    const response = await handleRequest(context, next);

    // Cabeceras que pide Supabase al refrescar la sesión (evitan cachear respuestas con cookies)
    for (const [key, value] of Object.entries(locals.supabaseHeaders ?? {})) {
        try { response.headers.set(key, value); } catch { /* cabeceras inmutables (p. ej. Response.redirect) */ }
    }
    return response;
});

const handleRequest = async (context: APIContext, next: MiddlewareNext) => {
    const { url, redirect, locals } = context;
    const path = url.pathname;

    try {
        // 2. Sesión: getUser valida el token con Supabase y lo refresca si caducó
        // (las cookies nuevas se guardan en la respuesta)
        const supabase = await getSupabaseServer(context);
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        // --------------------------------------------------------------------
        // ESCENARIO A: USUARIO NO LOGUEADO (o sesión inválida)
        // --------------------------------------------------------------------
        if (userError || !user) {
            if (isProtectedRoute(path) && !isLoginPage(path)) {
                return redirect("/admin/login");
            }
            return next();
        }

        // --------------------------------------------------------------------
        // ESCENARIO B: USUARIO CON SESIÓN (Verificación de Rol)
        // --------------------------------------------------------------------
        // Consultar Tabla 'perfiles' para Rol (Single Source of Truth)
        // Se asume que existe trigger en DB que crea perfil al crear usuario auth
        const { data: profile, error: profileError } = await supabase
            .from('perfiles')
            .select('rol')
            .eq('id', user.id)
            .single();

        let rol = "";

        // MANEJO DE ERRORES CRÍTICOS (Perfil no encontrado)
        if (profileError || !profile) {
            console.error("Error de sincronización:", profileError || "Perfil no encontrado en DB");

            // Fallback: Intentar recuperar rol desde app_metadata
            // (user_metadata NO: el propio usuario puede editarlo con auth.updateUser)
            const metaRole = user.app_metadata?.role;
            if (metaRole) {
                console.warn(`⚠️ Recuperando acceso vía Metadata para usuario: ${user.id} (Rol: ${metaRole})`);
                locals.user = user;
                rol = metaRole;
            } else {
                console.error("⛔ SEGURIDAD: Usuario autenticado sin perfil asociado y sin metadata.", user.id);
                await supabase.auth.signOut({ scope: "local" });
                return redirect("/admin/login?error=security_profile_synchro");
            }
        } else {
            rol = profile.rol;
        }

        // Inyectar usuario y rol en locals para uso en páginas (si aplica)
        locals.user = user;

        // --------------------------------------------------------------------
        // LOGIC DE REDIRECCIÓN Y MATRIZ DE ACCESO
        // --------------------------------------------------------------------

        // CASO 1: Usuario logueado intentando ver Login -> Redirigir a su Dashboard
        if (isLoginPage(path)) {
            if (rol === 'admin') return redirect("/admin/dashboard");
            if (rol === 'vendedor') return redirect("/vendedores");
            // Default:
            return redirect("/");
        }

        // CASO 2: Protección de Ruta '/admin'
        if (path.startsWith("/admin")) {
            // REGLA DE ORO: Solo Admin entra a Admin
            if (rol !== 'admin') {
                console.warn(`⛔ Acceso Denegado: Rol '${rol}' intentó entrar a Admin.`);
                // Si es un vendedor perdido, lo mandamos a su terminal
                if (rol === 'vendedor') return redirect("/vendedores");
                // Otros roles fuera
                return redirect("/");
            }
        }

        // CASO 3: Protección de Ruta '/vendedores'
        if (path.startsWith("/vendedores")) {
            // REGLA: Vendedores y Admins pueden entrar
            if (rol !== 'vendedor' && rol !== 'admin') {
                return redirect("/");
            }
        }

        // Si pasa todas las reglas, adelante
        return next();

    } catch (err) {
        console.error("🔥 Error Inesperado en Middleware:", err);
        return redirect("/admin/login");
    }
};
