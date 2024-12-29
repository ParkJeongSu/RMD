import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8082',
        changeOrigin:true,
        rewrite:(path)=> path.replace(/^\/api/, '')
      }
    }
  },
  build:{
    sourcemap : true // source map active
  },
  define: {
    __VUE_PROD_DEVTOOLS__: true  // 개발 환경에서 DevTools 활성화
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
