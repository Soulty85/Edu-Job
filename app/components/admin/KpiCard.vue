<template>
  <Card>
    <CardHeader>
      <div class="flex items-center gap-2 text-gray-500 text-sm">
        <Icon :name="icon" class="w-4 h-4" />
        <span>{{ title }}</span>
      </div>
    </CardHeader>
    <CardContent>
      <p class="text-3xl font-bold">
        {{ value }}<span v-if="unit">{{ unit }}</span>
      </p>
      <Progress v-if="progress !== null" :model-value="progress" class="mt-2" />
    </CardContent>
    <CardFooter>
      <a href="#" class="text-sm text-gray-500 hover:underline">Voir détails →</a>
    </CardFooter>
  </Card>
</template>

<script setup>
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Icon } from "#components"


defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  unit: { type: String, default: "" },
  icon: { type: String, required: true },
  progress: { type: Number, default: null }, // null si pas de progress bar
})
</script>
