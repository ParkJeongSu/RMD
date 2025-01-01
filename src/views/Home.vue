<script setup>
import { debounce } from 'lodash';
import { ref, computed, watch, nextTick } from 'vue';
import { useSvgStore } from '@/stores/svgStore';


const defaultFactoryName = 'A1';
const svgStore = useSvgStore();

const selectedHeader = ref(svgStore.currentMenuName || defaultFactoryName);
//const selectedHeader = computed(() => svgStore.currentMenuName);
// const svgMap = computed(() => svgStore.svgMap);

const svgMap = ref(svgStore.svgMap);


watch(() => svgStore.svgMap, debounce(async (newVal) => {
  await nextTick();
  svgMap.value = newVal;
  await nextTick();
}, 200));  // 200ms 딜레이

watch(() => svgStore.currentMenuName, (newVal) => {
  selectedHeader.value = newVal || defaultFactoryName;
});

</script>

<template>

  <v-container v-if="svgStore.svgLoadCompleted">
    <!-- SVG 렌더링 -->
    <v-container class="text-center">
      <!-- <div v-html="svgStore.svgMap[selectedHeader]" v-if="selectedHeader"></div> -->
      <div v-html="svgMap[selectedHeader]" v-if="selectedHeader"></div>
    </v-container>
  </v-container>
  <!-- 로딩 상태 -->
  <v-container v-else class="d-flex justify-center align-center" style="height: 100vh;">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>

<style scoped></style>
