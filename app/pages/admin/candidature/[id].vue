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
                    <h1 class="text-3xl font-bold">{{ application.full_name }}</h1>
                    <p class="text-gray-500">{{ application.email }}</p>
                    <p class="mt-2 text-sm">Postulé pour : <b>{{ application.position_title }}</b></p>
                    <p class="text-sm">Date de candidature : {{ application.applied_at }}</p>
                </div>
                
                <!-- Actions -->
                <div v-if="application.status != 'approved' & application.status != 'rejected'" class="flex gap-4 mt-6">
                    <Button class="bg-green-600 hover:bg-green-700 text-white" @click="approveApplication">
                        Approuver
                    </Button>
                    <Button class="bg-red-600 hover:bg-red-700 text-white" @click="toggleReject">
                        Rejeter
                    </Button>
                </div>
            </div>
            
            <!-- INFOS PERSONNELLES -->
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Informations personnelles</h2>
                </CardHeader>
                
                <CardContent>
                    <div class="space-y-3">
                        <p><span class="font-medium">Nom :</span> {{ application.full_name }}</p>
                        <p><span class="font-medium">Email :</span> {{ application.email }}</p>
                        <p><span class="font-medium">Téléphone :</span> {{ application.phone }}</p>
                        <p><span class="font-medium">Nationalité :</span> {{ application.nationality }}</p>
                        <p><span class="font-medium">Date de naissance :</span> {{ application.birthdate }}</p>
                        <p><span class="font-medium">Domaines d'activité :</span> {{ application.specialties }}</p>
                        <p><span class="font-medium">Statut :</span> {{ application.status }}</p>
                        <p><span class="font-medium">Étape actuelle :</span> {{ application.current_stage_name }}</p>
                    </div>
                    
                    <!-- Champ de rejet -->
                    <div v-if="showReject" class="mt-4 space-y-2">
                        <Textarea
                            v-model="rejectionReason"
                            placeholder="Indiquez la raison du rejet..."
                            rows="3"
                        />
                        <div class="flex justify-end">
                            <Button variant="destructive" @click="rejectApplication">Confirmer le rejet</Button>
                        </div>
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
                            <p class="text-sm font-medium">
                                {{ comment.author_name }}
                                <span class="text-gray-500">({{ comment.author_email}})</span>
                            </p>
                            <p class="text-sm mt-1">{{ comment.content }}</p>
                            <p class="text-xs text-gray-400 mt-1">
                                {{ new Date(comment.created_at).toLocaleString() }}
                            </p>
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
import { ref, reactive, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore, useMessage, formatErrors } from "#imports";


const config = useRuntimeConfig();
const route = useRoute();
const { access } = useAuthStore();

const { successMessage } = useMessage(); 

const loading = ref(true);
const appclication_id = route.params.id
const application = reactive({});
const newComment = ref("");
const showReject = ref(false);
const rejectionReason = ref("");

async function fetchApplication(id) {
    try {
        const res = await $fetch(`/applications/${id}/`, {
            method: "GET",
            baseURL: config.public.API_BASE_URL,
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        
        Object.assign(application, res);
    } catch (err) {
        console.error("Erreur API:", err);
    } finally {
        loading.value = false;
    }
}

async function addComment() {
    if (!newComment.value.trim()) return;    
    
    try {
        const res = await $fetch(`/applications/${application.id}/comments/`, {
            method: "POST",
            baseURL: config.public.API_BASE_URL,
            headers: {
                Authorization: `Bearer ${access}`,
            },
            body: { content: newComment.value },
        })
        
        application.comments.unshift(res);
        newComment.value = "";
        
    } catch (err) {
        console.error("Erreur lors de l'ajout du commentaire:", err);
    }
}

function toggleReject() {
    showReject.value = !showReject.value;
}

async function approveApplication() {
    try {
        await $fetch(`/applications/${application.id}/approve/`, {
            method: "POST",
            baseURL: config.public.API_BASE_URL,
            headers: {
                Authorization: `Bearer ${access}`,
            },
        })
        successMessage(res.message);
    } catch (err) {
        formatErrors(err);
    }
}

async function rejectApplication() {
    if (!rejectionReason.value.trim()) return;
    
    try {
        await $fetch(`/applications/${application.id}/reject/`, {
            method: "POST",
            baseURL: config.public.API_BASE_URL,
            headers: {
                Authorization: `Bearer ${access}`,
            },
            body: { rejection_reason: rejectionReason.value },
        });
        application.status = "rejected";
        application.rejection_reason = rejectionReason.value;
        showReject.value = false;
        rejectionReason.value = "";
        
        successMessage(res.message);
    } catch (err) {
        formatErrors(err);
    }
}

onMounted( () => {
    fetchApplication(appclication_id);
})
</script>
