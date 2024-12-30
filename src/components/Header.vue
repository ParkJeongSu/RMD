<script setup>
import { ref } from 'vue';
import { useSvgStore } from '@/stores/svgStore';


const svgStore = useSvgStore();

const tab = ref(svgStore.currentMenuName);

const setCurrentMenuName = (value) => {
  svgStore.setMenuName(value);
};

function refreshContent() {
  console.log('Refresh clicked!');
}

</script>

<template>
  <v-container>
    <v-row justify="center" align="center" class="tab-container">

      <div class="tabs-wrapper">
        <!-- Tabs -->
        <v-tabs v-model="tab" align-tabs="center" color="primary" @update:modelValue="setCurrentMenuName">
          <v-tab value="A1">A1</v-tab>
          <v-tab value="T1">T1</v-tab>
          <v-tab value="E1">E1</v-tab>
        </v-tabs>
      </div>

      <!-- Refresh 버튼 (아이콘) -->
      <v-btn icon="mdi-refresh" @click="refreshContent" class="refresh-btn" >
      </v-btn>

    </v-row>

  </v-container>

</template>


<style scoped>
.tab-container {
  position: relative;
  width: 100%;
  z-index: 9999;
}

/* v-tabs를 중앙에 배치 */
.tabs-wrapper {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

/* Refresh 버튼 우측 고정 */
.refresh-btn {
  position: fixed;
  top : 65px;
  right: 20px;
  z-index: 9999;
}
</style>
