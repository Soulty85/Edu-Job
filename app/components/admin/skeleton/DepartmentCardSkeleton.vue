<template>
    <Card>
        <CardHeader>
            <Skeleton class="h-4 w-32 mt-3" />
        </CardHeader>
        
        <CardContent>
            <Skeleton class="h-4 w-48" />
        </CardContent>
        
        <CardFooter>
            <Skeleton class="h-8 w-full rounded" />
        </CardFooter>
    </Card>
</template>

<script setup>
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


</script>
