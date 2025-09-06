<script setup>
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuthStore } from "@/stores/AuthStore";


useHead({
    title: 'Login - EduJob',
});

definePageMeta({
    layout: 'login',
});

const authStore = useAuthStore();

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
    loading.value = authStore.loading;
    authStore.login(email.value, password.value);
}

</script>

<template>
    <Card class="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle class="text-2xl"> Login </CardTitle>
            
            <CardDescription>
                Entrez votre email ce dessous pour vous connecter
            </CardDescription>
        </CardHeader>
        
        <form @submit.prevent="handleLogin" action="">
        <CardContent>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" v-model="email" type="email" placeholder="m@example.com"  required />
                </div>
                
                <div class="grid gap-2">
                    <div class="flex items-center">
                    <Label for="password">Mot de passe</Label>
                    </div>
                    <Input id="password" v-model="password" type="password" placeholder="xxxxxxxx" required/>
                </div>
                
                <Button
                    type="submit"
                    class="w-full"
                    :disabled="loading">
                    {{ loading ? "connexion..." : "Se connecter"}}
                </Button>
            </div>
            
            <div class="mt-4 text-center text-sm">
                Vous n'avez pas encore de compte?
                <a href="/register" class="underline"> Créer un compte </a>
            </div>
        </CardContent>
        </form>
    </Card>
</template>
