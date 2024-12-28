<script setup>
import { RouterView } from 'vue-router'
import AppBar from './components/AppBar.vue';
import Header from './components/Header.vue';
</script>

<template>
  <v-app>
    <AppBar />
    <v-main>
      <Header></Header>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>
