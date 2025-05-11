import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  esbuild: {
    target: 'esnext', // ou 'es2022'
  },
  build: {
    target: 'esnext', // nécessaire aussi ici
    rollupOptions: {
      output: {
        format: 'es' // important pour autoriser top-level await
      }
    }
  }
})