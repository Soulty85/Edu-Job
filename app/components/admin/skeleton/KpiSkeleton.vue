<template>
    <Card>
        <CardHeader>
            <div class="flex items-center gap-2">
                <Skeleton class="w-4 h-4 rounded" />
                <Skeleton class="h-4 w-32" />
            </div>
        </CardHeader>
        
        <CardContent class="space-y-3">
            <Skeleton class="h-8 w-20" />
            <Skeleton class="h-2 w-full" />
        </CardContent>
        
        <CardFooter>
            <Skeleton class="h-4 w-24" />
        </CardFooter>
    </Card>
</template>

<script setup>
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
</script>
