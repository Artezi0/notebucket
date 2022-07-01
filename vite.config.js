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
      injectRegister: 'inline',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Notebcuket',
        short_name: 'Notebucket',
        description: 'Organize and style your notes freely',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'fullscreen',
        scope: '/',
        start_url: 'https://notebuckett.netlify.app/',
        icons: [
          {
            "src": "/src/assets/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/src/assets/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/src/assets/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/src/assets/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/src/assets/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          }
        ]
      }
    })
  ]
})
