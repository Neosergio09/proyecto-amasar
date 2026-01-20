import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, cookies, redirect } = context;

    // 1. Define Protected Routes (All /admin routes except login)
    if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {

        // 2. Check for Supabase Session Tokens in Cookies
        const accessToken = cookies.get("sb-access-token")?.value;
        const refreshToken = cookies.get("sb-refresh-token")?.value;

        // 3. Simple Client-Side Token Check (Improvement: Validate with Supabase Client if strict security needed)
        // For now, presence of tokens is enough to pass the middleware, 
        // real data fetching will fail RLS if tokens are invalid.
        if (!accessToken || !refreshToken) {
            return redirect("/admin/login");
        }
    }

    return next();
});
