<script setup>
import { debounce } from 'lodash';
import { ref, computed, watch, nextTick ,onMounted} from 'vue';
import { useSvgStore } from '@/stores/svgStore';
import PopupDialog from '@/components/PopupDialog.vue';

const defaultFactoryName = 'A1';
const svgStore = useSvgStore();

const selectedHeader = ref(svgStore.currentMenuName || defaultFactoryName);
//const selectedHeader = computed(() => svgStore.currentMenuName);
// const svgMap = computed(() => svgStore.svgMap);

const svgMap = ref(svgStore.svgMap);

const dialogVisible = ref(false);
const dialogTarget = ref(null);


watch(() => svgStore.svgMap, debounce(async (newVal) => {
  await nextTick();
  svgMap.value = newVal;
  await nextTick();
}, 200));  // 200ms 딜레이

watch(() => svgStore.currentMenuName, (newVal) => {
  selectedHeader.value = newVal || defaultFactoryName;
});


const handleDoubleClick = (event) => {
  dialogVisible.value = true;
  dialogTarget.value = event.target;
};

onMounted(() => {
  console.log(`컴포넌트가 마운트 됐습니다.`)
  svgStore.initSvgColor();

})

</script>

<template>

  <v-container v-if="svgStore.svgLoadCompleted">
    <!-- SVG 렌더링 -->
    <v-container class="text-center">
      <!-- <div v-html="svgStore.svgMap[selectedHeader]" v-if="selectedHeader"></div> -->
      <div v-html="svgMap[selectedHeader]" v-if="selectedHeader" @dblclick="handleDoubleClick"></div>
    </v-container>
    <PopupDialog
      :visible="dialogVisible"
      :target="dialogTarget"
      @close="dialogVisible = false">
    </PopupDialog>

  </v-container>
  <!-- 로딩 상태 -->
  <v-container v-else class="d-flex justify-center align-center" style="height: 100vh;">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>

<style scoped></style>
