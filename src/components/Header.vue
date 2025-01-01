<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useSvgStore } from '@/stores/svgStore';


const svgStore = useSvgStore();
const currentTabName = ref(svgStore.currentMenuName);
const tabNameList = ref(svgStore.rmdFactoryNameList);


// 로그인 후 svgStore.currentMenuName이 변경되면 반영
watch(() => svgStore.currentMenuName, (newVal) => {
  currentTabName.value = newVal || tabNameList.value[0];
});


onMounted(async () => {
  // await nextTick();
  // currentTabName.value = svgStore.currentMenuName || tabNameList.value[0];
  // svgStore.setMenuName(currentTabName.value);
  // await nextTick();


});

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
        <v-tabs :key="currentTabName" v-model="currentTabName" align-tabs="center" color="primary"
          @update:modelValue="setCurrentMenuName">
          <v-tab v-for="tab in tabNameList" :key="tab" :value="tab">{{ tab }}</v-tab>
        </v-tabs>
      </div>

      <!-- Refresh 버튼 (아이콘) -->
      <v-btn icon="mdi-refresh" @click="refreshContent" class="refresh-btn">
      </v-btn>

    </v-row>

  </v-container>

</template>


<style scoped>
.tab-container {
  position: relative;
  width: 100%;
  z-index: 1500;
}

/* v-tabs를 중앙에 배치 */
.tabs-wrapper {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  z-index: 1500;
}

.v-tab--selected {
  font-weight: bold;
  color: #1976d2;
  border-bottom: 2px solid #1976d2;
}

/* Refresh 버튼 우측 고정 */
.refresh-btn {
  position: fixed;
  top: 65px;
  right: 20px;
  z-index: 1500;
}
</style>
