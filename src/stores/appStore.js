import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const content = ref('Home Content');

  function setContent(newContent) {
    content.value = newContent;
  }

  return { content, setContent };
});
