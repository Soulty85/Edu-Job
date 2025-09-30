<template>
    <div class=" flex flex-col items-center justify-center py-10">
        <div v-if="!loading" class="container max-w-4xl">
            <!-- HEADER -->
            <div class="shadow rounded-lg p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 class="text-3xl font-bold mb-5">{{ job.title }}</h1>
                        
                        <h2 class="text-xl font-semibold">Matières concernées
                            <spsan class=" ml-4 inline">
                                <Badge
                                    v-for="(s, i) in subjects"
                                    :key="i"
                                    variant="secondary"
                                    class="capitalize"
                                >
                                    {{ s }}
                                </Badge>
                            </spsan>
                        </h2>
                        
                        <p class="mt-2 text-sm">
                            Département :
                            <span class="font-medium">{{ job.department_name }}</span> •
                            Niveau :
                            <span class="font-medium">{{ job.level }}</span>
                        </p>
                        
                        <p class="text-sm">
                            Type de contrat :
                            <span class="capitalize font-medium">{{ job.contract_type }}</span>
                            • Volume horaire :
                            <span class="font-medium">{{ job.workload }}h / semaine</span>
                        </p>
                    </div>
                    
                    <Badge :variant="statusVariant(job.status)" class="capitalize">
                        {{ job.status }}
                    </Badge>
                </div>
                
                <!-- ACTIONS -->
                <div class="mt-6 flex gap-3">
                    <Button class="w-48 py-4" :loading="loading_apply" :disabled="loading_apply" @click="applyPosition" >
                        Postuler maintenant
                    </Button>
                </div>
            </div>
            
            <!-- DESCRIPTION -->
            <section class="shadow outline rounded-lg p-8 mt-8">
                <h2 class="text-xl font-semibold">Description du poste</h2>
                <p class="mt-4 leading-relaxed">
                {{ job.description }}
                </p>
            </section>
            
            <!-- DETAILS -->
            <section class="shadow outline rounded-lg p-8 mt-8">
                <h2 class="text-xl font-semibold">Détails de l’offre</h2>
                
                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <p class="font-medium">Département</p>
                        <p>{{ job.department_name }}</p>
                    </div>
                    
                    <div>
                        <p class="font-medium">Niveau d’enseignement</p>
                        <p>{{ job.level }}</p>
                    </div>
                    
                    <div>
                        <p class="font-medium">Type de contrat</p>
                        <p class="capitalize">{{ job.contract_type }}</p>
                    </div>
                    
                    <div>
                        <p class="font-medium">Volume horaire</p>
                        <p>{{ job.workload }}h / semaine</p>
                    </div>
                    
                    <div>
                        <p class="font-medium">Date de début</p>
                        <p>{{ job.start_date }}</p>
                    </div>
                    
                    <div v-if="job.end_date">
                        <p class="font-medium">Date de fin</p>
                        <p>{{ job.end_date }}</p>
                    </div>
                    
                    <div>
                        <p class="font-medium">Créée par</p>
                        <p>{{ job.created_by_name }}</p>
                    </div>
                    
                    <div>
                        <p class="font-medium">Date de publication</p>
                        <p>{{ job.created_at }}</p>
                    </div>
                </div>
            </section>
            
            <!-- MATIERES -->
            <section class="shadow outline rounded-lg p-8 mt-8">
                <h2 class="text-xl font-semibold">Matières concernées</h2>
                
                <div class="flex flex-wrap gap-2 mt-4">
                    <Badge
                        v-for="(s, i) in subjects"
                        :key="i"
                        variant="secondary"
                        class="capitalize"
                    >
                        {{ s }}
                    </Badge>
                </div>
            </section>
            
            <!-- INFOS SUPPLEMENTAIRES -->
            <section class="shadow outline rounded-lg p-8 mt-8">
                <h2 class="text-xl font-semibold">Pourquoi rejoindre ce poste ?</h2>
                
                <ul class="mt-4 space-y-3 list-disc pl-5">
                    <li>
                        Opportunité de contribuer à la formation d’étudiants dans un domaine
                        en pleine évolution.
                    </li>
                    
                    <li>
                        Intégration au sein d’un département dynamique et reconnu
                        académiquement.
                    </li>
                    
                    <li>
                        Développement professionnel grâce à un environnement de recherche et
                        d’innovation.
                    </li>
                    
                    <li>
                        Conditions adaptées : contrat
                        <span class="capitalize">{{ job.contract_type }}</span>,
                        flexibilité selon le calendrier universitaire.
                    </li>
                </ul>
            </section>
            
        </div>
        <template v-if="loading">
                <JobDetailSkeleton />
            </template>
    </div>

</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "#app"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMessage, useAuthStore } from "#imports"
import JobDetailSkeleton from "~/components/base/skeleton/JobDetailSkeleton.vue"

useHead({
    title: 'Accueil - EduJob',
});
definePageMeta({
    layout: 'base'
})

const route = useRoute();
const config = useRuntimeConfig();

const loading = ref(true);
const loading_apply = ref(false);

const job_id = route.params.id;
const job = ref([]);
const subjects = ref([]);
const error = ref("");

const { access } = useAuthStore();
const { errorMessage, successMessage } = useMessage();


onMounted(async () => {
    try {
        const res = await $fetch(`/positions/${job_id}/`, {
            method: 'GET',
            baseURL: config.public.API_BASE_URL,
        })
        
        job.value = res
        subjects.value = job.value.subjects.split(",")
        
    } catch (err) {
        console.error('Erreur API:', err)
        error.value = 'Impossible de charger les jobs'
    } finally {
        loading.value = false
    }
})

async function applyPosition() {
    try {
        loading_apply.value = true
        await $fetch(`/applications/apply/`, {
            method: "POST",
            baseURL: config.public.API_BASE_URL,
            headers: {
                Authorization: `Bearer ${access}`, 
                "Content-Type": "application/json" 
            },
            body: {
                position: job_id 
            },
        })
    
        successMessage("Candidature envoyée avec succès !")
    } catch (err) {
        console.error("Erreur API:", err)
        errorMessage(access? "Impossible d'itentifier le candidat vous devez etre connecté": "vous avez deja postulé pour cette offre")
    } finally {
        loading_apply.value = false
    }
}

function statusVariant(status) {
    switch (status) {
        case "ouverte":
            return "success"
        case "en_cours":
            return "default"
        case "pourvue":
            return "destructive"
        case "annulee":
            return "secondary"
        default:
            return "outline"
    }
}
</script>
