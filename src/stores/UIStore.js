import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore(
  'UI',
  () => {
    const currentHeaderName = ref('')

    function setHeaderName(headerName) {
      currentHeaderName.value = headerName
    }

    return { currentHeaderName, setHeaderName }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
