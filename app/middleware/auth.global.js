import { useAuthStore } from "@/stores/AuthStore";

// middleware/auth.global.js
export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore();
    
    // Vérifie rôle admin
    if (to.path.startsWith("/admin") && (auth.user?.role !== "admin" || !auth.isAuthenticated)) {
        return navigateTo("/unauthorized");
    }
});
