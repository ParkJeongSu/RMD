// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { connectWebSocket, disconnectWebSocket } from '@/websocket/websocket'
import { useSvgStore } from './svgStore'
import { Login } from '@/api/auth'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn = ref(false)
    const userInfo = ref(null)
    const router = useRouter()

    async function login(userId, userPassword) {
      const response = await Login(userId, userPassword) // api 호출
      const svgStore = useSvgStore()
      await svgStore.loadsvgFiles()
      router.push('/') // 로그인 성공 시 홈으로 리다이렉트
      //connectWebSocket()
      isLoggedIn.value = true
      userInfo.value = userId
    }

    function logout() {
      isLoggedIn.value = false
      userInfo.value = null
      router.push('/login')
      localStorage.removeItem('token')
      //disconnectWebSocket()
    }

    return { isLoggedIn, userInfo, login, logout }
  },
  {
    persist: true,
  }, // 상태를 지속적으로 저장
)
