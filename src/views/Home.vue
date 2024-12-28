<script setup>
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();
</script>

<template>
  <v-container fluid>
    <h1>{{appStore.content}}</h1>
  </v-container>
</template>

<style scoped>
</style>