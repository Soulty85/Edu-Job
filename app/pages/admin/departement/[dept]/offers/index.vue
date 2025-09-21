<template>
    <div class="">
        <h1 class="text-3xl font-bold text-center">Departement {{ department_details.name }}</h1>
        
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
            <h2 class="text-3xl font-bold mb-6">Offres</h2>
            
            <!-- 🔍 Filtres -->
            <div class="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Statut -->
                <div>
                    <label class="block mb-2 font-medium">Statut</label>
                    <select v-model="filters.status" class="w-full border rounded-lg p-2">
                        <option value="">Tous</option>
                        <option value="ouverte">Ouverte</option>
                        <option value="en_cours">En cours</option>
                        <option value="pourvue">Pourvue</option>
                        <option value="annulee">Annulée</option>
                    </select>
                </div>
                
                <!-- Type de contrat -->
                <div>
                    <label class="block mb-2 font-medium">Contrat</label>
                    <select v-model="filters.contract_type" class="w-full border rounded-lg p-2">
                        <option value="">Tous</option>
                        <option value="permanent">Permanent</option>
                        <option value="cdd">CDD</option>
                        <option value="cdi">CDI</option>
                        <option value="vacataire">Vacataire</option>
                    </select>
                </div>
                
                <!-- Niveau -->
                <div>
                    <label class="block mb-2 font-medium">Niveau</label>
                    <select v-model="filters.level" class="w-full border rounded-lg p-2">
                        <option value="">Tous</option>
                        <option value="Licence">Licence</option>
                        <option value="Master">Master</option>
                        <option value="Doctorat">Doctorat</option>
                    </select>
                </div>
                
                <!-- Matière -->
                <div>
                    <label class="block mb-2 font-medium">Matière</label>
                    <input
                        v-model="filters.subjects"
                        type="text"
                        placeholder="Ex: Mathématiques"
                        class="w-full border rounded-lg p-2"
                    >
                </div>
            </div>
            
            <!-- Liste des offres -->
            <div v-if="!loading_positions">
                <JobCard
                v-for="position in filteredPositions"
                :key="position.id"
                :job="position"
                />
            </div>
            
            <div v-if="loading_positions" class="mt-10 lg:mt-16 space-y-4">
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
    layout: "admin",
    middleware: ["auth"]
})

const config = useRuntimeConfig();
const department_id = 2;
const loading_department = ref(true);
const loading_positions = ref(true);
const department_details = ref({});
const positions = ref([]);

const filters = ref({
    status: "",
    contract_type: "",
    level: "",
    subjects: ""
})

const filteredPositions = computed(() => {
    return positions.value.filter((job) => {
        const statusMatch = filters.value.status
            ? job.status === filters.value.status
            : true
        const contractMatch = filters.value.contract_type
            ? job.contract_type === filters.value.contract_type
            : true
        const levelMatch = filters.value.level
            ? job.level === filters.value.level
            : true
        const subjectMatch = filters.value.subjects
            ? job.subjects
                ?.toLowerCase()
                .includes(filters.value.subjects.toLowerCase())
            : true
        
        return statusMatch && contractMatch && levelMatch && subjectMatch
    })
})

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
