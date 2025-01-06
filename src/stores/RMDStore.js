import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRMDColorSet } from '@/api/RMDColorSet'
import { updateDefaultFactory, getRMDFactory } from '@/api/RMDFactory'
import { useUIStore } from './UIStore'

export const useRMDstore = defineStore(
  'RMD',
  () => {
    const RMDColorSetList = ref([])
    const RMDFactoryList = ref([])
    const UIStore = useUIStore()

    async function getRMDColorSetList() {
      RMDColorSetList.value = await getRMDColorSet()
    }

    async function getRMDFactoryList() {
      RMDFactoryList.value = await getRMDFactory()

      for (const RMDFactory of RMDFactoryList.value) {
        if (RMDFactory.defaultFactoryFlag === 'Y') {
          UIStore.setHeaderName(RMDFactory.factoryName)
        }
      }
    }

    function setDefaultFactory(factoryName) {
      const obj = RMDFactoryList.value.find((rmdFactory) => rmdFactory.factoryName === factoryName)
      updateDefaultFactory(obj)
      RMDFactoryList.value.forEach((rmd) => {
        rmd.defaultFactoryFlag = rmd.factoryName === factoryName ? 'Y' : 'N'
      })
    }

    return {
      RMDColorSetList,
      RMDFactoryList,
      getRMDColorSetList,
      getRMDFactoryList,
      setDefaultFactory,
    }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
