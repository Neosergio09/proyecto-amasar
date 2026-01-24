import { defineMiddleware } from "astro:middleware";
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
    const { url, cookies, redirect, locals } = context;
    const path = url.pathname;

    // 1. Optimización de Rendimiento: Ignorar Assets
    if (isStaticAsset(path)) {
        return next();
    }

    // 2. Extracción de Sesión (Cookies)
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;
    const hasSessionTokens = !!(accessToken && refreshToken);

    // ------------------------------------------------------------------------
    // ESCENARIO A: USUARIO NO LOGUEADO
    // ------------------------------------------------------------------------
    if (!hasSessionTokens) {
        // Si intenta entrar a zona protegida, mandar al login
        if (isProtectedRoute(path) && !isLoginPage(path)) {
            return redirect("/admin/login");
        }
        // Si navega ruta pública, permitir
        return next();
    }

    // ------------------------------------------------------------------------
    // ESCENARIO B: USUARIO CON SESIÓN (Verificación de Rol)
    // ------------------------------------------------------------------------
    try {
        const supabase = await getSupabaseServer(cookies);

        // Validar token con Supabase Auth
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        // Si el token es inválido o expiró
        if (userError || !user) {
            // Limpiar cookies corruptas y redirigir
            cookies.delete("sb-access-token", { path: "/" });
            cookies.delete("sb-refresh-token", { path: "/" });

            if (isProtectedRoute(path) && !isLoginPage(path)) {
                return redirect("/admin/login");
            }
            return next();
        }

        // Consultar Tabla 'perfiles' para Rol (Single Source of Truth)
        // Se asume que existe trigger en DB que crea perfil al crear usuario auth
        const { data: profile, error: profileError } = await supabase
            .from('perfiles')
            .select('rol')
            .eq('id', user.id)
            .single();

        // MANEJO DE ERRORES CRÍTICOS (Perfil no encontrado)
        if (profileError || !profile) {
            console.error("⛔ SEGURIDAD: Usuario autenticado sin perfil asociado.", user.id);
            // Expulsar inmediatamente
            cookies.delete("sb-access-token", { path: "/" });
            cookies.delete("sb-refresh-token", { path: "/" });
            return redirect("/admin/login?error=security_profile_synchro");
        }

        const rol = profile.rol;

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
});
