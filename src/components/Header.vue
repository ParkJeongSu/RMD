<script setup>
import { ref } from 'vue';
import { useSvgStore } from '@/stores/svgStore';


const svgStore = useSvgStore();

const tab = ref(svgStore.currentMenuName);

const setCurrentMenuName = (value) => {
  svgStore.setMenuName(value);
};

</script>

<template>
  <!-- Tabs -->
  <v-tabs v-model="tab" align-tabs="center" color="primary" @update:modelValue="setCurrentMenuName">
    <v-tab value="A1">A1</v-tab>
    <v-tab value="T1">T1</v-tab>
    <v-tab value="E1">E1</v-tab>
  </v-tabs>
</template>
