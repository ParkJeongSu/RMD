// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRmdColorSet } from '@/api/rmdColorSet'

export const usermdColorSetStore = defineStore('rmdColorSet', () => {
  const rmdColorSetList = ref([])

  async function getRmdColorSetList() {
    rmdColorSetList.value = await getRmdColorSet()
  }
  return { rmdColorSetList, getRmdColorSetList }
})
