import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [svgr(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true,
        silenceDeprecations: ['import'],
      },
    },
  },
  server: { port: 3000 },
  base: '/',
})
