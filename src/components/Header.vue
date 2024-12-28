<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/appStore';

const tab = ref('home');
const appStore = useAppStore();

const changeContent = (value) => {
  if (value === 'reports') {
    appStore.setContent('Reports Content');
  } else if (value === 'settings') {
    appStore.setContent('Settings Content');
  } else {
    appStore.setContent('Home Content');
  }
};
</script>

<template>
    <!-- Tabs -->
    <v-tabs v-model="tab" align-tabs="center" color="primary" @update:modelValue="changeContent">
        <v-tab value="home">Home</v-tab>
        <v-tab value="reports">Reports</v-tab>
        <v-tab value="settings">Settings</v-tab>
    </v-tabs>
</template>
