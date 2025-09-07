// stores/auth.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { useMessage } from "#imports";


export const useAuthStore = defineStore("auth", () => {
    const config = useRuntimeConfig();
    const router = useRouter();
    const { successMessage, errorMessage } = useMessage();
    const access = useCookie("access", { default: () => null });
    const refresh = useCookie("refresh", { default: () => null });
    
    const user = ref(null);
    const loading = ref(false);
    const isAuthenticated = computed(() => !!access.value);
    
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
            user.value = response.user;
            
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
            
            const response = await $fetch(config.public.API_BASE_URL + "/auth/register/", {
                method: "POST",
                baseURL: config.public.API_BASE_URL,
                body: userData,
            });
            
            access.value = response.access;
            refresh.value = response.refresh;
            user.value = response.user;
            
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
    
    const formatErrors = (error) => {
        if (error?.data) {
            const errors = error.data;
            
            for (const field in errors) {
                if (Array.isArray(errors[field])) {
                    errors[field].forEach((msg) => errorMessage(`${field}: ${msg}`));
                } else if (typeof errors[field] === "object") {
                    for (const subField in errors[field]) {
                        errors[field][subField].forEach((msg) =>
                            errorMessage(`${subField}: ${msg}`)
                        );
                    }
                }
            }
        } else {
            errorMessage("Une erreur est survenue.");
        }
    }
    
    return {
        access,
        refresh,
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
    };
});
