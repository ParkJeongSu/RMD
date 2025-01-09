import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRMDColorSet } from '@/api/RMDColorSet'
import { updateDefaultFactory, getRMDFactory ,removeRMDFactory} from '@/api/RMDFactory'
import { useUIStore } from './UIStore'

export const useRMDstore = defineStore(
  'RMD',
  () => {
    const RMDColorSetList = ref([])
    const RMDFactoryList = ref([])
    const UIStore = useUIStore()

    async function getRMDColorSetList() {
      const RMDColorSetList = await getRMDColorSet()
      RMDColorSetList.value = RMDColorSetList.data;
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

    function removeDefaultFactory(){
      const objList = RMDFactoryList.value.filter(factory => factory.defaultFactoryFlag === 'Y');
      if(objList.length > 0)
      {
        const obj = objList[0]
        removeRMDFactory(obj)
        const index = RMDFactoryList.value.findIndex((rmdFactory) => rmdFactory.factoryName === obj.factoryName)
        RMDFactoryList.value.splice(index,1)
        if(RMDFactoryList.value.length > 0 ){
          setDefaultFactory(RMDFactoryList.value[0].factoryName)
        }
      }
    }

    return {
      RMDColorSetList,
      RMDFactoryList,
      getRMDColorSetList,
      getRMDFactoryList,
      setDefaultFactory,
      removeDefaultFactory
    }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
