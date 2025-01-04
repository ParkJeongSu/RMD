import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getrmdFactory } from '@/api/fileupload'
import { usermdColorSetStore } from './rmdColorSetStore'
import { updateDefaultFactory } from '@/api/rmdFactory'
import { getAllState } from '@/api/State'

// SVG 상태 관리 스토어
export const useSvgStore = defineStore(
  'svg',
  () => {
    const svgMap = ref({})
    const svgLoadCompleted = ref(false)
    const currentMenuName = ref('')
    const rmdFactoryNameList = ref([])
    let updateQueue = Promise.resolve()

    // SVG 미리 로드
    async function loadSvgFiles() {
      const rmdFactoryList = await getrmdFactory()
      // const svgFiles = ['/layout/A1.svg','/layout/T1.svg','/layout/E1.svg'];

      // const svgFiles = fileNameList.map((filename) => '/layout/' + filename.factoryName + '.svg')
      const svgFiles = []
      for (const file of rmdFactoryList) {
        if (file.defaultFactoryFlag === 'Y') {
          currentMenuName.value = file.factoryName
        }
        svgFiles.push('/layout/' + file.factoryName + '.svg')
      }
      rmdFactoryNameList.value = rmdFactoryList

      for (const path of svgFiles) {
        const response = await fetch(path) // fetch로 파일 가져오기
        const svgContent = await response.text() // SVG 파일을 텍스트로 변환
        const fileName = path.split('/').pop().replace('.svg', '') // 파일명 추출
        svgMap.value[fileName] = svgContent
      }
      svgLoadCompleted.value = true
    }

    async function initSvgColor() {
      const allState = await getAllState()
      const rmdColorSetStore = usermdColorSetStore()
      await rmdColorSetStore.getRmdColorSetList()

      for (let state of allState) {
        console.log(state)
        for (const [svgFileName, svgContent] of Object.entries(svgMap.value)) {
          const parser = new DOMParser()
          const doc = parser.parseFromString(svgContent, 'image/svg+xml')
          const targetElement = doc.querySelector('#' + state.objectName)
          if (targetElement) {
            const colorSetList = rmdColorSetStore.rmdColorSetList
            for (let i = 0; i < colorSetList.length; i++) {
              if (colorSetList[i].typeName === targetElement.getAttribute('type')) {
                if (
                  state.stateName === colorSetList[i].stateName &&
                  state.stateValue === colorSetList[i].stateValue
                ) {
                  targetElement.setAttribute(
                    colorSetList[i].typeAttribute,
                    colorSetList[i].typeAttributeValue,
                  )
                }
              }
            }

            // 기존 tooltip 제거
            const existingTooltip = targetElement.querySelector('title')
            if (existingTooltip) {
              existingTooltip.remove()
            }
            // Tooltip 추가
            const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'title')
            tooltip.textContent = state.tooltipText || 'Tooltip 정보 없음'
            targetElement.appendChild(tooltip)
          }
          console.log(doc.documentElement.outerHTML)
          svgMap.value[svgFileName] = doc.documentElement.outerHTML
        }
      }
    }

    function modifyDefaultFactory(factoryName) {
      const obj = rmdFactoryNameList.value.find(
        (rmdFactory) => rmdFactory.factoryName === factoryName,
      )
      updateDefaultFactory(obj)
      rmdFactoryNameList.value.forEach((rmd) => {
        rmd.defaultFactoryFlag = rmd.factoryName === factoryName ? 'Y' : 'N'
      })
    }

    /**
     *
     * @param {
     * "objectName" : "MachineName or PortName",
     * "objectState" :"Run Or Down"
     * } obj
     */
    // 특정 SVG 부분 색상 변경
    function updateSvgColor(obj) {
      updateQueue = updateQueue.then(async () => {
        if (svgLoadCompleted.value === true) {
          const rmdColorSetStore = usermdColorSetStore()
          const object = JSON.parse(obj)
          const newSVGList = {}
          for (const [svgFileName, svgContent] of Object.entries(svgMap.value)) {
            const parser = new DOMParser()
            const doc = parser.parseFromString(svgContent, 'image/svg+xml')
            const targetElement = doc.querySelector('#' + object.objectName)
            if (targetElement) {
              const colorSetList = rmdColorSetStore.rmdColorSetList
              for (let i = 0; i < colorSetList.length; i++) {
                if (colorSetList[i].typeName === targetElement.getAttribute('type')) {
                  if (
                    object.stateName === colorSetList[i].stateName &&
                    object.stateValue === colorSetList[i].stateValue
                  ) {
                    targetElement.setAttribute(
                      colorSetList[i].typeAttribute,
                      colorSetList[i].typeAttributeValue,
                    )
                  }
                }
              }

              // 기존 tooltip 제거
              const existingTooltip = targetElement.querySelector('title')
              if (existingTooltip) {
                existingTooltip.remove()
              }
              // Tooltip 추가
              const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'title')
              tooltip.textContent = object.tooltipText || 'Tooltip 정보 없음'
              targetElement.appendChild(tooltip)
            }
            newSVGList[svgFileName] = doc.documentElement.outerHTML
          }
          svgMap.value = newSVGList
        }
      })
    }

    function setMenuName(menuName) {
      currentMenuName.value = menuName
    }

    return {
      svgMap,
      svgLoadCompleted,
      currentMenuName,
      rmdFactoryNameList,
      loadSvgFiles,
      updateSvgColor,
      setMenuName,
      modifyDefaultFactory,
      initSvgColor,
    }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
