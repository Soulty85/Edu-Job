<template>
    <div class="flex flex-col items-center justify-center py-10">
        <div class="container max-w-3xl shadow rounded-lg p-6">
            <h1 class="text-2xl font-bold mb-6">
                {{ edit ? "Modifier l’offre" : "Créer une nouvelle offre" }}
            </h1>
            
            <form class="space-y-6" @submit.prevent="handleSubmit" >
                <!-- Titre -->
                <div>
                    <label class="block mb-2 font-medium">Titre</label>
                    <Input v-model="form.title" placeholder="Titre du poste" />
                </div>
                
                <!-- Description -->
                <div>
                    <label class="block mb-2 font-medium">Description</label>
                    <Textarea v-model="form.description" placeholder="Décrivez le poste..." />
                </div>
                
                <!-- Département -->
                <div>
                    <label class="block mb-2 font-medium">Département</label>
                    <Input v-model="form.department" placeholder="Nom du département" />
                </div>
                
                <!-- Niveau -->
                <div>
                    <label class="block mb-2 font-medium">Niveau</label>
                    <Input v-model="form.level" placeholder="Licence, Master, etc." />
                </div>
                
                <!-- Type de contrat -->
                <div>
                    <label class="block mb-2 font-medium">Type de contrat</label>
                    <Input v-model="form.contract_type" placeholder="CDD, CDI, Vacataire..." />
                </div>
                
                <!-- Volume horaire -->
                <div>
                    <label class="block mb-2 font-medium">Volume horaire (h / semaine)</label>
                    <Input v-model="form.workload" type="number"/>
                </div>
                
                <!-- Dates -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2 font-medium">Date de début D'activité</label>
                        <Input v-model="form.start_date" type="date"/>
                    </div>
                    
                    <div>
                        <label class="block mb-2 font-medium">Deadline</label>
                        <Input v-model="form.application_deadline" type="date"/>
                    </div>
                </div>
                
                <!-- Matières -->
                <div>
                    <label class="block mb-2 font-medium">Matières (séparées par des virgules)</label>
                    <Input v-model="form.subjects" placeholder="Mathématiques, Physique, Management..." />
                </div>
                
                <!-- Bouton -->
                <div class="flex justify-end">
                    <Button type="submit">
                        {{ edit ? "Mettre à jour" : "Créer" }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useMessage, useAuthStore, formatErrors } from "#imports"

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { errorMessage } = useMessage()
const authStore = useAuthStore() 
const access = authStore.access

// pour modifier ou creer
const edit = ref(false)
const form = ref({
    title: "",
    description: "",
    department: "",
    level: "",
    contract_type: "",
    workload: "",
    start_date: "",
    application_deadline: "",
    subjects: "",
    requirements: "Diplome requis"
})

onMounted(async () => {
    edit.value = true
    try {
        const res = await $fetch(`/positions/${route.params.offerId}/`, {
            method: "GET",
            baseURL: config.public.API_BASE_URL,
            headers: {
                Authorization: `Bearer ${access}`
            }
    })
        form.value = res
    } catch (err) {
        errorMessage("Erreur de chargement:", err)
    }
})

async function handleSubmit() {
    try {
        if (edit.value) {
            await $fetch(`/positions/${route.params.offerId}/`, {
                method: "PUT",
                baseURL: config.public.API_BASE_URL,
                body: form.value,
                headers: {
                    Authorization: `Bearer ${access}`
                }
            })
        } else {
            await $fetch(`/positions/`, {
                method: "POST",
                baseURL: config.public.API_BASE_URL,
                body: form.value,
                headers: {
                    Authorization: `Bearer ${access}`
                }
            })
        }
        router.push("/admin/departement") 
    } catch (err) {
        formatErrors(err)
    }
}
</script>
