<template>
    <div class="min-h-screen">
        <Navbar/>
        <div class=" flex flex-col items-center justify-center">
        <!-- MAIN -->
        <main class="container  py-8">
            <slot />
        </main>
        </div>
    </div>
</template>

<script setup>
import Navbar from '~/components/layout/Navbar.vue';
</script>
