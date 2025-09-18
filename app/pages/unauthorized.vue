<!-- pages/unauthorized.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 class="text-4xl font-bold text-red-600">403</h1>
    <p class="mt-2 text-lg">Accès refusé. Vous n’avez pas les permissions nécessaires.</p>
    <NuxtLink to="/login" class="mt-4 text-blue-600 underline">Retourner à la connexion</NuxtLink>
  </div>
</template>
