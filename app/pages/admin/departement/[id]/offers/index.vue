<template>
    <div class="">
        <h1 class="text-3xl font-bold my-10">Departement {{ department_details.name }}</h1>
        
        <!-- KPIs -->
        <section class="mt-8">
            <h2 class="text-3xl font-bold mb-8">KPIs</h2>
            
            <div v-if="!loading_department" class="grid md:grid-cols-2 gap-4">
                <KpiCard
                    title="Nombre d'offres"
                    :value="department_details.open_positions_count"
                    icon="lucide:users"
                />
                <KpiCard
                    title="Avancement du recrutement"
                    :value="department_details.ongoing_applications_count"
                    icon="lucide:bar-chart-2"
                />
            </div>
            <div v-if="loading_department" class="grid md:grid-cols-2 gap-4">
                <KpiSkeleton />
                <KpiSkeleton />
            </div>
        </section>
        
        <!-- Offres -->
        <section class="mt-12">
            <h2 class="text-3xl font-bold mb-10">Offres</h2>
            
            <div v-if="!loading_positions" class="grid md:grid-cols-3 gap-4">
                <JobCard
                v-for="position in positions"
                :key="position.id"
                :job="position"
                />
            </div>
            <div v-if="loading_positions" class=" mt-10 lg:mt-16 space-y-4">
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
            </div>
        </section>
    </div>
</template>

<script setup>
import KpiCard from "~/components/admin/KpiCard.vue"
import KpiSkeleton from "~/components/admin/skeleton/KpiSkeleton.vue";
import JobCard from "~/components/base/JobCard.vue"
import JobCardSkeleton from "~/components/base/skeleton/JobCardSkeleton.vue";

definePageMeta({
    layout: "admin"
})

const config = useRuntimeConfig();
const department_id = 2;
const loading_department = ref(true);
const loading_positions = ref(true);
const department_details = ref({});
const positions = ref([]);


async function fetchDepartmentDetails(id) {
    try {
        const res = await $fetch(`/departments/${id}`, {
            method: 'GET',
            baseURL: config.public.API_BASE_URL
        })
        department_details.value = res;
        console.log(res)
    
    } catch(err) {
        console.log(err);
    } finally {
        loading_department.value = false;
    }
}

async function fetchDepartmentPositions(id) {
    try {
        const res = await $fetch(`/positions/?department=${id}`, {
            method: 'GET',
            baseURL: config.public.API_BASE_URL
        })
        positions.value = res.results;
        console.log(res)
    
    } catch(err) {
        console.log(err);
    } finally {
        loading_positions.value = false;
    }
}

onMounted(async () => {
    fetchDepartmentDetails(department_id);
    fetchDepartmentPositions(department_id);
})
</script>
