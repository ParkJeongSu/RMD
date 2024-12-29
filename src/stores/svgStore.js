import { defineStore } from 'pinia';
import { ref } from 'vue';

// SVG 상태 관리 스토어
export const useSvgStore = defineStore('svg', () => {
  const svgMap = ref({});
  const svgLoadCompleted = ref(false);
  const currentMenuName = ref('A1');

  // SVG 미리 로드
  async function loadSvgFiles() {
    const svgFiles = ['/layout/A1.svg','/layout/T1.svg','/layout/E1.svg'];

    for (const path of svgFiles) {
      const response = await fetch(path);  // fetch로 파일 가져오기
      const svgContent = await response.text();  // SVG 파일을 텍스트로 변환
      const fileName = path.split('/').pop().replace('.svg', '');  // 파일명 추출
      svgMap.value[fileName] = svgContent;
    }
    svgLoadCompleted.value = true;
  }

  // 특정 SVG 부분 색상 변경
  function updateSvgColor(headerName, selector, color) {
    if (svgMap.value[headerName]) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgMap.value[headerName], 'image/svg+xml');
      const targetElement = doc.querySelector(selector);
      if (targetElement) {
        targetElement.setAttribute('fill', color);
        svgMap.value[headerName] = doc.documentElement.outerHTML;  // 업데이트
      }
    }
  }

  function setMenuName(menuName) {
    currentMenuName.value = menuName;
  }

  return { svgMap, svgLoadCompleted,currentMenuName,loadSvgFiles, updateSvgColor ,setMenuName};
});
