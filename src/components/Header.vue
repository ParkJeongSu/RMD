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
        <v-tab value="A1">A1</v-tab>
        <v-tab value="T1">T1</v-tab>
        <v-tab value="E1">E1</v-tab>
    </v-tabs>
</template>
