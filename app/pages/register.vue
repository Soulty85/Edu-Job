

<script setup>
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-vue-next"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuthStore } from '@/stores/AuthStore';


useHead({
    title: 'Register - EduJob',
});

definePageMeta({
    layout: 'login',
});

const authStore = useAuthStore();

const first_name = ref('');
const last_name = ref('');
const email = ref('');
const password = ref('');
const password_confirm = ref('');
const phone  = ref('');
const nationality  = ref('');
const address  = ref('');
const birth_date  = ref('');
const loading = ref(false);

const handleRegister = () => {
    const user = {
        'user': {
            'email': email.value,
            'first_name': first_name.value,
            'last_name': last_name.value,
            'password': password.value,
            'password_confirm': password_confirm.value,
        },
        'phone': phone.value,
        'address': address.value,
        'nationality': nationality.value,
        'birth_date': birth_date.value
        };
        
        loading.value = useAuthStore.loading;
    authStore.register(user);
}
</script>

<script>
export const description = "A sign up form with first name, last name, email, password, phone, address and nationality inside a card.";
export const iframeHeight = "700px";
export const containerClass = "w-full h-screen flex items-center justify-center px-4";
</script>

<template>
    <Card class="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle class="text-xl"> Sign Up </CardTitle>
            
            <CardDescription>
                Entrez vos insformations pour creer un compte
            </CardDescription>
        </CardHeader>
        
        <form action="" @submit.prevent="handleRegister">
            <CardContent>
                <div class="grid gap-4">
                    <!-- Nom et prénom -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="grid gap-2">
                            <Label for="first-name">Prénom</Label>
                            <Input id="first-name" v-model="first_name" placeholder="Max" required />
                        </div>
                        
                        <div class="grid gap-2">
                            <Label for="last-name">Nom</Label>
                            <Input id="last-name" v-model="last_name" placeholder="Robinson" required />
                        </div>
                    </div>
                    
                    <!-- Email -->
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
                    </div>
                    
                    <!-- Mot de passe -->
                    <div class="grid gap-2">
                        <Label for="password">Mot de passe</Label>
                        <Input id="password" v-model="password" type="password" required placeholder="xxxxxxxx"/>
                    </div>
                    
                    <!-- Confirmation de Mot de passe -->
                    <div class="grid gap-2">
                        <Label for="password">Confirmez le mot de passe</Label>
                        <Input id="password" v-model="password_confirm" type="password" required placeholder="xxxxxxxx"/>
                    </div>
                    
                    <!-- Téléphone -->
                    <div class="grid gap-2">
                        <Label for="phone">téléhone</Label>
                        <Input id="phone" v-model="phone" type="tel" placeholder="+221 77 123 45 67" required />
                    </div>
                    
                    <!-- Adresse -->
                    <div class="grid gap-2">
                        <Label for="address">Addresse</Label>
                        <Input id="address" v-model="address" type="text" placeholder="123 rue de la Liberté" required />
                    </div>
                    
                    <!-- Nationalité -->
                    <div class="grid gap-2">
                        <Label for="nationality">Nationalité</Label>
                        <Input id="nationality" v-model="nationality" type="text" placeholder="Sénégalais" required />
                    </div>
                    
                    <!-- Date de naissance -->
                    <div class="grid gap-2">
                        <Label for="birth-date">Birth Date</Label>
                        <Input id="birth-date" v-model="birth_date" type="date" required />
                    </div>
                    <!-- Bouton -->
                    <Button
                    type="submit"
                    class="w-full"
                    :disabled="loading">
                    <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                    {{ loading ? "Chargement..." : "Créer un compte"}}
                </Button>
                </div>
                
                <div class="mt-4 text-center text-sm">
                    Avez-vous déjà un compte?
                    <a href="/login" class="underline"> Se connecter </a>
                </div>
            </CardContent>
        </form>
    </Card>
</template>
