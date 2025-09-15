<template>
    <Card>
        <CardHeader>
        <!-- <div class="w-16 h-16 bg-gray-100 flex items-center justify-center rounded">
            <Icon name="lucide:image" class="w-8 h-8 text-gray-400" />
        </div> -->
            <h3 class="font-semibold mt-3">{{ name }}</h3>
        </CardHeader>
        
        <CardContent>
            <p class="text-sm text-gray-500">
                {{ offers }} offres actives – {{ candidates }} candidatures en cours
            </p>
        </CardContent>
        
        <CardFooter>
            <Button as-child class="w-full hover:bg-gray-800">
                <NuxtLink :to="`/admin/departement/${id}/offers`">
                    Voir l’offre
                </NuxtLink>
            </Button>
        </CardFooter>
    </Card>
</template>

<script setup>
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


defineProps({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    offers: { type: Number, required: true },
    candidates: { type: Number, required: true },
})
</script>
