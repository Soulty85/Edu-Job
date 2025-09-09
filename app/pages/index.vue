<template>
    <main class="p-20">
        <section>
            <h1 class="text-6xl mb-5 font-bold">Liste des offres</h1>
            <p>Filtrez par département, matière ou niveau pour trouver l’offre qui vous correspond.</p>
        </section>
        <section>
            <div class="mt-6 max-w-2xl">
                <div class="flex items-center border rounded-md px-3 py-2">
                    <Icon name="lucide:search" class="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Que cherchez-vous comme poste ?"
                        class="flex-1 bg-transparent outline-none px-2"
                    >
                </div>
            </div>
            
            <div v-if="!loading" class=" mt-10 lg:mt-16 space-y-4">
                <JobCard
                v-for="job in jobs"
                :key="job.id"
                :job="job"
                />
            </div>
            <div v-if="loading" class=" mt-10 lg:mt-16 space-y-4">
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue"
import JobCard from "~/components/base/JobCard.vue"
import JobCardSkeleton from "~/components/base/skeleton/JobCardSkeleton.vue";

useHead({
    title: 'Accueil - EduJob',
});
definePageMeta({
    layout: 'base'
})

const config = useRuntimeConfig();
const loading = ref(true)
const jobs = ref([])
const error = ref("")

onMounted(async () => {
    try {
        const res = await $fetch('/positions/open_positions/', {
            method: 'GET',
            baseURL: config.public.API_BASE_URL,
        })
        jobs.value = res
    } catch (err) {
        console.error('Erreur API:', err)
        error.value = 'Impossible de charger les jobs'
    } finally {
        loading.value = false
    }
})
</script>

