<template>
    <NuxtLink
        :to="`/offres/${job.id}`"
        class="block"
    >      
        <div class="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-semibold text--800">{{ job.title }}</h3>
                
                <UButton
                        v-if="!['RH', 'Direction', 'ChefDeDepartement'].includes(userRole)"
                        color="primary"
                        @click="$emit('apply')"
                    >
                    Postuler
                </UButton>
                
                <div v-else class="flex gap-2">
                    <NuxtLink to="/login">
                        <UButton color="warning" @click="$emit('edit')">Modifier</UButton>
                    </NuxtLink>
                    <NuxtLink :to="route.path + `/${job.id}/candidates`">
                        <UButton variant="outline" @click="$emit('view-applications')">Voir les candidatures</UButton>
                    </NuxtLink>
                </div>
            </div>
            
            <p class="text-\\-600 mb-4">{{ job.description }}</p>
            
            <div class="flex items-center text-sm text--500">
                    <UIcon name="i-heroicons-building-office-2-solid" class="w-4 h-4 mr-1" />
                    <span class="mr-4">{{ job.department_name }}</span>
                    <UIcon name="i-heroicons-academic-cap-solid" class="w-4 h-4 mr-1" />
                <span>{{ job.level }}</span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { useAuthStore } from '#imports';


defineProps({
    job: {
        type: Object,
        required: true
    },
    showApplyButton: {
        type: Boolean,
        default: true
    }
})

const route = useRoute();
const authStore = useAuthStore();
const userRole = computed(() => authStore.user.role);
console.log(userRole.value)
defineEmits(['apply', 'view-applications', 'edit'])
</script>
