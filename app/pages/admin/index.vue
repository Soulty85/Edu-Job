<template>
    <div class=" flex flex-col items-center justify-center">
        <!-- MAIN -->
        <main class="container  py-8">
            <h1 class="text-3xl font-bold text-center">Bienvenue Jane</h1>
            
            <!-- KPIs -->
            <section class="mt-8">
                <h2 class="text-3xl font-bold mb-8">KPIs</h2>
                
                <div v-if="!loading" class="grid md:grid-cols-2 gap-4">
                    <KpiCard
                        title="Candidatures par poste"
                        :value="18"
                        icon="lucide:users"
                    />
                    <KpiCard
                        title="Avancement du recrutement"
                        :value="72"
                        unit="%"
                        icon="lucide:bar-chart-2"
                        :progress="72"
                    />
                </div>
                <div v-if="loading" class="grid md:grid-cols-2 gap-4">
                    <KpiSkeleton />
                    <KpiSkeleton />
                </div>
            </section>
            
            <!-- Départements -->
            <section class="mt-12">
                <h2 class="text-3xl font-bold mb-10">Départements</h2>
                
                <div v-if="!loading" class="grid md:grid-cols-3 gap-4">
                    <DepartmentCard
                        
                        v-for="dept in departments"
                        :key="dept.id"
                        :name="dept.name"
                        :offers="dept.offers"
                        :candidates="dept.candidates"
                    />
                </div>
                
                <div v-if="loading" class="grid md:grid-cols-3 gap-4">
                    <DepartmentCardSkeleton />
                    <DepartmentCardSkeleton />
                    <DepartmentCardSkeleton />
                    <DepartmentCardSkeleton />
                    <DepartmentCardSkeleton />
                    <DepartmentCardSkeleton />
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import KpiCard from "~/components/admin/KpiCard.vue"
import DepartmentCard from "~/components/admin/DepartmentCard.vue"
import DepartmentCardSkeleton from "~/components/admin/skeleton/DepartmentCardSkeleton.vue"
import KpiSkeleton from "~/components/admin/skeleton/KpiSkeleton.vue";

const loading = ref(false);
const departments = [
    { id: 1, name: "Département 1", offers: 12, candidates: 128 },
    { id: 2, name: "Département 2", offers: 12, candidates: 128 },
    { id: 3, name: "Département 3", offers: 12, candidates: 128 },
    { id: 4, name: "Département 4", offers: 12, candidates: 128 },
    { id: 5, name: "Département 5", offers: 12, candidates: 128 },
    { id: 6, name: "Département 6", offers: 12, candidates: 128 },
]
</script>
