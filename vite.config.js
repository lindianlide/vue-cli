import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 跨域代理
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://host.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 将匹配到的api替换成''
      }
    }
  }
})
