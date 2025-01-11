<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRMDstore } from '@/stores/RMDStore';
import { useUIStore } from '@/stores/UIStore';


const RMDStore = useRMDstore();
const UIStore = useUIStore();
const currentTabName = ref(UIStore.currentHeaderName);
const RMDFactoryList = ref(RMDStore.RMDFactoryList);


// 로그인 후 svgStore.currentMenuName이 변경되면 반영
watch(() => UIStore.currentHeaderName, (newVal) => {
  currentTabName.value = newVal || RMDFactoryList.value[0].factoryName;
});

watch(() => RMDStore.RMDFactoryList, (newVal) => {
  RMDFactoryList.value = newVal || [];
}
  , { deep: true }
);


onMounted(async () => {
  // await nextTick();
  // currentTabName.value = svgStore.currentMenuName || tabNameList.value[0];
  // svgStore.setMenuName(currentTabName.value);
  // await nextTick();
});

const setCurrentMenuName = (value) => {
  UIStore.setHeaderName(value);
};

</script>

<template>
  <v-container>
    <v-row justify="center" align="center" class="tab-container">

      <div class="tabs-wrapper">
        <!-- Tabs -->
        <v-tabs :key="currentTabName" v-model="currentTabName" align-tabs="center" color="primary"
          @update:modelValue="setCurrentMenuName">
          <v-tab v-for="(rmdFactory, index) in RMDFactoryList" :key="index" :value="rmdFactory.factoryName">{{
            rmdFactory.factoryName }}</v-tab>
        </v-tabs>
      </div>
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
</style>
