<template>
    <Card class="w-full border p-6">
        <CardHeader>
            <CardTitle class="flex items-center gap-2">
                <Skeleton class="w-5 h-5 rounded-full" />
                <Skeleton class="h-4 w-40 rounded-md" />
            </CardTitle>
            
            <p class="text-sm mt-2">
                <Skeleton class="h-4 w-28 rounded-md" />
            </p>
        </CardHeader>
        
        <CardContent class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
                <Skeleton class="w-4 h-4 rounded" />
                <Skeleton class="h-3 w-56 rounded-md" />
            </div>
            
            <div class="flex items-center gap-2 text-sm">
                <Skeleton class="w-4 h-4 rounded" />
                <Skeleton class="h-3 w-32 rounded-md" />
            </div>
            
            <div class="flex items-center gap-2 text-sm">
                <Skeleton class="w-4 h-4 rounded" />
                <Skeleton class="h-3 w-28 rounded-md" />
            </div>
            
            <div class="flex items-center gap-2 text-sm">
                <Skeleton class="w-4 h-4 rounded" />
                <Skeleton class="h-3 w-40 rounded-md" />
            </div>
            
            <div class="flex items-center gap-2 text-sm">
                <Skeleton class="h-4 w-24 rounded-md" />
            </div>
        </CardContent>
        
        <CardFooter class="flex justify-between items-center">
            <div class="flex items-center gap-2 text-sm">
                <Skeleton class="w-4 h-4 rounded" />
                <Skeleton class="h-3 w-20 rounded-md" />
            </div>
            
            <Skeleton class="h-8 w-28 rounded-md" />
        </CardFooter>
    </Card>
</template>



<script setup>
import Skeleton from '~/components/ui/skeleton/Skeleton.vue';
import Card from '~/components/ui/card/Card.vue';
</script>
