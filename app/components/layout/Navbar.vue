<template>
    <nav class="px-20 py-5 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.2)] dark:shadow-[0_2px_6px_-2px_rgba(0,0,0,0.6)]">        
        <div class="flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="self-center text-4xl font-semibold whitespace-nowrap">EduJobs</span>
            </a>
            
            <div v-if="!authStore.isAuthenticated" class="flex flex-row gap-4">
                <Button variant="outline" class="w-48 py-4">Se connecter</Button>
                <Button variant="default" class="w-48 py-4">S'inscrire</Button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { Button } from "@/components/ui/button"
import { useAuthStore } from "#imports";


const authStore = useAuthStore()
</script>

