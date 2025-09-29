<script setup lang="js">
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Badge from "../ui/badge/Badge.vue"
import { User, Mail, Phone, Globe, Calendar, CheckCircle, XCircle, GaugeCircle } from "lucide-vue-next"

defineProps({
    application: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(["open"])
</script>

<template>
    <Card class="w-full transition hover:shadow-lg" @click="emit('open', application.id)">
        <CardHeader>
            <CardTitle class="flex items-center gap-2">
                <User class="w-5 h-5" />
                {{ application.full_name }}
            </CardTitle>
                <p class="text-sm"><Badge>{{ application.position_title }}</Badge></p>
        </CardHeader>
        
        <CardContent class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
                <Mail class="w-4 h-4" />
                <span>{{ application.email }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-sm">
                <Phone class="w-4 h-4" />
                <span>{{ application.phone }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-sm">
                <Globe class="w-4 h-4" />
                <span>{{ application.nationality }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-sm">
                <Calendar class="w-4 h-4" />
                <span>Postulé le {{ application.applied_date }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-sm">
                <span>Étape: <Badge>{{ application.current_stage_name }}</Badge></span>
            </div>
        </CardContent>
        
        <CardFooter class="flex justify-between items-center">
            <div class="flex items-center gap-2 text-sm">
                <CheckCircle v-if="application.status === 'approved'" class="w-4 h-4 text-green-600" />
                <GaugeCircle v-else-if="application.status === 'pending'" class="w-4 h-4 text-yellow-600" />
                <XCircle v-else-if="application.status === 'rejected'" class="w-4 h-4 text-red-600" />
                <span>{{ application.status }}</span>
            </div>
            
            <NuxtLink :to="`/admin/candidature/${application.id}`">
                <Button variant="outline" size="sm">
                    Voir détails
                </Button>
            </NuxtLink>
        </CardFooter>
    </Card>
</template>
