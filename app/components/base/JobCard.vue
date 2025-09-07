<template>
    <div class="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-semibold text--800">{{ job.title }}</h3>
            
            <UButton 
                v-if="showApplyButton" 
                color="primary" 
                @click="$emit('apply')"
            >
                Postuler
            </UButton>
            
            <UButton 
                v-else 
                variant="outline" 
                @click="$emit('view-applications')"
            >
                Voir les candidatures
            </UButton>
        </div>
        
        <p class="text-\\-600 mb-4">{{ job.description }}</p>
        
        <div class="flex items-center text-sm text--500">
                <UIcon name="i-heroicons-building-office-2-solid" class="w-4 h-4 mr-1" />
                <span class="mr-4">{{ job.department }}</span>
                <UIcon name="i-heroicons-academic-cap-solid" class="w-4 h-4 mr-1" />
            <span>{{ job.level }}</span>
        </div>
    </div>
    
    <!-- skeleton -->
    <!-- <div class=" border rounded-lg p-6">
        <div class="flex justify-between items-start mb-4">
            <div class="w-1/2 h-6 bg-gray-300 rounded animate-pulse"/>
            <button class="w-24 h-8 bg-gray-300 rounded animate-pulse"/>
        </div>
        <div class="w-full h-4 bg-gray-300 rounded mb-4 animate-pulse"/>
            <div class="flex items-center text-sm text-gray-500">
                <div class="w-4 h-4 bg-gray-300 rounded animate-pulse mr-1"/>
                <div class="w-24 h-4 bg-gray-300 rounded animate-pulse mr-4"/>
                <div class="w-4 h-4 bg-gray-300 rounded animate-pulse mr-1"/>
                <div class="w-24 h-4 bg-gray-300 rounded animate-pulse"/>
        </div>
    </div> -->
</template>

<script setup>
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

defineEmits(['apply', 'view-applications'])
</script>
