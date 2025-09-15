<template>
    <div v-if="!loading" class=" flex flex-col items-center justify-center py-10">
        <div class="container max-w-4xl space-y-8">
            <!-- HEADER -->
            <div class="shadow  outline rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
                <!-- Avatar -->
                <div class="relative">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="Photo de profil"
                        class="w-32 h-32 rounded-full object-cover border- outline shadow"
                    >
                    <label
                        v-if="editing"
                        class="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer"
                    >
                        Changer
                        <input type="file" class="hidden" @change="onAvatarUpload">
                    </label>
                </div>
                
                <!-- Infos principales -->
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-3xl font-bold">{{ candidate.full_name }}</h1>
                    <p class="text-gray-500">{{ candidate.email }}</p>
                    
                    <!-- Bouton modifier -->
                    <div class="mt-4">
                        <Button variant="outline" @click="editing = !editing" >
                        {{ editing ? "Annuler" : "Modifier le profil" }}
                        </Button>
                    </div>
                </div>
            </div>
            
            <!-- INFOS PERSONNELLES -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Informations personnelles</h2>
                </CardHeader>
                
                <CardContent>
                    <div v-if="!editing" class="space-y-3 ">
                        <p><span class="font-medium">Nom :</span> {{ candidate.full_name }}</p>
                        <p><span class="font-medium">Email :</span> {{ candidate.email }}</p>
                        <p><span class="font-medium">Téléphone :</span> {{ candidate.phone }}</p>
                        <p><span class="font-medium">Adresse :</span> {{ candidate.address }}</p>
                        <p><span class="font-medium">Date de naissance :</span> {{ candidate.birthzzdate }}</p>
                        <p><span class="font-medium">Nationalité :</span> {{ candidate.nationality }}</p>
                    </div>
                    
                    <!-- Formulaire édition -->
                    <form v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input v-model="form.full_name" placeholder="Nom complet" />
                        <Input v-model="form.email" placeholder="Email" type="email" />
                        <Input v-model="form.phone" placeholder="Téléphone" />
                        <Input v-model="form.address" placeholder="Adresse" />
                        <Input v-model="form.birth_date" type="date" placeholder="Date de naissance" />
                        <Input v-model="form.nationality" placeholder="Nationalité" />
                    </form>
                </CardContent>
            </Card>
            
            <!-- CV -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Curriculum Vitae</h2>
                </CardHeader>
                
                <CardContent>
                    <div v-if="!editing" class="">
                        <div v-if="cvFile">
                            <a
                                href="#"
                                class="text-sky-600 underline"
                                @click.prevent
                            >📄 {{ cvFile.name }}</a>
                        </div>
                        
                        <p v-else class="text-gray-400 italic">Aucun CV renseigné.</p>
                    </div>
                    <div v-else>
                        <input type="file" @change="onCvUpload">
                    </div>
                </CardContent>
            </Card>
            
            <!-- DIPLOMES -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Diplômes</h2>
                </CardHeader>
                
                <CardContent>
                    <div v-if="!editing">
                        <ul class="list-disc pl-5 space-y-1 ">
                            <li v-for="(d, i) in diplomas" :key="i">
                                {{ d.name }}
                                <span v-if="d.file" class="ml-2 text-sm text-sky-600 underline cursor-pointer">
                                📄 {{ d.file.name }}
                                </span>
                            </li>
                        </ul>
                    </div>
                    
                    <div v-else class="space-y-3">
                        <div
                        v-for="(d, i) in diplomas"
                        :key="i"
                        class="flex flex-col md:flex-row gap-2 items-start"
                        >
                            <Input v-model="d.name" placeholder="Nom du diplôme" class="flex-1" />
                            <input type="file" @change="onDiplomaUpload($event, i)" >
                            <Button
                                variant="destructive"
                                size="icon"
                                @click="removeDiploma(i)"
                            >
                                <Icon name="lucide:trash" class="w-4 h-4" />
                            </Button>
                        </div>
                        
                        <Button variant="outline" class="mt-2" @click="addDiploma">
                        + Ajouter un diplôme
                        </Button>
                    </div>
                </CardContent>
            </Card>
            
            <!-- LETTRE DE MOTIVATION -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Lettre de motivation</h2>
                </CardHeader>
                
                <CardContent>
                    <div v-if="!editing" class="whitespace-pre-line">
                        {{ user.cover_letter || "Aucune lettre de motivation renseignée." }}
                    </div>
                    
                    <div v-else>
                        <Textarea v-model="form.cover_letter" placeholder="Votre lettre de motivation" rows="6" />
                    </div>
                </CardContent>
            </Card>
            
            <!-- ACTIONS -->
            <div v-if="editing" class="flex justify-end gap-3">
                <Button variant="outline" @click="cancelEdit">Annuler</Button>
                <Button class="bg-black text-white hover:bg-gray-800" @click="saveProfile">Enregistrer</Button>
            </div>
        </div>
    
    <!-- SKELETON de la page -->
        <div v-if="loading" class="container max-w-4xl space-y-8">
            <!-- HEADER -->
            <div class="shadow rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
                <!-- Avatar -->
                <Skeleton class="w-24 h-24 rounded-full" />
                
                <!-- Infos principales -->
                <div class="flex-1 text-center md:text-left space-y-3">
                    <Skeleton class="h-4 w-48" />
                    <Skeleton class="h-4 w-40" />
                    <Skeleton class="h-6 w-32 mt-4" />
                </div>
            </div>
            
            <!-- INFOS PERSONNELLES -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Informations personnelles</h2>
                </CardHeader>
                
                <CardContent class="space-y-3">
                    <Skeleton class="h-4 w-64" />
                    <Skeleton class="h-4 w-52" />
                    <Skeleton class="h-4 w-48" />
                    <Skeleton class="h-4 w-40" />
                </CardContent>
            </Card>
            
            <!-- CV -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Curriculum Vitae</h2>
                </CardHeader>
                
                <CardContent>
                    <Skeleton class="h-4 w-56" />
                </CardContent>
            </Card>
            
            <!-- DIPLOMES -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Diplômes</h2>
                </CardHeader>
                
                <CardContent class="space-y-2">
                    <Skeleton class="h-4 w-72" />
                    <Skeleton class="h-4 w-64" />
                    <Skeleton class="h-4 w-52" />
                </CardContent>
            </Card>
            
            <!-- LETTRE DE MOTIVATION -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Lettre de motivation</h2>
                </CardHeader>
                
                <CardContent>
                    <Skeleton class="h-20 w-full" />
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Icon } from "#components"
import { useAuthStore } from "#imports"


const config = useRuntimeConfig();
const access = useAuthStore().access
const loading = ref(true);
const candidate = reactive({});
const error = ref("");
const user = reactive({
    full_name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    address: "123 rue de Paris, 75000 Paris",
    birth_date: "1990-05-14",
    nationality: "Française",
    cover_letter: "Passionné par l’enseignement, je souhaite transmettre mes connaissances...",
})

const editing = ref(false)
const form = reactive({ ...user, cover_letter: user.cover_letter })

// CV mock
const cvFile = ref(null)

// Diplômes mock
const diplomas = ref([
    { name: "Licence en Mathématiques - Université de Paris", file: null },
    { name: "Master en Pédagogie - Université de Lyon", file: null },
])

function onCvUpload(e) {
    cvFile.value = e.target.files?.[0] || null
}

function onDiplomaUpload(e, i) {
    diplomas.value[i].file = e.target.files?.[0] || null
}
function addDiploma() {
    diplomas.value.push({ name: "", file: null })
}
function removeDiploma(i) {
    diplomas.value.splice(i, 1)
}

function cancelEdit() {
    editing.value = false
    Object.assign(form, user)
}

function saveProfile() {
    Object.assign(user, form)
    editing.value = false
}

onMounted(async ()=> {
    try {
        const res = await $fetch('/candidates/me/', {
            method: 'GET',
            baseURL: config.public.API_BASE_URL,
            headers: {
                Authorization: `Bearer ${access}`
            }
        })
        
        Object.assign(candidate, res)
        console.log(candidate)
    } catch (err) {
        console.error('Erreur API:', err)
        error.value = 'Impossible de charger les jobs'
    } finally {
        loading.value = false
    }
})
</script>
