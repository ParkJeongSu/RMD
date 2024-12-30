<script setup>
import { RouterView } from 'vue-router'
import AppBar from './components/AppBar.vue';
import Header from './components/Header.vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

</script>

<template>
  <v-app>

    <AppBar/>

    <v-main class=".v-main">
      <Header v-if="authStore.userInfo"></Header>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  --v-layout-top: 0 !important;
}
</style>
