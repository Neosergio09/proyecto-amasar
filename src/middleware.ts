import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, cookies, redirect } = context;

    // 1. Define Protected Routes (Strict Check)
    const isProtected = (url.pathname.startsWith("/admin") || url.pathname.startsWith("/vendedores"));
    const isLogin = url.pathname.startsWith("/admin/login") || url.pathname.startsWith("/vendedores/login");

    if (isProtected && !isLogin) {

        // 2. Check for Supabase Session Tokens in Cookies
        const accessToken = cookies.get("sb-access-token")?.value;
        const refreshToken = cookies.get("sb-refresh-token")?.value;

        // 3. Simple Client-Side Token Check
        if (!accessToken || !refreshToken) {
            return redirect("/admin/login");
        }
    }

    return next();
});
