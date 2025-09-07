<template>
    <div>
        <h1>{{ slug }}</h1>
    </div>
</template>

<script setup>
const route = useRoute()

const slug = route.params.slug
</script>

