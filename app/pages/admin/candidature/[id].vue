<template>
    <div v-if="!loading" class="flex flex-col items-center justify-center py-10">
        <div class="container max-w-4xl space-y-8">
            <!-- HEADER -->
            <div class="shadow outline rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
                <!-- Avatar -->
                <div class="relative">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="Photo du candidat"
                        class="w-32 h-32 rounded-full object-cover border shadow"
                    >
                </div>
                
                <!-- Infos principales -->
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-3xl font-bold">{{ application.candidate_info.full_name }}</h1>
                    <p class="text-gray-500">{{ application.candidate_info.email }}</p>
                    <p class="mt-2 text-sm">Postulé pour : <b>{{ application.position_title }}</b></p>
                    <p class="text-sm">Date : {{ application.applied_date }}</p>
                </div>
            </div>
            
            <!-- INFOS PERSONNELLES -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Informations personnelles</h2>
                </CardHeader>
                
                <CardContent>
                    <div class="space-y-3">
                        <p><span class="font-medium">Nom :</span> {{ application.candidate_info.full_name }}</p>
                        <p><span class="font-medium">Email :</span> {{ application.candidate_info.email }}</p>
                        <p><span class="font-medium">Téléphone :</span> {{ application.candidate_info.phone }}</p>
                        <p><span class="font-medium">Nationalité :</span> {{ application.candidate_info.nationality }}</p>
                        <p><span class="font-medium">Statut :</span> {{ application.status }}</p>
                        <p><span class="font-medium">Étape actuelle :</span> {{ application.current_stage_name }}</p>
                    </div>
                </CardContent>
            </Card>
            
            <!-- COMMENTAIRES -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Commentaires</h2>
                </CardHeader>
                
                <CardContent>
                    <!-- Liste des commentaires -->
                    <div v-if="application.comments.length" class="space-y-4 mb-6">
                        <div
                        v-for="comment in application.comments"
                        :key="comment.id"
                        class="border rounded p-3"
                        >
                        <p class="text-sm font-medium">{{ comment.author_name }} <span class="text-gray-500">({{ comment.author }})</span></p>
                        <p class="text-sm mt-1">{{ comment.content }}</p>
                        <p class="text-xs text-gray-400 mt-1">{{ new Date(comment.created_at).toLocaleString() }}</p>
                        </div>
                    </div>
                    
                    <!-- Formulaire ajout commentaire -->
                    <div class="space-y-3">
                        <Textarea
                        v-model="newComment"
                        placeholder="Ajouter un commentaire..."
                        rows="3"
                        />
                        
                        <div class="flex justify-end">
                            <Button @click="addComment">Publier</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
    
    <!-- SKELETON -->
    <div v-else class="container max-w-4xl space-y-8">
        <div class="shadow rounded-lg p-8 flex items-center gap-6">
            <Skeleton class="w-24 h-24 rounded-full" />
            
            <div class="flex-1 space-y-3">
                <Skeleton class="h-4 w-48" />
                <Skeleton class="h-4 w-40" />
            </div>
        </div>
        
        <Card>
            <CardHeader>
                <h2 class="text-xl font-semibold">Informations personnelles</h2>
            </CardHeader>
            
            <CardContent class="space-y-3">
                <Skeleton class="h-4 w-64" />
                <Skeleton class="h-4 w-52" />
                <Skeleton class="h-4 w-40" />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <h2 class="text-xl font-semibold">Commentaires</h2>
            </CardHeader>
            
            <CardContent>
                <Skeleton class="h-20 w-full" />
            </CardContent>
        </Card>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { useAuthStore } from "#imports"

const config = useRuntimeConfig()
const access = useAuthStore().access

const loading = ref(true)
const application = reactive({
    candidate_info: {},
    comments: []
})
const newComment = ref("")

async function fetchApplication() {
    try {
        const res = await $fetch(`/applications/1/`, {
        method: "GET",
        baseURL: config.public.API_BASE_URL,
        headers: {
            Authorization: `Bearer ${access}`,
        },
        })
        Object.assign(application, res)
    } catch (err) {
        console.error("Erreur API:", err)
    } finally {
        loading.value = false
    }
}

async function addComment() {
    if (!newComment.value.trim()) return
    const comment = {
        id: Date.now(),
        author_name: "Admin",
        author: "admin@ecole.com",
        content: newComment.value,
        created_at: new Date().toISOString(),
    }
    application.comments.unshift(comment)
    newComment.value = ""

// Appel API (mocké ici)
    try {
        await $fetch(`/applications/${application.id}/comments/`, {
        method: "POST",
        baseURL: config.public.API_BASE_URL,
        headers: {
            Authorization: `Bearer ${access}`,
        },
        body: { content: comment.content },
        })
    } catch (err) {
        console.error("Erreur lors de l'ajout du commentaire:", err)
    }
}

onMounted(fetchApplication)
</script>
