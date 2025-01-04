import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // 나머지 모든 경로는 '/'로 리디렉트
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  //!authStore.isLoggedIn
  // 보호된 페이지에 접근 시 로그인이 되어 있는지 확인
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login') // 로그인되지 않은 경우
  } else {
    next() // 통과
  }
})

export default router
