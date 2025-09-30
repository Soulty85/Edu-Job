// stores/auth.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

import { useMessage, formatErrors } from "#imports";


export const useAuthStore = defineStore("auth", () => {
    const config = useRuntimeConfig();
    const router = useRouter();
    const { successMessage } = useMessage();
    const access = useCookie("access", { default: () => null });
    const refresh = useCookie("refresh", { default: () => null });
    
    const user = ref(null);
    const loading = ref(false);
    const isAuthenticated = computed(() => !!access.value);
    
    const loadUserByToken = () => {
        if (access.value) {
            try {
                const decoded = jwtDecode(access.value);
                console.log("Token décodé:", decoded);
                user.value = {
                    full_name: decoded.full_name,
                    email: decoded.email,
                    role: decoded.group,
                    id: decoded.user_id,
                };
                console.log("Utilisateur chargé:", user.value);
            } catch (err) {
                console.error("Token invalide ou expiré", err);
                logout(); 
            }
        }
    };
    
    const login = async (email, password) => {
        try {
            loading.value = true;
            
            const response = await $fetch("/auth/login/", {
                method: "POST",
                baseURL: config.public.API_BASE_URL,
                body: { email, password },
            });
            
            access.value = response.access;
            refresh.value = response.refresh;
            
            loadUserByToken();
            
            successMessage("Login réussi");
            router.replace("/");
            
        } catch (error) {
            formatErrors(error);
        } finally {
            loading.value = false;
        }
    };
    
    const register = async (userData) => {
        try {
            loading.value = true;
            
            await $fetch(config.public.API_BASE_URL + "/auth/register/", {
                method: "POST",
                baseURL: config.public.API_BASE_URL,
                body: userData,
            });
            
            successMessage("Inscription réussi, bienvenue sur EduJob");
            router.replace("/login");
            
        } catch (error) {
            formatErrors(error);
        } finally {
            loading.value = false;
        }
    };
    
    const logout = () => {
        access.value = null;
        refresh.value = null;
        user.value = null;
        
        successMessage("Déconnexion réussi");
        router.replace("/login");
    };
    
    loadUserByToken();
    
    return {
        access,
        refresh,
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        loadUserByToken,
    };
});
