import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'QR Bienes',
        short_name: 'QR',
        description: 'Una aplicación de ejemplo',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/Logo-Legis.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/Logo-Legis.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),

  ],
})
