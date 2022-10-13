import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    eslint()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    // 添加全局 mixin.scss
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/mixin.scss";'
      }
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    open: true
  }
})
