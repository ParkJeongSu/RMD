<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useSvgStore } from '@/stores/svgStore';
import { useRouter } from 'vue-router';
import { login } from '@/api/auth';
import { connectWebSocket } from '@/websocket/websocket'

const authStore = useAuthStore();
const svgStore = useSvgStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const response = await login(username.value, password.value); // api 호출
    authStore.login(username.value); // 상태관리하기 위해 유저정보 저장
    await svgStore.loadSvgFiles();
    router.push('/');  // 로그인 성공 시 홈으로 리다이렉트
    connectWebSocket();
  }
  catch (error) {
    errorMessage.value = error.message || 'Login failed. Please try again.';
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
        <v-alert v-if="errorMessage" type="error" class="mt-3">
          {{ errorMessage }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
