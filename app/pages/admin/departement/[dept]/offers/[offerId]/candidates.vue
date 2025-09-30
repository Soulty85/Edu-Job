<template>
  <div class="">
    <h1 class="text-3xl font-bold text-center">Departement {{ department_details.name }}</h1>

    <!-- KPIs -->
    <section class="mt-8">
      <h2 class="text-3xl font-bold mb-8">KPIs</h2>

      <div v-if="!loading_department" class="grid md:grid-cols-2 gap-4">
        <KpiCard
          title="Nombre de candidatures"
          :value="department_details.open_positions_count"
          icon="lucide:users"
        />
        <KpiCard
          title="Candidatures restantes"
          :value="department_details.ongoing_applications_count"
          icon="lucide:bar-chart-2"
        />
      </div>
      <div v-if="loading_department" class="grid md:grid-cols-2 gap-4">
        <KpiSkeleton />
        <KpiSkeleton />
      </div>
    </section>

    <!-- Candidatures -->
    <section class="mt-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold">Candidatures {{ offer_id }}</h2>

        <Button
          variant="outline"
          class="bg-black text-white hover:bg-gray-800"
          :disabled="loading_next"
          @click="nextStage"
        >
          Prochaine étape
        </Button>
      </div>

      <div v-if="!loading_applications" class="grid md:grid-cols-2 gap-4">
        <ApplicationCard
          v-for="app in applications"
          :key="app.id"
          :application="app"
          @open="goToApplication"
        />
      </div>

      <div v-if="loading_applications" class="grid md:grid-cols-2 gap-4">
        <ApplicationCardSkeleton />
        <ApplicationCardSkeleton />
        <ApplicationCardSkeleton />
        <ApplicationCardSkeleton />
      </div>
    </section>
  </div>
</template>

<script setup>
import KpiCard from "~/components/admin/KpiCard.vue"
import KpiSkeleton from "~/components/admin/skeleton/KpiSkeleton.vue"
import ApplicationCard from "~/components/admin/ApplicationCard.vue"
import ApplicationCardSkeleton from "~/components/admin/skeleton/ApplicationCardSkeleton.vue"
import { Button } from "@/components/ui/button"
import { useAuthStore, useMessage } from "#imports"

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
})

const config = useRuntimeConfig()
const route = useRoute()
const { access } = useAuthStore()
const { successMessage, errorMessage } = useMessage()

const loading_department = ref(true)
const loading_applications = ref(true)
const loading_next = ref(false)

const department_id = 2
const offer_id = route.params.offerId
const department_details = ref({})
const applications = ref([])

async function fetchPositionApplicaions(id) {
  try {
    const res = await $fetch(`positions/${id}/applications/`, {
      method: "GET",
      baseURL: config.public.API_BASE_URL,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    applications.value = res.results
  } catch (err) {
    console.log(err)
  } finally {
    loading_applications.value = false
  }
}

async function fetchDepartmentDetails(id) {
  try {
    const res = await $fetch(`/departments/${id}/`, {
      method: "GET",
      baseURL: config.public.API_BASE_URL,
    })
    department_details.value = res
  } catch (err) {
    console.log(err)
  } finally {
    loading_department.value = false
  }
}

async function nextStage() {
  if (!confirm("Voulez-vous vraiment passer toutes les candidatures à l’étape suivante ?")) return

  try {
    loading_next.value = true
    const res = await $fetch(`/positions/${offer_id}/next_stage/`, {
      method: "POST",
      baseURL: config.public.API_BASE_URL,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: {
        global_comment: "Passage automatique au stage suivant",
      },
    })

    successMessage(res.message || "Étape suivante validée ✅")
    // 🔄 rafraîchir la liste des candidatures
    await fetchPositionApplicaions(offer_id)
  } catch (err) {
    console.error(err)
    errorMessage("Impossible de passer à l'étape suivante ❌")
  } finally {
    loading_next.value = false
  }
}

onMounted(async () => {
  fetchDepartmentDetails(department_id)
  fetchPositionApplicaions(offer_id)
})
</script>
