<script setup>
import { ref } from 'vue';
import { useSvgStore } from '@/stores/svgStore';

const svgStore = useSvgStore();

const selectedHeader = svgStore.defaultMenuName

</script>

<template>

  <v-container v-if="svgStore.svgLoadCompleted">
    <!-- SVG 렌더링 -->
    <v-container class="text-center">
      <div v-html="svgStore.svgMap[selectedHeader]" v-if="selectedHeader"></div>
    </v-container>
  </v-container>
  <!-- 로딩 상태 -->
  <v-container v-else class="d-flex justify-center align-center" style="height: 100vh;">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>

<style scoped></style>