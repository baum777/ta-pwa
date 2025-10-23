import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [
      react(),
      // PWA only in production to avoid dev SW issues
      ...(isProd
        ? [
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
              manifest: {
                name: 'TA-PWA Trading Analytics',
                short_name: 'TA-PWA',
                description: 'Trading Analytics PWA with Charts and Replay',
                theme_color: '#00FF66',
                background_color: '#000000',
                display: 'standalone',
                start_url: '/',
                icons: [
                  {
                    src: '/icon-192.png',
                    sizes: '192x192',
                    type: 'image/png',
                  },
                  {
                    src: '/icon-512.png',
                    sizes: '512x512',
                    type: 'image/png',
                  },
                ],
              },
              workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/api\.dexscreener\.com\/.*/i,
                    handler: 'NetworkFirst',
                    options: {
                      cacheName: 'dexscreener-api',
                      networkTimeoutSeconds: 4,
                      expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 15,
                      },
                      cacheableResponse: {
                        statuses: [0, 200],
                      },
                    },
                  },
                  {
                    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                    handler: 'StaleWhileRevalidate',
                    options: {
                      cacheName: 'images',
                      expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                      },
                    },
                  },
                ],
              },
            }),
          ]
        : []),
    ],
    server: {
      port: 3000,
      // Future: proxy for Hono API
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:8787',
      //     changeOrigin: true,
      //   },
      // },
    },
  }
})
