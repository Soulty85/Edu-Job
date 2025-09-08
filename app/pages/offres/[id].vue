<template>
    <div class=" flex flex-col items-center justify-center py-10">
        <div class="container max-w-4xl">
            <!-- HEADER -->
            <div class="shadow rounded-lg p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 class="text-3xl font-bold">{{ offer.title }}</h1>
                        
                        <p class="mt-2 text-sm">
                            Département :
                            <span class="font-medium">{{ offer.department }}</span> •
                            Niveau :
                            <span class="font-medium">{{ offer.level }}</span>
                        </p>
                        
                        <p class="text-sm">
                            Type de contrat :
                            <span class="capitalize font-medium">{{ offer.contract_type }}</span>
                            • Volume horaire :
                            <span class="font-medium">{{ offer.hourly_volume }}h / semaine</span>
                        </p>
                    </div>
                    
                    <Badge :variant="statusVariant(offer.status)" class="capitalize">
                        {{ offer.status }}
                    </Badge>
                </div>
                
                <!-- ACTIONS -->
                <div class="mt-6 flex gap-3">
                    <Button>
                        Postuler maintenant
                    </Button>
                </div>
            </div>
            
            <!-- DESCRIPTION -->
            <section class="shadow outline rounded-lg p-8 mt-8">
                <h2 class="text-xl font-semibold">Description du poste</h2>
                <p class="mt-4 leading-relaxed">
                {{ offer.description }}
                </p>
            </section>
            
            <!-- DETAILS -->
            <section class="shadow outline rounded-lg p-8 mt-8">
                <h2 class="text-xl font-semibold">Détails de l’offre</h2>
                
                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <p class="font-medium">Département</p>
                        <p>{{ offer.department }}</p>
                    </div>
                    <div>
                        <p class="font-medium">Niveau d’enseignement</p>
                        <p>{{ offer.level }}</p>
                    </div>
                    <div>
                        <p class="font-medium">Type de contrat</p>
                        <p class="capitalize">{{ offer.contract_type }}</p>
                    </div>
                    <div>
                        <p class="font-medium">Volume horaire</p>
                        <p>{{ offer.hourly_volume }}h / semaine</p>
                    </div>
                    <div>
                        <p class="font-medium">Date de début</p>
                        <p>{{ offer.start_date }}</p>
                    </div>
                    <div v-if="offer.end_date">
                        <p class="font-medium">Date de fin</p>
                        <p>{{ offer.end_date }}</p>
                    </div>
                    <div>
                        <p class="font-medium">Créée par</p>
                        <p>{{ offer.created_by }}</p>
                    </div>
                    <div>
                        <p class="font-medium">Date de publication</p>
                        <p>{{ offer.created_at }}</p>
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
                        <span class="capitalize">{{ offer.contract_type }}</span>,
                        flexibilité selon le calendrier universitaire.
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "#app"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const route = useRoute()

const offer = ref({
    id: route.params.id,
    title: "Professeur de Management",
    description: "Nous recherchons un(e) professeur passionné(e) de management pour accompagner nos étudiants dans leur parcours académique et professionnel. Vous serez en charge d’enseigner des modules liés à la stratégie, au leadership et à l’organisation des entreprises. Votre rôle inclura également l’encadrement de travaux pratiques et la participation à des projets de recherche.",
    department: "Département 1",
    subjects: "Management, Leadership, Stratégie",
    level: "Master",
    hourly_volume: 12,
    contract_type: "vacataire",
    start_date: "2025-10-01",
    end_date: "2026-06-30",
    status: "ouverte",
    created_by: "Jane Doe",
    created_at: "2025-09-08",
})

const subjects = offer.value.subjects.split(",")

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
