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
                        :id="dept.id"
                        :key="dept.id"
                        :name="dept.name"
                        :offers="dept.open_positions_count"
                        :candidates="dept.ongoing_applications_count"
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


const config = useRuntimeConfig();
const loading = ref(true);
const departments = ref([]);

onMounted(async () => {
    try {
        const res = await $fetch('/departments/', {
            method: 'GET',
            baseURL: config.public.API_BASE_URL
        })
        departments.value = res.results;
        console.log(res)

    } catch(err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
})
</script>
