<template>
    <div class="container max-w-4xl space-y-8">
        <!-- HEADER -->
        <div class="shadow rounded-lg p-6 space-y-4">
            <div class="flex justify-between items-start">
                <div class="space-y-3">
                    <Skeleton class="h-8 w-60 rounded" /> <!-- Job title -->
                    <Skeleton class="h-4 w-80 rounded" /> <!-- Département + Niveau -->
                    <Skeleton class="h-4 w-72 rounded" /> <!-- Contrat + Volume horaire -->
                </div>
                
                <Skeleton class="h-8 w-24 rounded" /> <!-- Badge statut -->
            </div>
            
            <!-- Actions -->
            <div class="mt-6 flex gap-3">
                <Skeleton class="h-10 w-40 rounded" /> <!-- Bouton postuler -->
            </div>
        </div>
        
        <!-- DESCRIPTION -->
        <section class="shadow outline rounded-lg p-8 space-y-4">
            <Skeleton class="h-6 w-48 rounded" /> <!-- Titre -->
            
            <div class="space-y-2">
                <Skeleton class="h-4 w-full rounded" />
                <Skeleton class="h-4 w-11/12 rounded" />
                <Skeleton class="h-4 w-10/12 rounded" />
            </div>
        </section>
        
        <!-- DETAILS -->
        <section class="shadow outline rounded-lg p-8 space-y-4">
            <Skeleton class="h-6 w-56 rounded" /> <!-- Titre -->
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <Skeleton class="h-4 w-32 rounded" />
                    <Skeleton class="h-4 w-44 rounded" />
                </div>
                
                <div class="space-y-2">
                    <Skeleton class="h-4 w-40 rounded" />
                    <Skeleton class="h-4 w-48 rounded" />
                </div>
                
                <div class="space-y-2">
                    <Skeleton class="h-4 w-36 rounded" />
                    <Skeleton class="h-4 w-40 rounded" />
                </div>
                
                <div class="space-y-2">
                    <Skeleton class="h-4 w-28 rounded" />
                    <Skeleton class="h-4 w-36 rounded" />
                </div>
                
                <div class="space-y-2">
                    <Skeleton class="h-4 w-32 rounded" />
                    <Skeleton class="h-4 w-40 rounded" />
                </div>
                
                <div class="space-y-2">
                    <Skeleton class="h-4 w-36 rounded" />
                    <Skeleton class="h-4 w-44 rounded" />
                </div>
                
                <div class="space-y-2">
                    <Skeleton class="h-4 w-32 rounded" />
                    <Skeleton class="h-4 w-40 rounded" />
                </div>
                
                <div class="space-y-2">
                    <Skeleton class="h-4 w-36 rounded" />
                    <Skeleton class="h-4 w-44 rounded" />
                </div>
            </div>
        </section>
        
        <!-- MATIERES -->
        <section class="shadow outline rounded-lg p-8 space-y-4">
            <Skeleton class="h-6 w-56 rounded" />
            
            <div class="flex flex-wrap gap-2 mt-4">
                <Skeleton class="h-6 w-20 rounded-full" />
                <Skeleton class="h-6 w-24 rounded-full" />
                <Skeleton class="h-6 w-28 rounded-full" />
            </div>
        </section>
        
        <!-- INFOS SUPPLEMENTAIRES -->
        <section class="shadow outline rounded-lg p-8 space-y-4">
            <Skeleton class="h-6 w-72 rounded" />
            
            <ul class="mt-4 space-y-3">
                <Skeleton class="h-4 w-11/12 rounded" />
                <Skeleton class="h-4 w-10/12 rounded" />
                <Skeleton class="h-4 w-9/12 rounded" />
                <Skeleton class="h-4 w-8/12 rounded" />
            </ul>
        </section>
    </div>
</template>


<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton"
</script>
