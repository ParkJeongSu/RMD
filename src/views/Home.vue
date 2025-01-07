<script setup>
import { debounce } from 'lodash';
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { useSvgStore } from '@/stores/svgStore';
import { useUIStore } from '@/stores/UIStore';
import PopupDialog from '@/components/PopupDialog.vue';


const UIStore = useUIStore();
const svgStore = useSvgStore();
const selectedHeader = ref(UIStore.currentHeaderName);
const svgMap = ref(svgStore.svgMap);

const dialogVisible = ref(false);
const dialogTarget = ref(null);

const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
let isDragging = false;
let startX = 0;
let startY = 0;


watch(() => svgStore.svgMap, debounce(async (newVal) => {
  await nextTick();
  svgMap.value = newVal;
  await nextTick();
}, 200));  // 200ms 딜레이

watch(() =>  UIStore.currentHeaderName, (newVal) => {
  selectedHeader.value = newVal
});


const handleDoubleClick = (event) => {
  dialogVisible.value = true;
  dialogTarget.value = event.target;
};

const handleWheel = (event) => {
  // gpt가 준 새로운 코드
  const container = event.currentTarget;
  const rect = container.getBoundingClientRect();
  const isInside = event.clientX >= rect.left && event.clientX <= rect.right &&
    event.clientY >= rect.top && event.clientY <= rect.bottom;

  if (isInside) {
    event.preventDefault();
    const zoomAmount = event.deltaY > 0 ? 0.9 : 1.1;
    scale.value *= zoomAmount;
  }
};

const handleMouseDown = (event) => {
  isDragging = true;
  startX = event.clientX - translateX.value;
  startY = event.clientY - translateY.value;
};

const handleMouseMove = (event) => {
  if (!isDragging) return;
  translateX.value = event.clientX - startX;
  translateY.value = event.clientY - startY;
};

const handleMouseUp = () => {
  isDragging = false;
};

const resetZoom = () => {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
};

onMounted(() => {
  console.log(`Home 컴포넌트가 마운트 됐습니다.`)
  svgStore.initsvgColor();
})

</script>

<template>

  <v-container v-if="svgStore.svgLoadCompleted">
    <div class="slider-container">
      <span>{{ Math.round(scale * 100) }}%</span>
      <v-slider v-model="scale" min="0.5" max="2" step="0.1"></v-slider>
      <span>{{ Math.round(scale * 200) }}%</span>
      <v-btn @click="resetZoom">Reset</v-btn>
    </div>
    <!-- SVG 렌더링 -->
    <v-container class="text-center svg-container">
      <!-- <div v-html="svgStore.svgMap[selectedHeader]" v-if="selectedHeader"></div> -->
      <div v-html="svgMap[selectedHeader]" v-if="selectedHeader" @dblclick="handleDoubleClick" @wheel="handleWheel"
        @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" :style="{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: 'center'
        }"></div>
    </v-container>
    <PopupDialog :visible="dialogVisible" :target="dialogTarget" @close="dialogVisible = false">
    </PopupDialog>

  </v-container>
  <!-- 로딩 상태 -->
  <v-container v-else class="d-flex justify-center align-center" style="height: 100vh;">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>

<style scoped>
.text-center div {
  cursor: grab;
}

.text-center div:active {
  cursor: grabbing;
}

.slider-container {
  /* */
  position: absolute;
  width: 300px;
  top: 40px;
  right: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 2000;
}

.svg-container {
  border: 3px solid darkred;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
}
</style>
