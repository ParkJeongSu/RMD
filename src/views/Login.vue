<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useSvgStore } from '@/stores/svgStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const svgStore = useSvgStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const handleLogin = () => {
    if (username.value && password.value) {
        authStore.login({ username: username.value });
        router.push('/');  // 로그인 성공 시 홈으로 리다이렉트
        svgStore.loadSvgFiles();
    }
};
</script>

<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card width="400" class="pa-5">
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-text-field label="Username" v-model="username"></v-text-field>
                    <v-text-field label="Password" v-model="password" type="password"></v-text-field>
                    <v-btn block type="submit" color="primary">Login</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

