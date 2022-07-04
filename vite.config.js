import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(), 
    viteCompression(),
  ]
})
