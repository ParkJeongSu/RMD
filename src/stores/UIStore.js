import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore(
  'UI',
  () => {
    const currentHeaderName = ref('')
    const searchObjName = ref('')

    function setHeaderName(headerName) {
      currentHeaderName.value = headerName
    }

    function setsearchObjName(targetName) {
      searchObjName.value = targetName
    }

    return { currentHeaderName,searchObjName, setHeaderName,setsearchObjName }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
