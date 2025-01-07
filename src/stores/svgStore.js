import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRMDstore } from './RMDStore'
import { getAllState } from '@/api/State'

// SVG 상태 관리 스토어
export const useSvgStore = defineStore(
  'svg',
  () => {
    const svgMap = ref({})
    const svgLoadCompleted = ref(false)

    let updateQueue = Promise.resolve()

    // SVG 미리 로드
    async function loadsvgFiles() {
      const RMDStore = useRMDstore()
      RMDStore.getRMDFactoryList()
      const rmdFactoryList = RMDStore.RMDFactoryList
      const svgFiles = []
      for (const file of rmdFactoryList) {
        svgFiles.push('/layout/' + file.factoryName + '.svg')
      }

      for (const path of svgFiles) {
        const response = await fetch(path) // fetch로 파일 가져오기
        const svgContent = await response.text() // SVG 파일을 텍스트로 변환
        const fileName = path.split('/').pop().replace('.svg', '') // 파일명 추출
        svgMap.value[fileName] = svgContent
      }
      svgLoadCompleted.value = true
    }

    async function initsvgColor() {
      const allState = await getAllState()
      const RMDStore = useRMDstore()
      RMDStore.getRMDColorSetList()
      const RMDColorSetList = RMDStore.RMDColorSetList

      for (let state of allState) {
        // console.log(state)
        for (const [svgFileName, svgContent] of Object.entries(svgMap.value)) {
          const parser = new DOMParser()
          const doc = parser.parseFromString(svgContent, 'image/svg+xml')
          const targetElement = doc.querySelector('#' + state.objectName)
          if (targetElement) {
            for (let i = 0; i < RMDColorSetList.length; i++) {
              if (RMDColorSetList[i].typeName === targetElement.getAttribute('type')) {
                if (
                  state.stateName === RMDColorSetList[i].stateName &&
                  state.stateValue === RMDColorSetList[i].stateValue
                ) {
                  targetElement.setAttribute(
                    RMDColorSetList[i].typeAttribute,
                    RMDColorSetList[i].typeAttributeValue,
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
          // console.log(doc.documentElement.outerHTML)
          svgMap.value[svgFileName] = doc.documentElement.outerHTML
        }
      }
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
          const RMDStore = useRMDstore()
          const rmdColorSetStore = RMDStore.RMDColorSetList
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

    return {
      svgMap,
      svgLoadCompleted,
      loadsvgFiles,
      updateSvgColor,
      initsvgColor,
    }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
