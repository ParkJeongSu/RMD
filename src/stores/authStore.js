// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn = ref(false)
    const userInfo = ref(null)

    function login(user) {
      isLoggedIn.value = true
      userInfo.value = user
    }

    function logout() {
      isLoggedIn.value = false
      userInfo.value = null
    }

    return { isLoggedIn, userInfo, login, logout }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
