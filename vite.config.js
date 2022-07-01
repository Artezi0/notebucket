import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(), 
    viteCompression(),
    VitePWA({ 
      registerType: 'autoUpdate', 
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*{js,css,html,ico,png,svg}']  
      },
      manifest: {
        name: 'Notebcuket',
        short_name: 'Notebucket',
        description: 'Organize and style your notes freely',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'fullscreen',
        orientation: 'portrait',
        scope: '/',
        start_url: 'https://notebuckett.netlify.app/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
