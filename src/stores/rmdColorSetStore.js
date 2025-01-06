// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRMDColorSet } from '@/api/RMDColorSet'

export const useRMDColorSetStore = defineStore(
  'RMDColorSet',
  () => {
    const rmdColorSetList = ref([])

    async function getRMDColorSetList() {
      rmdColorSetList.value = await getRMDColorSet()
    }

    return { rmdColorSetList, getRMDColorSetList }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
