import { useAuthStore } from "#imports";
import { jwtDecode } from "jwt-decode";


export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const access = authStore.access;
    
    // Rôles autorisés pour accéder à /admin
    const allowedRoles = ["RH", "Direction", "ChefDeDepartement"];
    
    // Si pas de token → bloqué
    if (!authStore.isAuthenticated || !access) {
        return navigateTo("/login");
    }
    
    try {
        const decoded = jwtDecode(access);
        const role = decoded.group; 
        
        if (to.path.startsWith("/admin") && !allowedRoles.includes(role)) {
            return navigateTo("/unauthorized");
        }
    } catch (err) {
        return navigateTo("/login");
    }
});
