// /composables/useJobs.js
import { ref, computed } from 'vue'

const jobs = ref([
  {
    id: 'j1',
    title: 'Professeur de Management',
    department: 'Département 1',
    level: 'Master',
    location: 'Dakar, Sénégal',
    description: 'Participez à la formation des étudiants en stratégie, organisation et leadership.',
    applicants: 12,
    postedAt: '2025-08-27'
  },
  {
    id: 'j2',
    title: 'Enseignant en Comptabilité',
    department: 'Département 2',
    level: 'Licence',
    location: 'Paris, France',
    description: "Contribuez à l'enseignement de la comptabilité générale et analytique.",
    applicants: 8,
    postedAt: '2025-08-20'
  },
  {
    id: 'j3',
    title: 'Professeur de Marketing',
    department: 'Département 1',
    level: 'Master',
    location: 'Lyon, France',
    description: 'Encadrez les étudiants en communication, analyse de marché et gestion de marque.',
    applicants: 5,
    postedAt: '2025-07-30'
  }
])

const candidates = ref([
  {
    id: 'c1',
    name: 'Jean Eduard',
    jobId: 'j1',
    jobTitle: 'Professeur de Management',
    date: '2025-09-01',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    status: 'En attente',
    summary: "Expériences en enseignement supérieur, doctorant en management.",
    cv: '/mock/cv-jean.pdf'
  },
  {
    id: 'c2',
    name: 'Awa Diop',
    jobId: 'j2',
    jobTitle: 'Enseignant en Comptabilité',
    date: '2025-08-28',
    email: 'awa.diop@example.com',
    phone: '+221 77 123 45 67',
    status: 'En cours',
    summary: "Expert-comptable, 5 ans d'expérience pédagogique.",
    cv: '/mock/cv-awa.pdf'
  }
])

export function useJobs() {
  const filters = ref({ query: '', department: '', level: '' })

  const filteredJobs = computed(() => {
    return jobs.value.filter(j => {
      const q = filters.value.query.toLowerCase()
      if (q && !(j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q))) return false
      if (filters.value.department && j.department !== filters.value.department) return false
      if (filters.value.level && j.level !== filters.value.level) return false
      return true
    })
  })

  function setFilters(f) { filters.value = { ...filters.value, ...f } }
  function getJobById(id) { return jobs.value.find(j => j.id === id) }
  function addJob(job) {
    jobs.value.unshift({ ...job, id: `j${Date.now()}`, applicants: 0, postedAt: new Date().toISOString().slice(0,10) })
  }
  function addApplication(jobId, candidate) {
    candidates.value.push({ ...candidate, id: `c${Date.now()}`, jobId, date: new Date().toISOString().slice(0,10) })
    const job = jobs.value.find(j => j.id === jobId)
    if (job) job.applicants = (job.applicants || 0) + 1
  }
  function listCandidatesByJob(jobId) {
    return candidates.value.filter(c => c.jobId === jobId)
  }

  function advanceCandidate(id) {
    const c = candidates.value.find(x => x.id === id)
    if (c) c.status = 'Avancé'
  }
  function rejectCandidate(id) {
    const c = candidates.value.find(x => x.id === id)
    if (c) c.status = 'Rejeté'
  }

  const kpis = computed(() => {
    const totalApplications = candidates.value.length
    const activeJobs = jobs.value.length
    const progress = Math.round((totalApplications / Math.max(1, activeJobs * 5)) * 100) // mock metric
    return { totalApplications, activeJobs, progress }
  })

  return {
    jobs, candidates, filteredJobs, filters, setFilters,
    getJobById, addJob, addApplication, listCandidatesByJob,
    advanceCandidate, rejectCandidate, kpis
  }
}
