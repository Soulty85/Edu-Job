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
            
            <div class=" mt-10 lg:mt-16 space-y-4">
                <JobCard
                v-for="job in jobs"
                :key="job.id"
                :job="job"
                />
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue"
import JobCard from "~/components/base/JobCard.vue"

useHead({
    title: 'Accueil - EduJob',
});
definePageMeta({
    layout: 'base'
})

const jobs = ref([
    {
        id: 1,
        title: "Professeur de Management",
        description: "Participez à la formation des étudiants en stratégie, organisation et leadership.",
        department: "ESITEC",
        level: "master 1"
    },
    {
        id: 2,
        title: "Enseignant en Comptabilité",
        description: "Contribuez à l’enseignement de la comptabilité générale et analytique.",
        department: "ESITEC",
        level: "master 1"
    },
    {
        id: 3,
        title: "Professeur de Marketing",
        description: "Encadrez les étudiants en communication, analyse de marché et gestion de marque.",
        department: "ESITEC",
        level: "master 1"
    },
])
</script>

